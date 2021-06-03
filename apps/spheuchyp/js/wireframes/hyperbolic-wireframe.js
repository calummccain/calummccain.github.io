// ========================================================
// Generates the edge and outline data for a hyperbolic
// cell
//
// Inputs: data
//         parameters
// Output: a three.js group of lines
//
// Change history:
//     14/05/21 Initial commit
//     29/05/21 Using precalculated v-v constants from 
//              data file
//              Rewrote geodesic code so have to update it
//              here (no divide by p[0])
//     30/05/21 Bug with making faces for ultracompact 
//              cells
//=========================================================

import * as THREE from "../three-bits/three.module.js";
import * as HF from "../maths-functions/hyperbolic-functions.js";
import * as VF from "../maths-functions/vector-functions.js";
import * as RF from "../maths-functions/rotation-functions.js";
import { matrixDict } from "../maths-functions/generate-tesselations.js";

const eps = 1e-4;

function hyperbolicEdges(data, parameters) {

    // Parameter checks
    const cells = parameters.cells || [""];
    const [thetax, thetay, thetaz, thetau, thetav, thetaw] = parameters.angles || [0, 0, 0, 0, 0, 0];
    const number = parameters.number || 1;
    const camera = parameters.camera || [10, 0, 0];
    const width = parameters.width || 1;
    const invisibleLines = parameters.invisibleLines || false;
    const model = parameters.model || "uhp";

    const outlineRes = 8;

    // matrix dictionary
    const matrix = (letter, v) => matrixDict(letter, data.a, data.b, data.c, data.d, data.e, data.f, v);

    // calculate sin and cos vectors for efficiency
    var sin = [];
    var cos = [];
    var theta = 0;
    const change = 2 * Math.PI / (outlineRes * number);

    for (var k = 0; k <= outlineRes * number; k++) {

        cos.push(Math.cos(theta));
        sin.push(Math.sin(theta));

        theta += change;

    }

    // Variable definitions
    var localVertices;
    var vertices = [];
    var edges = [];
    var faces = [];

    // Step 1: Generate the vertex, edge and face data
    for (var i = 0; i < parameters.cells.length; i++) {

        localVertices = [];
        localVertices = generateVertices(cells[i]);
        vertices = vertices.concat(localVertices);

        generateFaces(localVertices);

        edges = edges.concat(generateEdges(localVertices));

    }

    outline();

    var edgeGroup = visibleEdges()

    // generate the positions of the vertices in several models
    function generateVertices(cell) {

        var newVertices = VF.transformVertices(data.vertices, cell, matrix);

        var verts = [];
        var p;

        for (var i = 0; i < data.numVertices; i++) {

            if (data.cellType === "euclidean") {

                p = data.flip(RF.ruvw(RF.rxyz(data.f(newVertices[i]), thetax, thetay, thetaz), thetau, thetav, thetaw, data.metric));

            } else if (data.cellType === "hyperbolic") {

                p = data.flip(RF.ruvw(RF.rxyz(data.f(newVertices[i]), thetax, thetay, thetaz), thetau, thetav, thetaw, data.metric));

            } else {

                p = RF.ruvw(RF.rxyz(data.f(newVertices[i]), thetax, thetay, thetaz), thetau, thetav, thetaw, data.metric);

            }

            verts.push({
                hyperboloid: p,
                klein: HF.hyperboloidToKlein(p)
            });

        }

        return verts;

    }

    // generate the faces that bound the geometry
    function generateFaces(localVertices) {

        var polygonKlein, polygonHyperboloid, centerHyperboloid, v1, v2, v3, centerModel, normal, sphereCenter, radius;

        for (var i = 0; i < data.numFaces; i++) {

            polygonKlein = [];
            polygonHyperboloid = [];

            for (var j = 0; j < data.faces[i].length; j++) {

                polygonKlein.push(localVertices[data.faces[i][j]].klein);
                polygonHyperboloid.push(localVertices[data.faces[i][j]].hyperboloid);

            }

            centerHyperboloid = VF.vectorSum(polygonHyperboloid);
            centerHyperboloid = VF.vectorScale(centerHyperboloid, 1 / Math.sqrt(Math.abs(HF.hyperbolicNorm(centerHyperboloid))));

            if (data.metric === "u") {

                v1 = HF.geodesicEndpoints(localVertices[data.faces[i][0]].hyperboloid, localVertices[data.faces[i][1]].hyperboloid, data.vv)[0];
                v2 = HF.geodesicEndpoints(localVertices[data.faces[i][1]].hyperboloid, localVertices[data.faces[i][2]].hyperboloid, data.vv)[0];
                v3 = HF.geodesicEndpoints(localVertices[data.faces[i][2]].hyperboloid, localVertices[data.faces[i][3 % data.faces[i].length]].hyperboloid, data.vv)[0];

            } else {

                v1 = localVertices[data.faces[i][0]].hyperboloid;
                v2 = localVertices[data.faces[i][1]].hyperboloid;
                v3 = localVertices[data.faces[i][2]].hyperboloid;

            }

            if (model === "uhp") {

                v1 = HF.hyperboloidToUpperHalfPlane(v1);
                v2 = HF.hyperboloidToUpperHalfPlane(v2);
                v3 = HF.hyperboloidToUpperHalfPlane(v3);
                centerModel = HF.hyperboloidToUpperHalfPlane(centerHyperboloid);

            } else {

                v1 = HF.hyperboloidToPoincare(v1);
                v2 = HF.hyperboloidToPoincare(v2);
                v3 = HF.hyperboloidToPoincare(v3);
                centerModel = HF.hyperboloidToPoincare(centerHyperboloid);

            }

            if (Math.abs(VF.determinant3([
                VF.vectorDiff(v1, centerModel),
                VF.vectorDiff(v2, centerModel),
                VF.vectorDiff(v3, centerModel)
            ])) > eps) {

                [sphereCenter, radius] = VF.circum4(v1, v2, v3, centerModel);

                faces.push({
                    type: "sphere",
                    radius: radius,
                    sphereCenter: sphereCenter,
                    d: VF.determinant3([
                        VF.vectorDiff(v1, centerModel),
                        VF.vectorDiff(v2, centerModel),
                        VF.vectorDiff(v3, centerModel)
                    ]),
                    normal: [0, 0, 0],
                    centerHyperboloid: centerHyperboloid,
                    centerModel: centerModel,
                    polygonHyperboloid: polygonHyperboloid,
                    polygonKlein: polygonKlein
                });

            } else {

                if (v1[2] === Infinity) {

                    v1 = centerModel;

                } else if (v2[2] === Infinity) {

                    v2 = centerModel;

                } else if (v3[2] === Infinity) {

                    v3 = centerModel;

                }

                faces.push({
                    type: "plane",
                    radius: 0,
                    sphereCenter: [0, 0, 0],
                    d: VF.determinant3([v1, v2, v3]),
                    normal: VF.vectorCross(VF.vectorDiff(v2, v1), VF.vectorDiff(v3, v1)),
                    centerHyperboloid: centerHyperboloid,
                    centerModel: centerModel,
                    polygonHyperboloid: polygonHyperboloid,
                    polygonKlein: polygonKlein
                });

            }

        }

    }

    // find the coordinates of the edges
    function generateEdges(localVertices) {

        var edgeCoords = [];
        var ratios = [];

        if (data.metric === "h") {

            const an = Math.acosh(data.vv) / number;
            const denom = 1 / Math.sqrt(data.vv * data.vv - 1);
            var theta = 0;

            for (var i = 0; i <= number; i++) {

                ratios.push(Math.sinh(theta) * denom);
                theta += an;

            }

        } else if (data.metric === "p") {

            const denom = 1 / Math.sqrt(2 * data.vv);
            const a = 10 / number;
            var theta = -5;

            for (var i = 0; i <= number; i++) {

                ratios.push(Math.exp(theta) * denom);
                theta += a;

            }

        } else if (data.metric === "u") {

            var [e1, e2] = HF.geodesicEndpoints(localVertices[data.edges[0][0]].hyperboloid, localVertices[data.edges[0][1]].hyperboloid, data.vv);
            const denom = 1 / 2;
            const a = 10 / number;
            var theta = -5;

            for (var i = 0; i <= number; i++) {

                ratios.push(Math.exp(theta) * denom);
                theta += a;

            }

        }

        var edge, start, end;

        data.edges.forEach((endpoints) => {

            edge = [];

            if (data.metric === "u") {

                [start, end] = HF.geodesicEndpoints(localVertices[endpoints[0]].hyperboloid, localVertices[endpoints[1]].hyperboloid, data.vv);

            } else {

                start = localVertices[endpoints[0]].hyperboloid;
                end = localVertices[endpoints[1]].hyperboloid;

            }

            if (model === "uhp") {

                for (var i = 0; i <= number; i++) {

                    edge.push(HF.hyperboloidToUpperHalfPlane(VF.vectorSum([VF.vectorScale(start, ratios[i]), VF.vectorScale(end, ratios[number - i])])));

                }

                edgeCoords.push(edge);

            } else {

                for (var i = 0; i <= number; i++) {

                    edge.push(HF.hyperboloidToPoincare(VF.vectorSum([VF.vectorScale(start, ratios[i]), VF.vectorScale(end, ratios[number - i])])));

                }

                edgeCoords.push(edge);

            }

        });

        if (data.metric === "u") {

            const newNumber = Math.round(number / 4);

            var e1, e2, ca, a, denom, theta, edge, start, end, ratios, e3, e4;

            e1 = HF.geodesicEndpoints(localVertices[data.faces[0][0]].hyperboloid, localVertices[data.faces[0][1]].hyperboloid, data.vv)[0];
            e2 = HF.geodesicEndpoints(localVertices[data.faces[0][1]].hyperboloid, localVertices[data.faces[0][2]].hyperboloid, data.vv)[0];

            e1.shift();
            e2.shift();

            ca = VF.vectorDot(e1, e2) / Math.sqrt(VF.norm2(e1) * VF.norm2(e2));
            a = Math.acos(ca);
            denom = 1 / Math.sin(a);

            theta = 0;
            ratios = [];

            for (var k = 0; k <= newNumber; k++) {

                ratios.push(Math.sin(theta) * denom);
                theta += a / newNumber;

            }

            for (var i = 0; i < data.numFaces; i++) {

                for (var j = 0; j < data.faces[i].length; j++) {

                    edge = [];

                    e3 = HF.geodesicEndpoints(localVertices[data.faces[i][j]].hyperboloid, localVertices[data.faces[i][(j - 1 + data.faces[i].length) % data.faces[i].length]].hyperboloid, data.vv)[0];
                    e4 = HF.geodesicEndpoints(localVertices[data.faces[i][j]].hyperboloid, localVertices[data.faces[i][(j + 1) % data.faces[i].length]].hyperboloid, data.vv)[0];
                    e3.shift();
                    e4.shift();
                    e3 = VF.vectorScale(e3, 1 / VF.norm(e3));
                    e4 = VF.vectorScale(e4, 1 / VF.norm(e4));

                    for (var k = 0; k <= newNumber; k++) {

                        if (model === "uhp") {

                            edge.push(
                                HF.hyperboloidToUpperHalfPlane([1].concat(VF.vectorSum([VF.vectorScale(e3, ratios[k]), VF.vectorScale(e4, ratios[newNumber - k])])))
                            );

                        } else {

                            edge.push(
                                HF.hyperboloidToPoincare([1].concat(VF.vectorSum([VF.vectorScale(e3, ratios[k]), VF.vectorScale(e4, ratios[newNumber - k])])))
                            );

                        }

                    }

                    edgeCoords.push(edge);

                }

            }

        }

        return edgeCoords;

    }

    function outline() {

        var center, r, diff, cs, h, t, interp, perp, v, outline, testCoord;

        for (var i = 0; i < faces.length; i++) {

            if (faces[i].type === "sphere") {

                center = faces[i].sphereCenter;
                r = faces[i].radius;

            } else {

                continue;

            }

            diff = VF.vectorDiff(center, camera);
            cs = VF.norm(diff);

            t = (r * r) / (cs * cs);
            h = r * Math.sqrt(1 - t);
            interp = VF.vectorSum([VF.vectorScale(center, 1 - t), VF.vectorScale(camera, t)]);

            perp = [1, 0, 0];

            if (Math.abs(diff[0]) > eps || Math.abs(diff[1]) > eps) {

                perp = [-diff[1] * h / VF.norm([diff[0], diff[1]]), diff[0] * h / VF.norm([diff[0], diff[1]]), 0];

            }

            v = VF.vectorCross(perp, VF.vectorScale(diff, 1 / cs));

            if (v[2] < 0) {

                v = VF.vectorScale(v, -1);

            }

            outline = [];

            for (var k = 0; k <= outlineRes * number; k++) {

                testCoord = VF.vectorSum([VF.vectorScale(perp, cos[k]), VF.vectorScale(v, sin[k]), interp]);

                if (inHyperbolicFace(testCoord, i)) {

                    outline.push(testCoord);

                } else {

                    edges.push(outline);
                    outline = [];

                }

            }

            edges.push(outline)

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

        return pointInPolygon(kleinPoint, faces[face].polygonKlein);

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

        var edgeGroup = new THREE.Group();

        var drawVerts, segments, segmentsPoints, segNum;

        edges.forEach((points) => {

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

                        edgeGroup.add(drawLine(segmentsPoints[k], 0x222222, 2));

                    } else {

                        if (invisibleLines) {

                            edgeGroup.add(drawLine(segmentsPoints[k], 0x888888, 2));

                        }

                    }

                }

            }

        });

        return edgeGroup;

    }

    function visibilityTest(point) {

        const pc = VF.vectorDiff(point, camera);

        var cs, A, B, C, delta, t;

        for (var i = 0; i < faces.length; i++) {

            if (faces[i].type === "sphere") {

                const faceEps = Math.min(faces[i].radius * eps, eps);

                cs = VF.vectorDiff(camera, faces[i].sphereCenter);

                A = VF.vectorDot(pc, pc);
                B = VF.vectorDot(pc, cs);
                C = VF.vectorDot(cs, cs) - faces[i].radius * faces[i].radius;

                delta = B * B - A * C;

                if ((delta <= 0) || isNaN(delta)) {

                    continue;

                } else {

                    t = (-B + Math.sqrt(delta)) / A;

                    if (faceEps < t && t < 1 - faceEps) {

                        if (inHyperbolicFace(VF.vectorSum([camera, VF.vectorScale(pc, t)]), i)) {

                            return false;

                        }

                    }

                    t = -2 * B / A - t;

                    if (faceEps < t && t < 1 - faceEps) {

                        if (inHyperbolicFace(VF.vectorSum([camera, VF.vectorScale(pc, t)]), i)) {

                            return false;

                        }

                    }

                }

            } else if (faces[i].type === "plane") {

                t = (faces[i].d - VF.vectorDot(camera, faces[i].normal)) / VF.vectorDot(pc, faces[i].normal);

                if (eps < t && t < 1 - eps) {

                    if (inHyperbolicFace(VF.vectorSum([camera, VF.vectorScale(pc, t)]), i)) {

                        return false;

                    }

                }

            }

        }

        return true;

    }

    function drawLine(vectors, col) {

        var threeVectors = [];

        vectors.forEach((vect) => {
            threeVectors.push(new THREE.Vector3().fromArray(vect));
        });

        var geometry = new THREE.BufferGeometry().setFromPoints(threeVectors);
        var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: col, linewidth: width }));

        return line;

    }

    return edgeGroup;

}

export { hyperbolicEdges };