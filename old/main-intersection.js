import * as THREE from "../js/three-bits/three.module.js";
import { OrbitControls } from "../js/three-bits/orbit-controls.js";
import * as HF from "../js/maths-functions/hyperbolic-functions.js";
import * as VF from "../js/maths-functions/vector-functions.js";
import * as RF from "../js/maths-functions/rotation-functions.js";

const eps = 1e-4;

var WIDTH, HEIGHT, view;
var scene, spheres, vertices, uhpVertices, lineGroup = new THREE.Group(), dataSet, camera, camPos, sphereGroup = new THREE.Group();

var cameraConstants = {

    left: 0,
    bottom: 0,
    width: 1,
    height: 1.0,
    background: 0xDDDDDD,
    eye: [5, 0, 0],
    up: [0, 0, 1],
    fov: 30,
    updateCamera: function (camera, scene) {

        camera.lookAt(scene.position);

    }

};

// generate the spheres that bound the geometry (only for UHP)
function generateSpheres(data) {

    var spheres = [];

    for (var i = 0; i < data.numFaces; i++) {

        var v1, v2, v3;

        if (data.metric === "u") {

            var u1, u2, u3;

            u1 = vertices[data.faces[i][0]]["klein"];
            u2 = vertices[data.faces[i][1]]["klein"];
            u3 = vertices[data.faces[i][2]]["klein"];

            v1 = HF.kleinToUpperHalfPlane(VF.lineSphereIntersection(u1, u2));
            v2 = HF.kleinToUpperHalfPlane(VF.lineSphereIntersection(u2, u1));
            v3 = HF.kleinToUpperHalfPlane(VF.lineSphereIntersection(u2, u3));

        } else {

            v1 = vertices[data.faces[i][0]]["uhp"];
            v2 = vertices[data.faces[i][1]]["uhp"];
            v3 = vertices[data.faces[i][2]]["uhp"];

        }

        var center = HF.uhpCenter(v1, v2, v3);

        var sphereDict = {
            "hyperboloid": {},
            "poincare": {},
            "uhp": {
                center: center,
                radius: VF.distance(v1, center)
            },
        };
        spheres.push(sphereDict);

    }

    return spheres;

}

// generate the positions of the vertices in several models
function generateVertices(data, thetax, thetay, thetaz) {

    var verts = [];

    if (data.cellType === "euclidean") {

        for (var i = 0; i < data.numVertices; i++) {

            var vertDict = {
                "hyperboloid": data.flip(RF.rxyz(data.f(data.vertices[i]), thetax, thetay, thetaz)),
                "poincare": HF.hyperboloidToPoincare(data.flip(RF.rxyz(data.f(data.vertices[i]), thetax, thetay, thetaz))),
                "klein": HF.hyperboloidToKlein(data.flip(RF.rxyz(data.f(data.vertices[i]), thetax, thetay, thetaz))),
                "uhp": HF.hyperboloidToUpperHalfPlane(data.flip(RF.rxyz(data.f(data.vertices[i]), thetax, thetay, thetaz)))
            };

            verts.push(vertDict);

        }

    } else if (data.cellType === "hyperbolic") {

        for (var i = 0; i < data.numVertices; i++) {

            var vertDict = {
                "hyperboloid": data.flip(RF.rxyz(data.f(data.vertices[i]), thetax, thetay, thetaz)),
                "poincare": HF.hyperboloidToPoincare(data.flip(RF.rxyz(data.f(data.vertices[i]), thetax, thetay, thetaz))),
                "klein": HF.hyperboloidToKlein(data.flip(RF.rxyz(data.f(data.vertices[i]), thetax, thetay, thetaz))),
                "uhp": HF.hyperboloidToUpperHalfPlane(data.flip(RF.rxyz(data.f(data.vertices[i]), thetax, thetay, thetaz)))
            };

            verts.push(vertDict);

        }

    } else {

        for (var i = 0; i < data.numVertices; i++) {

            var vertDict = {
                "hyperboloid": RF.rxyz(data.f(data.vertices[i]), thetax, thetay, thetaz),
                "poincare": HF.hyperboloidToPoincare(RF.rxyz(data.f(data.vertices[i]), thetax, thetay, thetaz)),
                "klein": HF.hyperboloidToKlein(RF.rxyz(data.f(data.vertices[i]), thetax, thetay, thetaz)),
                "uhp": HF.hyperboloidToUpperHalfPlane(RF.rxyz(data.f(data.vertices[i]), thetax, thetay, thetaz))
            };

            verts.push(vertDict);

        }

    }

    return verts;

}

