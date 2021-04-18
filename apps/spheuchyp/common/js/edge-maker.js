import * as THREE from "../../../common/js/three-bits/three.module.js";
import * as HF from "./maths-functions/hyperbolic-functions.js";
import * as SF from "./maths-functions/spherical-functions.js";
import * as VF from "./maths-functions/vector-functions.js";
import * as RF from "./maths-functions/rotation-functions.js";
import { matrixDict } from "./data/matrix-dictionary.js";

const eps = 1e-4;

// Works 
// but
// needs tidying

function generateData(data, thetax, thetay, thetaz, thetau, thetav, thetaw, number, intersection, invisibleLines, camera, cells) {

    var spheres = [];
    var vertices = [];
    var drawableVertices = [];

    var localVertices, localSpheres;

    if (data.metric === "h" || data.metric === "p" || data.metric === "u") {

        for (var i = 0; i < cells.length; i++) {

            localVertices = generateVertices(data, thetax, thetay, thetaz, thetau, thetav, thetaw, cells[i]);
            localSpheres = generateSpheres(data, localVertices);

            vertices = vertices.concat(localVertices);
            spheres = spheres.concat(localSpheres);

            drawableVertices = drawableVertices.concat(makeTheLines(data, number, localVertices, localSpheres, intersection));

            if (intersection) {

                drawableVertices = drawableVertices.concat(outline(data, 2 * number, camera, localSpheres, localVertices));

            }

        }

    } else if (data.metric === "s") {

        for (var i = 0; i < cells.length; i++) {

            localVertices = generateVertices(data, thetax, thetay, thetaz, thetau, thetav, thetaw, cells[i]);
            localSpheres = generateSpheres(data, localVertices);

            vertices = vertices.concat(localVertices);
            spheres = spheres.concat(localSpheres);

            drawableVertices = drawableVertices.concat(makeTheLines(data, number, localVertices, localSpheres, intersection));

            drawableVertices = drawableVertices.concat(outline(data, 4 * number, camera, localSpheres, localVertices));

        }

    }

    var lineGroup = cameraLines(data, drawableVertices, invisibleLines, camera, spheres, vertices);

    return lineGroup;

}

// generate the positions of the vertices in several models
function generateVertices(data, thetax, thetay, thetaz, thetau, thetav, thetaw, cell) {

    // matrix dictionary
    const matrix = matrixDict(data);

    // Transform the 'central' cell's vertices to the transformed cell's vertices
    var newVertices = VF.transformVertices(data.vertices, cell, matrix);

    var verts = [];
    var p;

    if (data.metric === "h" || data.metric === "p" || data.metric === "u") {

        if (data.cellType === "euclidean") {

            for (var i = 0; i < data.numVertices; i++) {

                p = data.flip(RF.ruvw(RF.rxyz(data.f(newVertices[i]), thetax, thetay, thetaz), thetau, thetav, thetaw, data.metric));

                verts.push({
                    "hyperboloid": p,
                    "poincare": HF.hyperboloidToPoincare(p),
                    "klein": HF.hyperboloidToKlein(p),
                    "uhp": HF.hyperboloidToUpperHalfPlane(p)
                });

            }

        } else if (data.cellType === "hyperbolic") {

            for (var i = 0; i < data.numVertices; i++) {

                p = data.flip(RF.ruvw(RF.rxyz(data.f(newVertices[i]), thetax, thetay, thetaz), thetau, thetav, thetaw, data.metric));

                verts.push({
                    "hyperboloid": p,
                    "poincare": HF.hyperboloidToPoincare(p),
                    "klein": HF.hyperboloidToKlein(p),
                    "uhp": HF.hyperboloidToUpperHalfPlane(p)
                });

            }

        } else {

            for (var i = 0; i < data.numVertices; i++) {

                p = RF.ruvw(RF.rxyz(data.f(newVertices[i]), thetax, thetay, thetaz), thetau, thetav, thetaw, data.metric);

                verts.push({
                    "hyperboloid": p,
                    "poincare": HF.hyperboloidToPoincare(p),
                    "klein": HF.hyperboloidToKlein(p),
                    "uhp": HF.hyperboloidToUpperHalfPlane(p)
                });

            }

        }

    } else if (data.metric === "s") {

        for (var i = 0; i < data.numVertices; i++) {

            p = RF.ruvw(RF.rxyz(data.f(newVertices[i]), thetax, thetay, thetaz), thetau, thetav, thetaw, data.metric);

            verts.push({
                "hypersphere": p,
                "stereo": SF.hyperToStereo(p)
            });

        }

    }

    return verts;

}

