// Order r square

import { boundaries } from "./geometry-decider.js";
import * as VF from "../maths-functions/vector-functions.js";
import * as HF from "../maths-functions/hyperbolic-functions.js";
import * as GT from "../maths-functions/generate-tesselations.js";

const squareData = (r, n) => {

    const metric = boundaries(r, 2, 4);
    const cos = Math.cos(Math.PI / r) ** 2;
    const den = Math.sqrt(Math.abs(1 - 2 * cos));

    const V = [1, 0, 1, 0];
    const E = [2, 0, 1, 1];
    const F = [1, 0, 0, 0];
    const C = [1, 1, 0, 0];

    // CFE
    // ()
    const amat = (v) => [v[0], v[1], v[3], v[2]];

    // CFV
    // ()
    const bmat = (v) => [v[0], v[1], v[2], -v[3]]

    // CEV
    // ()
    const cmat =
        (r == 4) ? (v) => [
            2 * v[0] - v[1] / 2 - v[2] - v[3],
            2 * v[0] - 2 * v[2] - 2 * v[3],
            v[0] - v[1] / 2 - v[3],
            v[0] - v[1] / 2 - v[2]
        ] : (v) => [
            (1 + 2 * cos) * v[0] - 2 * (cos * cos) * v[1] - 2 * cos * v[2] - 2 * cos * v[3],
            2 * v[0] + (1 - 2 * cos) * v[1] - 2 * v[2] - 2 * v[3],
            v[0] - cos * v[1] - v[3],
            v[0] - cos * v[1] - v[2]
        ];

    // FEV
    // ()
    const dmat = (v) => [v[0], -v[1], v[2], v[3]];

    const emat = (v) => v;

    const fmat =
        (r == 4) ? (v) => [
            v[0],
            v[1] / 2,
            v[2],
            v[3]
        ] : (v) => [
            v[0] / den,
            cos * v[1] / den,
            Math.sqrt(2 * cos) * v[2] / den,
            Math.sqrt(2 * cos) * v[3] / den
        ];

    const initialVerts = [
        [1, 0, 1, 0],
        [1, 0, -1, 0],
        [1, 0, 0, 1],
        [1, 0, 0, -1]
    ];

    const initialEdges = [
        VF.vectorScale([2, 0, 1, 1], 1 / Math.sqrt(Math.abs(HF.hyperbolicNorm(fmat([2, 0, 1, 1]))))),
        VF.vectorScale([2, 0, 1, -1], 1 / Math.sqrt(Math.abs(HF.hyperbolicNorm(fmat([2, 0, 1, -1]))))),
        VF.vectorScale([2, 0, -1, 1], 1 / Math.sqrt(Math.abs(HF.hyperbolicNorm(fmat([2, 0, -1, 1]))))),
        VF.vectorScale([2, 0, -1, -1], 1 / Math.sqrt(Math.abs(HF.hyperbolicNorm(fmat([2, 0, -1, -1])))))
    ];

    const matrixDict = (letter, v) => GT.matrixDict(letter, amat, bmat, cmat, dmat, emat, fmat, v);

    const [f, fNames] = GT.makeFaces([(r == 4) ? 1 : den, 0, 0, 0], n, 4, matrixDict);
    const v = GT.makeVertices(initialVerts, matrixDict, fNames);
    const e = GT.makeEdges(initialEdges, matrixDict, fNames);
    var faceData = GT.generateFaceData(Math.abs(1 / (1 - 2 * cos)), 4, metric, f, v, fmat);
    const edgeData = GT.generateEdgeData(Math.abs((1 - cos) / (1 - 2 * cos)), metric, e, v, fmat);

    faceData = GT.orderFaces(4, faceData, edgeData);

    return {

        vertices: v,

        edges: edgeData,

        faces: faceData,

        numVertices: v.length,

        numEdges: edgeData.length,

        numFaces: faceData.length,

        a: amat,

        b: bmat,

        c: cmat,

        d: dmat,

        e: emat,

        f: fmat,

        faceReflections: fNames,

        outerReflection: "d",

        // 3 4 5 6 7
        // h p u u u
        metric: metric,

        cellType: "euclidean",

        flip: (v) => [v[0], v[2], v[3], v[1]]

    }

}


export { squareData };