// find the coordinates of the lines
function makeTheLines(data, number) {

    var lineCoords = [];

    data.edges.forEach((endpoints) => {

        var uhpVertices = [], e1, e2;

        if (data.metric === "u") {

            e1 = HF.kleinToUpperHalfPlane(VF.lineSphereIntersection(vertices[endpoints[0]]["klein"], vertices[endpoints[1]]["klein"]));
            e2 = HF.kleinToUpperHalfPlane(VF.lineSphereIntersection(vertices[endpoints[1]]["klein"], vertices[endpoints[0]]["klein"]));

        } else {

            [e1, e2] = HF.geodesicEndpoints(vertices[endpoints[0]]["hyperboloid"], vertices[endpoints[1]]["hyperboloid"]);
            e1 = HF.hyperboloidToUpperHalfPlane(e1);
            e2 = HF.hyperboloidToUpperHalfPlane(e2);

        }

        const p1 = vertices[endpoints[0]]["uhp"], p2 = vertices[endpoints[1]]["uhp"];

        const radVect = VF.vectorScale(VF.vectorDiff(e2, e1), 0.5);
        const center = VF.midpoint(e1, e2);
        const r = VF.norm(radVect);

        var startAngle, endAngle;

        if (data.metric === "h") {

            startAngle = Math.acos(VF.vectorDot(VF.vectorDiff(p1, center), radVect) / (r ** 2));
            endAngle = Math.acos(VF.vectorDot(VF.vectorDiff(p2, center), radVect) / (r ** 2));

        } else {

            startAngle = 0;
            endAngle = Math.PI;

        }

        const numPieces = Math.ceil(number * (endAngle - startAngle) / Math.PI);
        const subAngle = (endAngle - startAngle) / numPieces;

        for (var i = 0; i <= numPieces; i++) {

            const theta = startAngle + i * subAngle;

            uhpVertices.push([
                radVect[0] * Math.cos(theta) + center[0],
                radVect[1] * Math.cos(theta) + center[1],
                r * Math.sin(theta)
            ])

        }

        lineCoords.push(uhpVertices);

    });

    // kinda works??
    if (data.metric === "u") {

        for (var j = 0; j < data.numFaces; j++) {

            const face = data.faces[j];

            for (var i = 0; i < data.numSides; i++) {

                var uhpVertices = [];

                var u = vertices[face[i]]["klein"], v = vertices[face[(i + 1) % data.numSides]]["klein"], w = vertices[face[(i + 2) % data.numSides]]["klein"];
                var p1 = HF.kleinToUpperHalfPlane(VF.lineSphereIntersection(u, v));
                var p2 = HF.kleinToUpperHalfPlane(VF.lineSphereIntersection(w, v))

                var center = spheres[j]["uhp"].center;
                var r = spheres[j]["uhp"].radius;

                var theta1 = Math.acos(Math.max(-1, Math.min(1, (p1[0] - center[0]) / r))) * ((p1[1] - center[1] > 0) ? 1 : -1);
                var theta2 = Math.acos(Math.max(-1, Math.min(1, (p2[0] - center[0]) / r))) * ((p2[1] - center[1] > 0) ? 1 : -1);

                var startAngle = Math.min(theta1, theta2);
                var endAngle = Math.max(theta1, theta2);

                if (endAngle - startAngle > Math.PI) {

                    startAngle += 2 * Math.PI;
                    [startAngle, endAngle] = [endAngle, startAngle];

                }

                const numPieces = Math.ceil(Math.abs(number * (endAngle - startAngle) / Math.PI));
                const subAngle = (endAngle - startAngle) / numPieces;

                for (var k = 0; k <= numPieces; k++) {

                    const theta = startAngle + k * subAngle;

                    uhpVertices.push([
                        r * Math.cos(theta) + center[0],
                        r * Math.sin(theta) + center[1],
                        0
                    ])

                }

                lineCoords.push(uhpVertices);

            }

        }

    }

    return lineCoords;

}

function outline(data, number) {

    var lineCoords = [];
    const camPos = cameraConstants.camera.position.toArray();

    for (var i = 0; i < data.numFaces; i++) {

        var center = spheres[i]["uhp"].center;
        var r = spheres[i]["uhp"].radius;

        var diff = VF.vectorDiff(camPos, center);
        // var proj = [diff[0], diff[1], 0];
        var perp = [-diff[1], diff[0], 0];
        var normal = VF.vectorCross(diff, perp);
        perp = VF.vectorScale(perp, 1 / VF.norm(perp));
        normal = VF.vectorScale(normal, 1 / VF.norm(normal));

        var curve = [];

        for (var k = 0; k <= number; k++) {

            const theta = Math.PI * k / number;
            const v = VF.vectorSum(
                VF.vectorSum(
                    VF.vectorScale(perp, (r * 1.01) * Math.cos(theta)),
                    VF.vectorScale(normal, (r * 1.01) * Math.sin(theta))
                ),
                center
            )

            curve.push(v);

        }

        var polygon = [];

        if (data.metric === "u") {

            data.faces[i].forEach((j) => {
                polygon.push(vertices[j]["klein"]);
            });

        } else {

            data.faces[i].forEach((j) => {
                polygon.push([vertices[j]["uhp"][0], vertices[j]["uhp"][1]]);
            });

        }

        var newCurve = [];

        curve.forEach((vert) => {
            if (pointInPolygon([vert[0], vert[1]], polygon)) {

                newCurve.push(vert);

            }
        })

        lineCoords.push(newCurve);

    }

    return lineCoords;

}