// generate the spheres that bound the geometry (only for UHP)
function generateSpheres(data, vertices) {

    var spheres = [];

    if (data.metric === "h" || data.metric === "p" || data.metric === "u") {

        var v1, v2, v3, u1, u2, u3, center, sphereDict;

        for (var i = 0; i < data.numFaces; i++) {

            if (data.metric === "u") {

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

            center = HF.uhpCenter(v1, v2, v3);

            sphereDict = {
                "hyperboloid": {},
                "poincare": {},
                "uhp": {
                    center: center,
                    radius: VF.distance(v1, center)
                }
            };

            spheres.push(sphereDict);

        }

    } else if (data.metric === "s") {

        var u1, u2, u3, v1, v2, v3, triCenterStereo, center, radius, sphereDict, normal, type, center4;

        for (var i = 0; i < data.numFaces; i++) {

            center4 = [0, 0, 0, 0];

            for (var j = 0; j < data.numSides; j++) {

                center4 = VF.vectorSum([center4, vertices[data.faces[i][j]]["hypersphere"]]);

            }

            center4 = VF.vectorScale(center4, 1 / VF.norm(center4));

            // u1 = vertices[data.faces[i][0]]["hypersphere"];
            // u2 = vertices[data.faces[i][1]]["hypersphere"];
            // u3 = vertices[data.faces[i][2]]["hypersphere"];

            // triCenter = VF.vectorSum(u1, VF.vectorSum(u2, u3));
            // triCenter = VF.vectorScale(triCenter, 1 / VF.norm(triCenter));

            v1 = vertices[data.faces[i][0]]["stereo"];
            v2 = vertices[data.faces[i][1]]["stereo"];
            v3 = vertices[data.faces[i][2]]["stereo"];

            triCenterStereo = SF.hyperToStereo(center4);

            if (Math.abs(VF.determinant3([v1, v2, v3])) > eps) {

                type = "sphere";
                [center, radius] = VF.circum4(v1, v2, v3, triCenterStereo);
                normal = [0, 0, 0];

            } else {

                type = "plane";
                center = [0, 0, 0];
                radius = 0;
                normal = VF.vectorCross(VF.vectorDiff(v2, v1), VF.vectorDiff(v3, v1));

            }

            sphereDict = {
                type: type,
                center: center,
                radius: radius,
                normal: normal,
                center4: center4
            };

            spheres.push(sphereDict);

        }

    }

    return spheres;

}

// find the coordinates of the lines
function makeTheLines(data, number, vertices, spheres, intersection) {

    var lineCoords = [];

    if (data.metric === "h" || data.metric === "p" || data.metric === "u") {

        if (intersection) {

            var uhpVertices, e1, e2, p1, p2, radVect, center, r, startAngle, endAngle, numPieces, subAngle, theta;

            data.edges.forEach((endpoints) => {

                uhpVertices = [];

                if (data.metric === "u") {

                    e1 = HF.kleinToUpperHalfPlane(VF.lineSphereIntersection(vertices[endpoints[0]]["klein"], vertices[endpoints[1]]["klein"]));
                    e2 = HF.kleinToUpperHalfPlane(VF.lineSphereIntersection(vertices[endpoints[1]]["klein"], vertices[endpoints[0]]["klein"]));

                } else {

                    [e1, e2] = HF.geodesicEndpoints(vertices[endpoints[0]]["hyperboloid"], vertices[endpoints[1]]["hyperboloid"]);
                    e1 = HF.hyperboloidToUpperHalfPlane(e1);
                    e2 = HF.hyperboloidToUpperHalfPlane(e2);

                }

                p1 = vertices[endpoints[0]]["uhp"];
                p2 = vertices[endpoints[1]]["uhp"];

                radVect = VF.vectorScale(VF.vectorDiff(e2, e1), 0.5);
                center = VF.midpoint(e1, e2);
                r = VF.norm(radVect);


                if (data.metric === "h") {

                    startAngle = Math.acos(VF.vectorDot(VF.vectorDiff(p1, center), radVect) / (r * r));
                    endAngle = Math.acos(VF.vectorDot(VF.vectorDiff(p2, center), radVect) / (r * r));

                } else {

                    startAngle = 0;
                    endAngle = Math.PI;

                }

                numPieces = Math.ceil(Math.max(Math.min(100 * r, number), 10) * (endAngle - startAngle) / Math.PI);
                subAngle = (endAngle - startAngle) / numPieces;

                for (var i = 0; i <= numPieces; i++) {

                    theta = startAngle + i * subAngle;

                    uhpVertices.push([
                        radVect[0] * Math.cos(theta) + center[0],
                        radVect[1] * Math.cos(theta) + center[1],
                        r * Math.sin(theta)
                    ])

                }

                lineCoords.push(uhpVertices);

            });

        }

        // kinda works??
        if (data.metric === "u") {

            var face, uhpVertices, u, v, w, p1, p2, center, r, theta1, theta2, startAngle, endAngle, numPieces, subAngle, theta;

            for (var j = 0; j < data.numFaces; j++) {

                face = data.faces[j];

                for (var i = 0; i < data.numSides; i++) {

                    uhpVertices = [];

                    u = vertices[face[i]]["klein"];
                    v = vertices[face[(i + 1) % data.numSides]]["klein"];
                    w = vertices[face[(i + 2) % data.numSides]]["klein"];
                    p1 = HF.kleinToUpperHalfPlane(VF.lineSphereIntersection(u, v));
                    p2 = HF.kleinToUpperHalfPlane(VF.lineSphereIntersection(w, v))

                    center = spheres[j]["uhp"].center;
                    r = spheres[j]["uhp"].radius;

                    theta1 = Math.acos(Math.max(-1, Math.min(1, (p1[0] - center[0]) / r))) * ((p1[1] - center[1] > 0) ? 1 : -1);
                    theta2 = Math.acos(Math.max(-1, Math.min(1, (p2[0] - center[0]) / r))) * ((p2[1] - center[1] > 0) ? 1 : -1);

                    startAngle = Math.min(theta1, theta2);
                    endAngle = Math.max(theta1, theta2);

                    if (endAngle - startAngle > Math.PI) {

                        startAngle += 2 * Math.PI;
                        [startAngle, endAngle] = [endAngle, startAngle];

                    }

                    numPieces = Math.ceil(Math.max(Math.abs(Math.min(100 * r, number), 10) * (endAngle - startAngle) / Math.PI));
                    subAngle = (endAngle - startAngle) / numPieces;

                    for (var k = 0; k <= numPieces; k++) {

                        theta = startAngle + k * subAngle;

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

    } else if (data.metric === "s") {

        var ratios = [];
        const ca = VF.vectorDot(vertices[data.edges[0][0]]["hypersphere"], vertices[data.edges[0][1]]["hypersphere"]);
        const sa = Math.sqrt(1 - ca * ca);
        const a = Math.acos(ca);
        const denom = 1 / sa;
        var theta = 0;
        var line, start, end;

        for (var i = 0; i <= number; i++) {

            ratios.push(Math.sin(theta) * denom);
            theta += a / number;

        }

        data.edges.forEach((endpoints) => {
            line = [];
            start = vertices[endpoints[0]]["hypersphere"];
            end = vertices[endpoints[1]]["hypersphere"];

            for (var i = 0; i <= number; i++) {

                line.push(
                    SF.hyperToStereo(
                        VF.vectorSum([
                            VF.vectorScale(start, ratios[i]),
                            VF.vectorScale(end, ratios[number - i])
                        ])
                    )
                );

            }

            lineCoords.push(line);

        })

    }

    return lineCoords;

}

function outline(data, number, camera, spheres, vertices) {

    var lineCoords = [];
    const camPos = camera;

    var cos = [];
    var sin = [];
    var theta;

    for (var k = 0; k <= number; k++) {

        if (data.metric === "h" || data.metric === "p" || data.metric === "u") {

            theta = Math.PI * k / number;

        } else if (data.metric === "s") {

            theta = 2 * Math.PI * k / number;

        }

        cos.push(Math.cos(theta));
        sin.push(Math.sin(theta));

    }

    var center, r, diff, cs, h, t, interp, perp, v, curve, polygon, drawVerts, segments, segmentsPoints, segNum;

    for (var i = 0; i < data.numFaces; i++) {

        if (data.metric === "h" || data.metric === "p" || data.metric === "u") {

            center = spheres[i]["uhp"].center;
            r = spheres[i]["uhp"].radius;

        } else if (data.metric === "s") {

            if (spheres[i].type === "sphere") {

                center = spheres[i].center;
                r = spheres[i].radius;

            } else {

                continue;

            }

        }

        diff = VF.vectorDiff(center, camPos);
        cs = VF.norm(diff);

        h = r * Math.sqrt(cs * cs - r * r) / cs;
        t = Math.sqrt(r * r - h * h) / cs;
        interp = VF.vectorSum([VF.vectorScale(center, 1 - t), VF.vectorScale(camPos, t)]);

        perp = [1, 0, 0];

        if (Math.abs(diff[0]) > eps || Math.abs(diff[1]) > eps) {

            perp = [-diff[1] * h / VF.norm([diff[0], diff[1]]), diff[0] * h / VF.norm([diff[0], diff[1]]), 0];

        }

        v = VF.vectorCross(perp, VF.vectorScale(diff, 1 / cs));

        if (v[2] < 0) {

            v = VF.vectorScale(v, -1);

        }

        curve = [];

        for (var k = 0; k <= number; k++) {

            curve.push(VF.vectorSum([VF.vectorScale(perp, cos[k]), VF.vectorScale(v, sin[k]), interp]));

        }

        drawVerts = [];

        if (data.metric === "h" || data.metric === "p" || data.metric === "u") {

            polygon = [];

            data.faces[i].forEach((j) => {
                polygon.push(vertices[j]["klein"]);
            });

            curve.forEach((vert) => {

                drawVerts.push([vert, (pointInPolygon(HF.upperHalfPlaneToKlein(vert), polygon) && vert[2] >= 0)]);

            });

        } else if (data.metric === "s") {

            curve.forEach((vert) => {

                drawVerts.push([vert, pointInSphericalPolygon(vert, i, spheres)]);

            });

        }

        segments = [[drawVerts[0]]];
        segmentsPoints = [[drawVerts[0][0]]];
        segNum = 0;

        for (var k = 1; k < curve.length; k++) {

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

                lineCoords.push(segmentsPoints[k], 0x000000);

            }

        }

    }

    return lineCoords;

}

function cameraLines(data, uhpVertices, invisibleLines, camera, spheres, vertices) {

    var lineGroup = new THREE.Group();

    var drawVerts, segments, segmentsPoints, segNum;

    uhpVertices.forEach((points) => {

        if (points.length > 0) {

            drawVerts = [];

            for (var k = 0; k < points.length; k++) {

                drawVerts.push([points[k], visibilityTest(points[k], camera, spheres, vertices, data)]);

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

                    lineGroup.add(drawLine(segmentsPoints[k], 0x333333, 2));

                } else {

                    if (invisibleLines) {

                        lineGroup.add(drawLine(segmentsPoints[k], 0xBBBBBB, 1));

                    }

                }

            }

        }

    });

    return lineGroup;

}

// ONLY WORKS FOR UHP
function visibilityTest(point, camera, spheres, vertices, data) {

    const c = camera;
    const p = point;
    const pc = VF.vectorDiff(p, c);

    if (data.metric === "h" || data.metric === "p" || data.metric === "u") {

        var s, sr, cs, A, B, C, delta, t1, t2, polygon, x1, x2, v1, v2;

        for (var ii = 0; ii < spheres.length; ii++) {

            s = spheres[ii]["uhp"].center;
            sr = spheres[ii]["uhp"].radius;
            cs = VF.vectorDiff(c, s);

            A = VF.vectorDot(pc, pc);
            B = 2 * VF.vectorDot(pc, cs);
            C = VF.vectorDot(cs, cs) - sr * sr;

            delta = B * B - 4 * A * C;

            if ((delta <= 0) || isNaN(delta)) {

                continue;

            } else {

                t1 = (-B + Math.sqrt(delta)) / (2 * A);
                t2 = -B / A - t1;

                polygon = [];

                data.faces[ii % data.numFaces].forEach((j) => {
                    polygon.push(vertices[j + (ii - (ii % data.numFaces)) * data.numVertices / data.numFaces]["klein"]);
                });

                if ((t1 > eps) && (t1 < 1 - eps)) {

                    x1 = VF.vectorSum([c, VF.vectorScale(pc, t1)]);
                    v1 = HF.upperHalfPlaneToKlein(x1);

                    if (pointInPolygon(v1, polygon) && (x1[2] >= 0)) {

                        return false;

                    }

                }

                if ((t2 > eps) && (t2 < 1 - eps)) {

                    x2 = VF.vectorSum([c, VF.vectorScale(pc, t2)]);
                    v2 = HF.upperHalfPlaneToKlein(x2);

                    if (pointInPolygon(v2, polygon) && (x2[2] >= 0)) {

                        return false;

                    }

                }

            }

        }

    } else if (data.metric === "s") {

        var s, sr, cs, A, B, C, delta, t1, t2, polygon, intersect;

        for (var ii = 0; ii < spheres.length; ii++) {

            if (spheres[ii].type === "sphere") {

                s = spheres[ii].center;
                sr = spheres[ii].radius;
                cs = VF.vectorDiff(c, s);

                A = VF.vectorDot(pc, pc);
                B = 2 * VF.vectorDot(pc, cs);
                C = VF.vectorDot(cs, cs) - sr * sr;

                delta = B * B - 4 * A * C;

                if ((delta <= 0) || isNaN(delta)) {

                    continue;

                } else {

                    t1 = (-B + Math.sqrt(delta)) / (2 * A);
                    t2 = -B / A - t1;

                    if (eps < t1 && t1 < 1 - eps) {

                        intersect = VF.vectorSum([c, VF.vectorScale(pc, t1)]);

                        var isInFace = pointInSphericalPolygon(intersect, ii, spheres);

                        if (isInFace) {

                            return false;

                        }

                    }

                    if (eps < t2 && t2 < 1 - eps) {

                        intersect = VF.vectorSum([c, VF.vectorScale(pc, t2)]);

                        var isInFace = pointInSphericalPolygon(intersect, ii, spheres);

                        if (isInFace) {

                            return false;

                        }

                    }

                }

            } else if (spheres[ii].type === "plane") {

                const t = -VF.vectorDot(c, spheres[ii].normal) / VF.vectorDot(pc, spheres[ii].normal);

                if (eps < t && t < 1 - eps) {

                    intersect = VF.vectorSum([c, VF.vectorScale(pc, t)]);

                    var isInFace = pointInSphericalPolygon(intersect, ii, spheres);

                    if (isInFace) {

                        return false;

                    }

                }

            }

        }

    }

    return true;

}

function pointInPolygon(point, polygon) {

    var v0, v1, v2, dot00, dot01, dot02, dot11, dot12, invDenom, a, b, c;

    for (var i = 1; i < polygon.length - 1; i++) {

        v0 = VF.vectorDiff(polygon[i], polygon[0]);
        v1 = VF.vectorDiff(polygon[i + 1], polygon[0]);
        v2 = VF.vectorDiff(point, polygon[0]);

        dot00 = VF.vectorDot(v0, v0);
        dot01 = VF.vectorDot(v0, v1);
        dot02 = VF.vectorDot(v0, v2);
        dot11 = VF.vectorDot(v1, v1);
        dot12 = VF.vectorDot(v1, v2);

        invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
        a = (dot11 * dot02 - dot01 * dot12) * invDenom;
        b = (dot00 * dot12 - dot01 * dot02) * invDenom;
        c = 1 - a - b;

        if ((a >= 0) && (b >= 0) && (c >= 0)) {

            return true;

        }

    }

    return false;

}

function pointInSphericalPolygon(point, face, spheres) {

    const hypersphereIntersect = SF.stereoToSphere(point);

    const cellDist = VF.vectorDot(hypersphereIntersect, spheres[face].center4);

    var inFace = true;
    var newDist;

    for (var i = 0; i < spheres.length; i++) {

        if (i != face) {

            newDist = VF.vectorDot(hypersphereIntersect, spheres[i].center4);

            if (newDist > cellDist) {

                inFace = false;
                break;

            }

        }

    };

    return inFace;

}

function drawLine(vectors, col, width) {

    var threeVectors = [];

    vectors.forEach((vect) => {
        threeVectors.push(new THREE.Vector3().fromArray(vect));
    });

    var geometry = new THREE.BufferGeometry().setFromPoints(threeVectors);
    var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: col, linewidth: width }));

    return line;

}

export { generateData };