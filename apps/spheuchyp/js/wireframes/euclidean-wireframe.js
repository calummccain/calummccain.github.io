// ========================================================
// Generates the edge and outline data for a euclidean
// cell
//
// Inputs: data
//         parameters
// Output: a three.js group of lines
//
// Change history:
//     03/06/21 Initial commit
//=========================================================

import * as THREE from "../three-bits/three.module.js";
import * as SF from "../maths-functions/spherical-functions.js";
import * as VF from "../maths-functions/vector-functions.js";
import * as RF from "../maths-functions/rotation-functions.js";
import { matrixDict } from "../maths-functions/generate-tesselations.js";

const eps = 1e-4;

function euclideanEdges(data, parameters) {

    // Parameter checks
    const cells = parameters.cells;
    const [thetax, thetay, thetaz, thetau, thetav, thetaw] = parameters.angles || [0, 0, 0, 0, 0, 0];
    const number = parameters.number || 1;
    const camera = parameters.camera || [10, 0, 0];
    const width = parameters.width || 1;
    const invisibleLines = parameters.invisibleLines;

    const outlineRes = 8;

    const colour1 = 0x000000;
    const colour2 = 0xCCCCCC;

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
    for (var i = 0; i < cells.length; i++) {

        localVertices = generateVertices(cells[i]);
        vertices = vertices.concat(localVertices);

        generateFaces(localVertices);

        edges = edges.concat(generateEdges(localVertices));

    }

    var edgeGroup = visibleEdges()

    // generate the positions of the vertices in several models
    function generateVertices(cell) {

        var newVertices = VF.transformVertices(data.vertices, cell, matrix);
        var verts = [];
        var p;

        for (var i = 0; i < data.numVertices; i++) {

            p = RF.ruvw(RF.rxyz(data.f(newVertices[i]), thetax, thetay, thetaz), thetau, thetav, thetaw, data.metric);

            verts.push({
                v4: p,
                v3: [p[1], p[2], p[3]]
            });

        }

        return verts;

    }

    // generate the faces that bound the geometry
    function generateFaces(localVertices) {

        var polygon3, polygon4, center4, center3, v1, v2, v3;

        for (var i = 0; i < data.numFaces; i++) {

            polygon3 = [];
            polygon4 = [];

            for (var j = 0; j < data.faces[i].length; j++) {

                polygon3.push(localVertices[data.faces[i][j]].v3);
                polygon4.push(localVertices[data.faces[i][j]].v4);

            }

            center4 = VF.vectorSum(polygon4);
            center4 = VF.vectorScale(center4, 1 / VF.norm(center4));
            center3 = [center4[1], center4[2], center4[3]];

            v1 = localVertices[data.faces[i][0]].v3;
            v2 = localVertices[data.faces[i][1]].v3;
            v3 = localVertices[data.faces[i][2]].v3;

            faces.push({
                d: VF.determinant3([v1, v2, v3]),
                normal: VF.vectorCross(VF.vectorDiff(v2, v1), VF.vectorDiff(v3, v1)),
                center3: center3,
                center4: center4,
                polygon3: polygon3,
                polygon4: polygon4
            });

        }

    }

    // find the coordinates of the edges
    function generateEdges(localVertices) {

        var edgeCoords = [];

        var ratios = [];
        var edge, start, end;

        for (var i = 0; i <= number; i++) {

            ratios.push(i / number);

        }

        data.edges.forEach((endpoints) => {

            edge = [];
            start = localVertices[endpoints[0]].v3;
            end = localVertices[endpoints[1]].v3;

            for (var i = 0; i <= number; i++) {

                edge.push(
                    VF.vectorSum([VF.vectorScale(start, ratios[i]), VF.vectorScale(end, ratios[number - i])])
                );

            }

            edgeCoords.push(edge);

        });

        return edgeCoords;

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

                        edgeGroup.add(drawLine(segmentsPoints[k], colour1, 2));

                    } else {

                        if (invisibleLines) {

                            edgeGroup.add(drawLine(segmentsPoints[k], colour2, 2));

                        }

                    }

                }

            }

        });

        return edgeGroup;

    }

    function visibilityTest(point) {

        const pc = VF.vectorDiff(point, camera);

        var t;

        for (var i = 0; i < faces.length; i++) {

            t = (faces[i].d - VF.vectorDot(camera, faces[i].normal)) / VF.vectorDot(pc, faces[i].normal);

            if (eps < t && t < 1 - eps) {

                if (pointInPolygon(VF.vectorSum([camera, VF.vectorScale(pc, t)]), faces[i].polygon3)) {

                    return false;

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

export { euclideanEdges };