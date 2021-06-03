import * as THREE from "../three-bits/three.module.js";
import * as VF from "../maths-functions/vector-functions.js";
import { OrbitControls } from "../three-bits/orbit-controls.js";
import { SVGRenderer } from "../three-bits/SVGRenderer.js";

import * as HG from "../maths-functions/hyperbolic-geodesic.js";
import * as HF from "../maths-functions/hyperbolic-functions.js";

window.onload = main;

function main() {

    const eps = 1e-4;
    const outlineRes = 4;

    // Canvas constants
    const canvas = document.getElementById("canvas");
    var rect = canvas.getBoundingClientRect();

    var WIDTH = canvas.clientWidth;
    var HEIGHT = canvas.clientHeight;

    var mouseToggle = false;

    // Define scene and background colour
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xE5E5E5);

    // mode - the current selected move/vertex/edge/face/cell
    var mode = "move";

    // hyperbolic model
    var model = "uhp";

    // parameters for the edges
    const edgeNumber = 100;
    const edgeWidth = 2;

    // Mouse location
    const geometrySphere = new THREE.SphereBufferGeometry(0.2, 4, 4);
    const materialSphere = new THREE.MeshBasicMaterial({ color: 0xffffff });
    var sphereMouse = new THREE.Mesh(geometrySphere, materialSphere);
    scene.add(sphereMouse);

    // Locations of the control points
    const materialSphere1 = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    const materialSphere2 = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    const materialSphere3 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const materialSphere4 = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    var sphere1 = new THREE.Mesh(geometrySphere, materialSphere1);
    var sphere2 = new THREE.Mesh(geometrySphere, materialSphere2);
    var sphere3 = new THREE.Mesh(geometrySphere, materialSphere3);
    var sphere4 = new THREE.Mesh(geometrySphere, materialSphere4);

    sphere1.position.set(1, 0, 0);
    sphere2.position.set(0, 1, 0);
    sphere3.position.set(0, 0, 1);
    sphere4.position.set(0, 0, 0);

    sphere1.visible = false;
    sphere2.visible = false;
    sphere3.visible = false;
    sphere4.visible = false;

    const sphereGroup = new THREE.Group();
    sphereGroup.add(sphere1, sphere2, sphere3, sphere4);

    scene.add(sphereGroup)

    // control arrays
    var vertexControl = [sphere1];
    var edgeControl = [sphere1, sphere2];
    var faceControl = [sphere1, sphere2, sphere3];
    var cellControl = [sphere1, sphere2, sphere3, sphere4];

    // selector markers
    var edgeMarker = 0;
    var faceMarker = 0;
    var cellMarker = 0;

    // arrays of vertex/edge/face/cell data
    var vertices = [];
    var edges = [];
    var faces = [];
    var cells = [];
    var outlines = [];

    var sin = [];
    var cos = [];
    var theta = 0;
    const change = 2 * Math.PI / (outlineRes * edgeNumber);

    for (var k = 0; k <= outlineRes * edgeNumber; k++) {

        cos.push(Math.cos(theta));
        sin.push(Math.sin(theta));

        theta += change;

    }

    var edgeGroup = new THREE.Group();
    var outlineGroup = new THREE.Group();
    scene.add(edgeGroup, outlineGroup);

    var renderer = new SVGRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    canvas.appendChild(renderer.domElement);

    var camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.1, 100);
    camera.position.set(5, 5, 5);
    camera.up = new THREE.Vector3(0, 0, 1);

    var cam = camera.position.toArray();

    scene.add(camera);

    var controls = new OrbitControls(camera, canvas);
    controls.enabled = true;
    controls.update();

    var lineGroup = new THREE.Group();
    scene.add(lineGroup);

    const geometry = new THREE.PlaneBufferGeometry(20, 20, 10, 10);
    const material = new THREE.MeshLambertMaterial({
        color: 0xBBBBBB,
        side: THREE.DoubleSide,
        opacity: 0.1,
        transparent: true
    });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    var grid = false;
    var rounded = [0, 0, 0];
    const roundedParam = 1;

    // Make raycaster and mouse vector
    var raycaster = new THREE.Raycaster();
    raycaster.params.Line.threshold = 0.1;
    var mouseVector = new THREE.Vector2();
    var dPlane = Infinity;
    var dEdges = Infinity;
    var intersectPlane;
    var intersectEdges;

    render();

    window.addEventListener("resize", onWindowResize, false);

    function onWindowResize() {

        WIDTH = canvas.clientWidth;
        HEIGHT = canvas.clientHeight;

        rect = canvas.getBoundingClientRect();

        renderer.setSize(WIDTH, HEIGHT);

        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();

    }

    function render() {

        renderer.render(scene, camera);
        requestAnimationFrame(render);

    }

    document.getElementById("addvertices").addEventListener("click", function () {
        mode = "addvertices";
    });

    document.getElementById("addedges").addEventListener("click", function () {
        mode = "addedges";
    });

    document.getElementById("addfaces").addEventListener("click", function () {
        mode = "addfaces";
    });

    document.getElementById("addcells").addEventListener("click", function () {
        mode = "addcells";
    });

    document.getElementById("move").addEventListener("click", function () {
        mode = "move";
    });

    document.getElementById("visible").addEventListener("click", function () {
        ;
    });

    document.getElementById("grid").addEventListener("click", function () {
        grid = !grid;
    });

    document.getElementById("model").addEventListener("click", function () {
        model = (model === "uhp") ? "poincare" : "uhp";

        outline();

        edgeGroup.children = visibleEdges().children;
        outlineGroup.children = visibleOutlines().children;

    });

    canvas.addEventListener("mouseup", onClick);

    canvas.addEventListener("mousemove", mouseMove);

    canvas.addEventListener("mousedown", mouseDown);

    function mouseDown() {

        mouseToggle = true;

    }

    function mouseMove(event) {

        event.preventDefault();

        // Get the relative position of the mouse to the canvas
        mouseVector.x = ((event.clientX - rect.left) / WIDTH) * 2 - 1;
        mouseVector.y = - ((event.clientY - rect.top) / HEIGHT) * 2 + 1;

        raycaster.setFromCamera(mouseVector, camera);

        intersectPlane = raycaster.intersectObjects([plane], true);
        intersectEdges = raycaster.intersectObjects(edgeGroup.children, true);


        if (edgeGroup.children.length > 0) {

            if (intersectPlane.length > 0) {

                dPlane = intersectPlane[0].distance;

            } else {

                dPlane = Infinity;

            }

            if (intersectEdges.length > 0) {

                dEdges = intersectEdges[0].distance;

            } else {

                dEdges = Infinity;

            }

            if (isFinite(dEdges) || isFinite(dPlane)) {

                if ((dEdges <= dPlane)) {

                    sphereMouse.position.copy(intersectEdges[0].point);

                } else {

                    if (grid) {

                        rounded = intersectPlane[0].point.toArray();
                        rounded = [
                            Math.round(rounded[0] * roundedParam) / roundedParam,
                            Math.round(rounded[1] * roundedParam) / roundedParam,
                            Math.round(rounded[2] * roundedParam) / roundedParam
                        ];

                        sphereMouse.position.fromArray(rounded);

                    } else {

                        sphereMouse.position.copy(intersectPlane[0].point);

                    }

                }

            }

        } else if (intersectPlane.length > 0) {

            if (grid) {

                rounded = intersectPlane[0].point.toArray();
                rounded = [
                    Math.round(rounded[0] * roundedParam) / roundedParam,
                    Math.round(rounded[1] * roundedParam) / roundedParam,
                    Math.round(rounded[2] * roundedParam) / roundedParam
                ];

                sphereMouse.position.fromArray(rounded);

            } else {

                sphereMouse.position.copy(intersectPlane[0].point);

            }

        }

        if (mouseToggle) {

            outline();

            edgeGroup.children = visibleEdges().children;
            outlineGroup.children = visibleOutlines().children;

        }


    }

    function onClick(event) {

        event.preventDefault();

        if (mode === "addvertices") {

            vertexControl[0].position.copy(sphereMouse.position);

            addToVertices(HF.upperHalfPlaneToHyperboloid(sphereMouse.position.toArray()), [], [], []);

        } else if (mode === "addedges") {

            edgeControl[edgeMarker].position.copy(sphereMouse.position);

            edgeControl[edgeMarker].visible = true;

            edgeMarker++;

            if (edgeMarker == 2) {

                addToVertices(HF.upperHalfPlaneToHyperboloid(edgeControl[0].position.toArray()), [edges.length - 1], [], []);
                addToVertices(HF.upperHalfPlaneToHyperboloid(edgeControl[1].position.toArray()), [edges.length - 1], [], []);

                addToEdges(vertices.length - 2, vertices.length - 1, [vertices.length - 2, vertices.length - 1], [], []);

                if (model === "poincare") {

                    edgeGroup.add(drawLine(edges[edges.length - 1].poincareCoords, 0x000000));

                } else if (model === "uhp") {

                    edgeGroup.add(drawLine(edges[edges.length - 1].uhpCoords, 0x000000));

                }

                edgeMarker = 0;

                edgeControl.forEach((sphere) => {
                    sphere.visible = false;
                });

            }

        } else if (mode === "addfaces") {

            faceControl[faceMarker].position.copy(sphereMouse.position);
            faceControl[faceMarker].visible = true;

            faceMarker++;

            if (faceMarker == 3) {

                addToVertices(HF.upperHalfPlaneToHyperboloid(faceControl[0].position.toArray()), [edges.length - 3, edges.length - 1], [faces.length - 1], []);
                addToVertices(HF.upperHalfPlaneToHyperboloid(faceControl[1].position.toArray()), [edges.length - 3, edges.length - 2], [faces.length - 1], []);
                addToVertices(HF.upperHalfPlaneToHyperboloid(faceControl[2].position.toArray()), [edges.length - 2, edges.length - 1], [faces.length - 1], []);

                addToEdges(vertices.length - 3, vertices.length - 2, [vertices.length - 3, vertices.length - 2], [], []);
                addToEdges(vertices.length - 2, vertices.length - 1, [vertices.length - 2, vertices.length - 1], [], []);
                addToEdges(vertices.length - 3, vertices.length - 1, [vertices.length - 3, vertices.length - 1], [], []);

                if (model === "poincare") {

                    edgeGroup.add(drawLine(edges[edges.length - 3].poincareCoords, 0x000000));
                    edgeGroup.add(drawLine(edges[edges.length - 2].poincareCoords, 0x000000));
                    edgeGroup.add(drawLine(edges[edges.length - 1].poincareCoords, 0x000000));

                } else if (model === "uhp") {

                    edgeGroup.add(drawLine(edges[edges.length - 3].uhpCoords, 0x000000));
                    edgeGroup.add(drawLine(edges[edges.length - 2].uhpCoords, 0x000000));
                    edgeGroup.add(drawLine(edges[edges.length - 1].uhpCoords, 0x000000));

                }

                addToFaces(vertices.length - 3, vertices.length - 2, vertices.length - 1, [vertices.length - 3, vertices.length - 2, vertices.length - 1], [edges.length - 3, edges.length - 2, edges.length - 1], []);

                outline();

                faceMarker = 0;

                faceControl.forEach((sphere) => {
                    sphere.visible = false;
                });

            }

        } else if (mode === "addcells") {

            cellControl[cellMarker].position.copy(sphereMouse.position);
            cellControl[cellMarker].visible = true;

            cellMarker++;

            if (cellMarker == 4) {

                addToVertices(HF.upperHalfPlaneToHyperboloid(cellControl[0].position.toArray()), [], [], []);
                addToVertices(HF.upperHalfPlaneToHyperboloid(cellControl[1].position.toArray()), [], [], []);
                addToVertices(HF.upperHalfPlaneToHyperboloid(cellControl[2].position.toArray()), [], [], []);
                addToVertices(HF.upperHalfPlaneToHyperboloid(cellControl[3].position.toArray()), [], [], []);

                addToEdges(vertices.length - 4, vertices.length - 3, [], [], []);
                addToEdges(vertices.length - 4, vertices.length - 2, [], [], []);
                addToEdges(vertices.length - 4, vertices.length - 1, [], [], []);
                addToEdges(vertices.length - 3, vertices.length - 2, [], [], []);
                addToEdges(vertices.length - 3, vertices.length - 1, [], [], []);
                addToEdges(vertices.length - 2, vertices.length - 1, [], [], []);

                if (model === "poincare") {

                    edgeGroup.add(drawLine(edges[edges.length - 6].poincareCoords, 0x000000));
                    edgeGroup.add(drawLine(edges[edges.length - 5].poincareCoords, 0x000000));
                    edgeGroup.add(drawLine(edges[edges.length - 4].poincareCoords, 0x000000));
                    edgeGroup.add(drawLine(edges[edges.length - 3].poincareCoords, 0x000000));
                    edgeGroup.add(drawLine(edges[edges.length - 2].poincareCoords, 0x000000));
                    edgeGroup.add(drawLine(edges[edges.length - 1].poincareCoords, 0x000000));

                } else if (model === "uhp") {

                    edgeGroup.add(drawLine(edges[edges.length - 6].uhpCoords, 0x000000));
                    edgeGroup.add(drawLine(edges[edges.length - 5].uhpCoords, 0x000000));
                    edgeGroup.add(drawLine(edges[edges.length - 4].uhpCoords, 0x000000));
                    edgeGroup.add(drawLine(edges[edges.length - 3].uhpCoords, 0x000000));
                    edgeGroup.add(drawLine(edges[edges.length - 2].uhpCoords, 0x000000));
                    edgeGroup.add(drawLine(edges[edges.length - 1].uhpCoords, 0x000000));

                }

                addToFaces(vertices.length - 3, vertices.length - 2, vertices.length - 1, [], [], []);
                addToFaces(vertices.length - 4, vertices.length - 2, vertices.length - 1, [], [], []);
                addToFaces(vertices.length - 4, vertices.length - 3, vertices.length - 1, [], [], []);
                addToFaces(vertices.length - 4, vertices.length - 3, vertices.length - 2, [], [], []);

                addToCells(vertices.length - 4, vertices.length - 3, vertices.length - 2, vertices.length - 1, [], []);

                outline();

                cellMarker = 0;

                cellControl.forEach((sphere) => {
                    sphere.visible = false;
                })

            }

        }

        edgeGroup.children = visibleEdges().children;
        outlineGroup.children = visibleOutlines().children;

        mouseToggle = false;

    }

    function drawLine(vectors, col) {

        var threeVectors = [];

        vectors.forEach((vect) => {
            threeVectors.push(new THREE.Vector3().fromArray(vect));
        });

        var geometry = new THREE.BufferGeometry().setFromPoints(threeVectors);
        var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: col, linewidth: edgeWidth }));

        return line;

    }

    function addToVertices(vertex, e, f, c) {

        vertices.push({
            hyperboloid: vertex,
            klein: HF.hyperboloidToKlein(vertex),
            poincare: HF.hyperboloidToPoincare(vertex),
            uhp: HF.hyperboloidToUpperHalfPlane(vertex),
            edges: e,
            faces: f,
            cells: c
        });

    }

    function addToEdges(v1, v2, v, f, c) {

        const coords = HG.hyperbolicGeodesic(vertices[v1], vertices[v2], edgeNumber);

        edges.push({
            poincareCoords: coords.poincare,
            uhpCoords: coords.uhp,
            vertices: v,
            faces: f,
            cells: c
        });

    }

    function addToFaces(v1, v2, v3, v, e, c) {

        var v1 = vertices[v1];
        var v2 = vertices[v2];
        var v3 = vertices[v3];

        const hyperboloidPolygon = [
            v1.hyperboloid,
            v2.hyperboloid,
            v3.hyperboloid
        ];

        const kleinPolygon = [
            v1.klein,
            v2.klein,
            v3.klein
        ];

        var hyperboloidCenter = VF.vectorSum(hyperboloidPolygon);
        hyperboloidCenter = VF.vectorScale(hyperboloidCenter, 1 / Math.sqrt(Math.abs(HF.hyperbolicNorm(hyperboloidCenter))));

        const poincareCenter = HF.hyperboloidToPoincare(hyperboloidCenter);
        const uhpCenter = HF.hyperboloidToUpperHalfPlane(hyperboloidCenter);

        var poincareType, uhpType, poincareSphereCenter, poincareRadius, poincareD, poincareNormal, uhpSphereCenter, uhpRadius, uhpD, uhpNormal;

        if (Math.abs(VF.determinant3([
            VF.vectorDiff(v1.poincare, poincareCenter),
            VF.vectorDiff(v2.poincare, poincareCenter),
            VF.vectorDiff(v3.poincare, poincareCenter)
        ])) > eps) {

            poincareType = "sphere";

            [poincareSphereCenter, poincareRadius] = VF.circum4(v1.poincare, v2.poincare, v3.poincare, poincareCenter);

            poincareD = VF.determinant3([
                VF.vectorDiff(v1.poincare, poincareCenter),
                VF.vectorDiff(v2.poincare, poincareCenter),
                VF.vectorDiff(v3.poincare, poincareCenter)
            ]);

            poincareNormal = [0, 0, 0];

        } else {

            poincareType = "plane";

            poincareSphereCenter = [0, 0, 0];
            poincareRadius = 0;

            poincareD = 0;
            poincareNormal = VF.vectorCross(VF.vectorDiff(v2.poincare, v1.poincare), VF.vectorDiff(v3.poincare, v1.poincare));

        }

        if (Math.abs(VF.determinant3([
            VF.vectorDiff(v1.uhp, uhpCenter),
            VF.vectorDiff(v2.uhp, uhpCenter),
            VF.vectorDiff(v3.uhp, uhpCenter)
        ])) > eps) {

            uhpType = "sphere";

            [uhpSphereCenter, uhpRadius] = VF.circum4(v1.uhp, v2.uhp, v3.uhp, uhpCenter);

            uhpD = VF.determinant3([
                VF.vectorDiff(v1.uhp, uhpCenter),
                VF.vectorDiff(v2.uhp, uhpCenter),
                VF.vectorDiff(v3.uhp, uhpCenter)
            ]);

            uhpNormal = [0, 0, 0];

        } else {

            uhpType = "plane";

            if (v1.uhp[2] === Infinity) {

                v1.uhp = uhpCenter;

            } else if (v2.uhp[2] === Infinity) {

                v2.uhp = uhpCenter;

            } else if (v3.uhp[2] === Infinity) {

                v3.uhp = uhpCenter;

            }

            uhpSphereCenter = [0, 0, 0];
            uhpRadius = 0;

            uhpD = VF.determinant3([v1.uhp, v2.uhp, uhpCenter]);

            /////////// console.log(v1.uhp, v2.uhp, v3.uhp, uhpCenter, uhpD)
            uhpNormal = VF.vectorCross(VF.vectorDiff(v2.uhp, v1.uhp), VF.vectorDiff(uhpCenter, v1.uhp));

        }

        faces.push({
            poincareType: poincareType,
            uhpType: uhpType,
            hyperboloidCenter: hyperboloidCenter,
            hyperboloidPolygon: hyperboloidPolygon,
            kleinPolygon: kleinPolygon,
            poincareCenter: poincareCenter,
            poincareSphereCenter: poincareSphereCenter,
            poincareRadius: poincareRadius,
            poincareD: poincareD,
            poincareNormal: poincareNormal,
            uhpCenter: uhpCenter,
            uhpSphereCenter: uhpSphereCenter,
            uhpRadius: uhpRadius,
            uhpD: uhpD,
            uhpNormal: uhpNormal,
            vertices: v,
            edges: e,
            cells: c
        })

    }

    function addToCells(v1, v2, v3, v4, e, f) {

        cells.push({
            vertices: [v1, v2, v3, v4],
            edges: e,
            faces: f
        });

    }

    function outline() {

        outlines = [];

        cam = camera.position.toArray();

        var center, r, diff, cs, h, t, interp, perp, v, outline, testCoord;

        for (var i = 0; i < faces.length; i++) {

            if (model === "poincare") {

                if (faces[i].poincareType === "sphere") {

                    center = faces[i].poincareSphereCenter;
                    r = faces[i].poincareRadius;

                } else {

                    continue;

                }

            } else if (model === "uhp") {

                if (faces[i].uhpType === "sphere") {

                    center = faces[i].uhpSphereCenter;
                    r = faces[i].uhpRadius;

                } else {

                    continue;

                }

            }

            diff = VF.vectorDiff(center, cam);
            cs = VF.norm(diff);

            t = (r * r) / (cs * cs);
            h = r * Math.sqrt(1 - t);
            interp = VF.vectorSum([VF.vectorScale(center, 1 - t), VF.vectorScale(cam, t)]);

            perp = [1, 0, 0];

            if (Math.abs(diff[0]) > eps || Math.abs(diff[1]) > eps) {

                perp = [-diff[1] * h / VF.norm([diff[0], diff[1]]), diff[0] * h / VF.norm([diff[0], diff[1]]), 0];

            }

            v = VF.vectorCross(perp, VF.vectorScale(diff, 1 / cs));

            if (v[2] < 0) {

                v = VF.vectorScale(v, -1);

            }

            outline = [];

            for (var k = 0; k <= outlineRes * edgeNumber; k++) {

                testCoord = VF.vectorSum([VF.vectorScale(perp, cos[k]), VF.vectorScale(v, sin[k]), interp]);

                if (inHyperbolicFace(testCoord, i)) {

                    outline.push(testCoord);

                } else {

                    outlines.push(outline);
                    outline = [];

                }

            }

            outlines.push(outline);

        }

    }

    function inHyperbolicFace(point, face) {

        var kleinPoint;

        if (model === "uhp") {

            if (point[2] < 0) {

                return false;

            }

            kleinPoint = HF.upperHalfPlaneToKlein(point);

        } else {

            if (VF.norm2(point) > 1) {

                return false;

            }

            kleinPoint = HF.poincareToKlein(point);

        }

        return pointInPolygon(kleinPoint, faces[face].kleinPolygon);

    }

    function pointInPolygon(point, polygon) {

        var v0, v1, v2, dot01, dot12, dot20, dot11, dot22;

        for (var i = 1; i < polygon.length - 1; i++) {

            v0 = VF.vectorDiff(polygon[0], point);
            v1 = VF.vectorDiff(polygon[i], point);
            v2 = VF.vectorDiff(polygon[i + 1], point);

            dot01 = VF.vectorDot(v0, v1);
            dot12 = VF.vectorDot(v1, v2);
            dot20 = VF.vectorDot(v2, v0);
            dot11 = VF.vectorDot(v1, v1);
            dot22 = VF.vectorDot(v2, v2);

            if ((dot12 * dot20 > dot22 * dot01) && (dot01 * dot12 > dot11 * dot20)) {

                return true;

            }

        }

        return false;

    }

    function visibleEdges() {

        var edgeGroupLocal = new THREE.Group();

        var drawVerts, segments, segmentsPoints, segNum, points;

        for (var i = 0; i < edges.length; i++) {

            if (model === "poincare") {

                points = edges[i].poincareCoords;

            } else if (model === "uhp") {

                points = edges[i].uhpCoords;

            }

            if (points.length > 0) {

                drawVerts = [];

                for (var k = 0; k < points.length; k++) {

                    drawVerts.push([points[k], visibilityTest(points[k])]);

                }

                segments = [[drawVerts[0]]];
                segmentsPoints = [[drawVerts[0][0]]];
                segNum = 0;

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

                        edgeGroupLocal.add(drawLine(segmentsPoints[k], 0x000000));

                        // } else {

                        //     if (invisibleLines) {

                        //         edgeGroup.add(drawLine(segmentsPoints[k], 0xBBBBBB, 2));

                        //     }

                    }

                }

            }

        }

        return edgeGroupLocal;

    }

    function visibleOutlines() {

        outline();

        var edgeGroupLocal = new THREE.Group();

        var drawVerts, segments, segmentsPoints, segNum, points;

        for (var i = 0; i < outlines.length; i++) {

            points = outlines[i];

            if (points.length > 0) {

                drawVerts = [];

                for (var k = 0; k < points.length; k++) {

                    drawVerts.push([points[k], visibilityTest(points[k])]);

                }

                segments = [[drawVerts[0]]];
                segmentsPoints = [[drawVerts[0][0]]];
                segNum = 0;

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

                        edgeGroupLocal.add(drawLine(segmentsPoints[k], 0x000000));

                        // } else {

                        //     if (invisibleLines) {

                        //         edgeGroup.add(drawLine(segmentsPoints[k], 0xBBBBBB, 2));

                        //     }

                    }

                }

            }

        }

        return edgeGroupLocal;

    }

    function visibilityTest(point) {

        cam = camera.position.toArray();

        const pc = VF.vectorDiff(point, cam);

        var cs, A, B, C, delta, t, sphereCenter, radius, d, normal;

        for (var i = 0; i < faces.length; i++) {

            if (model === "poincare") {

                if (faces[i].poincareType === "sphere") {

                    sphereCenter = faces[i].poincareSphereCenter;
                    radius = faces[i].poincareRadius;
                    d = faces[i].poincareD;
                    normal = faces[i].poincareNormal;

                    cs = VF.vectorDiff(cam, sphereCenter);

                    A = VF.vectorDot(pc, pc);
                    B = VF.vectorDot(pc, cs);
                    C = VF.vectorDot(cs, cs) - radius * radius;

                    delta = B * B - A * C;

                    if ((delta <= 0) || isNaN(delta)) {

                        continue;

                    } else {

                        t = (-B + Math.sqrt(delta)) / A;

                        if (eps < t && t < 1 - eps) {

                            if (inHyperbolicFace(VF.vectorSum([cam, VF.vectorScale(pc, t)]), i)) {

                                return false;

                            }

                        }

                        t = -2 * B / A - t;

                        if (eps < t && t < 1 - eps) {

                            if (inHyperbolicFace(VF.vectorSum([cam, VF.vectorScale(pc, t)]), i)) {

                                return false;

                            }

                        }

                    }

                } else if (faces[i].poincareType === "plane") {

                    t = (d - VF.vectorDot(cam, normal)) / VF.vectorDot(pc, normal);

                    if (eps < t && t < 1 - eps) {

                        if (inHyperbolicFace(VF.vectorSum([cam, VF.vectorScale(pc, t)]), i)) {

                            return false;

                        }

                    }

                }

            } else if (model === "uhp") {

                if (faces[i].uhpType === "sphere") {

                    sphereCenter = faces[i].uhpSphereCenter;
                    radius = faces[i].uhpRadius;
                    d = faces[i].uhpD;
                    normal = faces[i].uhpNormal;

                    cs = VF.vectorDiff(cam, sphereCenter);

                    A = VF.vectorDot(pc, pc);
                    B = VF.vectorDot(pc, cs);
                    C = VF.vectorDot(cs, cs) - radius * radius;

                    delta = B * B - A * C;

                    if ((delta <= 0) || isNaN(delta)) {

                        continue;

                    } else {

                        t = (-B + Math.sqrt(delta)) / A;

                        if (eps < t && t < 1 - eps) {

                            if (inHyperbolicFace(VF.vectorSum([cam, VF.vectorScale(pc, t)]), i)) {

                                return false;

                            }

                        }

                        t = -2 * B / A - t;

                        if (eps < t && t < 1 - eps) {

                            if (inHyperbolicFace(VF.vectorSum([cam, VF.vectorScale(pc, t)]), i)) {

                                return false;

                            }

                        }

                    }

                } else if (faces[i].uhpType === "plane") {

                    console.log(normal)

                    t = (d - VF.vectorDot(cam, normal)) / VF.vectorDot(pc, normal);

                    if (eps < t && t < 1 - eps) {

                        if (inHyperbolicFace(VF.vectorSum([cam, VF.vectorScale(pc, t)]), i)) {

                            return false;

                        }

                    }

                }

            }

        }

        return true;

    }

    function pairwise() {

        for (var i = 0; i < faces.length; i++) {

            for (var j = i + 1; j < faces.length; j++) {

                if (model === "poincare") {

                    if (poincareType === "sphere") {



                    }

                }

            }

        }

    }

}