function drawLine(vectors, col) {

    var threeVectors = [];

    vectors.forEach((vect) => {
        threeVectors.push(new THREE.Vector3().fromArray(vect));
    });

    var geometry = new THREE.BufferGeometry().setFromPoints(threeVectors);
    var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: col }));

    lineGroup.add(line);

}

function cameraLines(data, invisibleLines) {

    lineGroup.children = [];

    camPos = cameraConstants.camera.position.toArray();

    // var extraVerts = uhpVertices.concat(outline(data, 100));

    var extraVerts = uhpVertices;

    extraVerts.forEach((points) => {

        if (points.length > 0) {

            var drawVerts = [];

            for (var k = 0; k < points.length; k++) {

                var e1 = points[k];
                drawVerts.push([e1, visibilityTest(e1, camPos, spheres, vertices, data)]);

            }

            var segments = [[drawVerts[0]]];
            var segmentsPoints = [[drawVerts[0][0]]];
            var segNum = 0;

            for (var k = 1; k < points.length; k++) {

                if (drawVerts[k][1] === segments[segNum][segments[segNum].length - 1][1]) {

                    segments[segNum].push(drawVerts[k]);
                    segmentsPoints[segNum].push(drawVerts[k][0]);

                } else {

                    segNum++;
                    segments.push([drawVerts[k]]);
                    segmentsPoints.push([drawVerts[k][0]]);

                }

            }

            for (var k = 0; k < segments.length; k++) {

                if ((segments[k].length > 1) && (segments[k][0][1])) {

                    drawLine(segmentsPoints[k], 0x000000);

                } else {

                    if (invisibleLines) {

                        drawLine(segmentsPoints[k], 0xAAAAAA);

                    }

                }

            }

        }

    });

}

function pointInPolygon(point, vertices) {

    for (var i = 1; i <= vertices.length - 2; i++) {

        var v = point, v0 = vertices[0], v1 = VF.vectorDiff(vertices[i], vertices[0]), v2 = VF.vectorDiff(vertices[i + 1], vertices[0]);
        var a = (VF.determinant2([v, v2]) - VF.determinant2([v0, v2])) / VF.determinant2([v1, v2]);
        var b = - (VF.determinant2([v, v1]) - VF.determinant2([v0, v1])) / VF.determinant2([v1, v2]);

        if ((a > eps) && (b > eps) && (a + b < 1 - eps)) {

            return true;

        }

    }

    return false;

}

//moller thrumbore intersection algorithm
function rayPolygonIntersection(point, polygon) {

    for (var i = 0; i < polygon.length; i++) {

        var v0 = polygon[i], v1 = polygon[(i + 1) % polygon.length], v2 = polygon[(i + 2) % polygon.length];

        var e1 = VF.vectorDiff(v1, v0);
        var e2 = VF.vectorDiff(v2, v0);

        var h = VF.vectorCross(point, e2);
        var a = VF.vectorDot(e1, h);

        if ((a > -eps) && (a < eps)) {

            continue;

        }

        var f = 1 / a;
        var s = VF.vectorScale(v0, -1);
        var u = f * VF.vectorDot(s, h);

        if ((u < 0) || (u > 1)) {

            continue;

        }

        var q = VF.vectorCross(s, e1);
        var v = f * VF.vectorDot(point, q);

        if ((v < 0) || (u + v > 1)) {

            continue;

        }

        var t = f * VF.vectorDot(e2, q);

        if (t > eps) {

            return true;

        }

    }

    return false;

}

// ONLY WORKS FOR UHP
function visibilityTest(point, camera, spheres, vertices, data) {

    const o = camera, u = VF.vectorDiff(point, camera), uu = VF.vectorDot(u, u);

    for (var i = 0; i < data.numFaces; i++) {

        var oc = VF.vectorDiff(o, spheres[i]["uhp"].center);
        var uoc = VF.vectorDot(u, oc);
        var delta = (uoc ** 2) - uu * (VF.vectorDot(oc, oc) - (spheres[i]["uhp"].radius ** 2));

        if ((delta <= eps) || isNaN(delta)) {

            continue;

        } else {

            var t1 = (-uoc + Math.sqrt(delta)) / uu;
            var t2 = (-uoc - Math.sqrt(delta)) / uu;

            var polygon = [];

            if (data.metric === "u") {

                data.faces[i].forEach((j) => {
                    polygon.push(vertices[j]["klein"]);
                });

            } else {

                data.faces[i].forEach((j) => {
                    polygon.push([vertices[j]["uhp"][0], vertices[j]["uhp"][1]]);
                });

            }

            if (data.metric === "u") {

                if ((t1 > eps) && (t1 < 1 - eps)) {

                    var x1 = VF.vectorSum(o, VF.vectorScale(u, t1));
                    var v1 = HF.upperHalfPlaneToKlein(x1);

                    if (rayPolygonIntersection(v1, polygon) && (x1[2] > 0)) {

                        return false;

                    }

                }

                if ((t2 > eps) && (t2 < 1 - eps)) {

                    var x2 = VF.vectorSum(o, VF.vectorScale(u, t2));
                    var v2 = HF.upperHalfPlaneToKlein(x2);

                    if (rayPolygonIntersection(v2, polygon) && (x2[2] > 0)) {

                        return false;

                    }

                }

            } else {

                if ((t1 > eps) && (t1 < 1 - eps)) {

                    var x1 = VF.vectorSum(o, VF.vectorScale(u, t1));
                    var v1 = [x1[0], x1[1]];

                    if (pointInPolygon(v1, polygon) && (x1[2] > 0)) {

                        return false;

                    }

                }

                if ((t2 > eps) && (t2 < 1 - eps)) {

                    var x2 = VF.vectorSum(o, VF.vectorScale(u, t2));
                    var v2 = [x2[0], x2[1]];

                    if (pointInPolygon(v2, polygon) && (x2[2] > 0)) {

                        return false;

                    }

                }

            }

        }

    }

    return true;

}

function main() {

    WIDTH = 0;
    HEIGHT = 0;
    spheres = [];
    vertices = [];
    uhpVertices = [];
    view = document.getElementById("view2");
    WIDTH = view.clientWidth, HEIGHT = view.clientHeight;

    // setup scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xEEEEEE);

    camera = new THREE.PerspectiveCamera(cameraConstants.fov, window.innerWidth / window.innerHeight, 0.01, 100);
    camera.position.fromArray(cameraConstants.eye);
    camera.up.fromArray(cameraConstants.up);
    camera.lookAt(lineGroup.position);
    cameraConstants.camera = camera;

    // setup the renderer
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);

    // add controls to the camera
    var controls = new OrbitControls(cameraConstants.camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enabled = true;
    controls.minZoom = 1;
    controls.maxZoom = 5;
    controls.update();

    scene.add(lineGroup);
    scene.add(sphereGroup);

    window.addEventListener("resize", onWindowResize, false);

    onWindowResize();

    // add the renderer to the 'view' div
    view.appendChild(renderer.domElement);

    render();

    function render() {

        requestAnimationFrame(render);

        const camera = cameraConstants.camera;

        cameraConstants.updateCamera(camera, scene);

        const left = Math.floor(WIDTH * cameraConstants.left);
        const bottom = Math.floor(HEIGHT * cameraConstants.bottom);
        const width = Math.floor(WIDTH * cameraConstants.width);
        const height = Math.floor(HEIGHT * cameraConstants.height);

        renderer.setViewport(left, bottom, width, height);
        renderer.setScissor(left, bottom, width, height);
        renderer.setScissorTest(true);
        renderer.setClearColor(view.background);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.render(scene, camera);

    }

    function onWindowResize() {

        WIDTH = view.clientWidth;
        HEIGHT = view.clientHeight;

        renderer.setSize(WIDTH, HEIGHT);

    }

}

function addDataToView(data, invisible, thetax, thetay, thetaz) {

    vertices = [], spheres = [], uhpVertices = [], dataSet = {};

    dataSet = data;

    vertices = generateVertices(dataSet, thetax, thetay, thetaz);
    spheres = generateSpheres(dataSet);
    uhpVertices = makeTheLines(dataSet, 50);

    cameraLines(dataSet, invisible);

    window.addEventListener('keydown', (event) => { if (event.key === "Enter") { cameraLines(dataSet, invisible); } });
    window.addEventListener("touchend", () => { cameraLines(dataSet, invisible); }, false);

}

function addSpheres() {

    sphereGroup.children = [];

    var material = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.2
    });

    var k = 0;

    spheres.forEach((sphere) => {
        if (k < 10) {
            var mesh = new THREE.Mesh(new THREE.SphereBufferGeometry(sphere["uhp"].radius, 40, 40), material);
            mesh.material.color = new THREE.Color(Math.random(), Math.random(), Math.random());
            mesh.position.fromArray(sphere["uhp"].center);
            sphereGroup.add(mesh);
        }
        k++;
    })

}

function removeSpheres() {

    sphereGroup.children = [];

}

export { main, addDataToView, addSpheres, removeSpheres };