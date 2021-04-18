// Order n hexagonal

import { boundaries } from "./geometry-decider.js";
import * as VF from "../maths-functions/vector-functions.js";
import * as HF from "../maths-functions/hyperbolic-functions.js";
import * as GT from "../maths-functions/generate-tesselations.js";

const hexagonData = (n) => {

    const metric = boundaries(n, 2, 6);
    const c = Math.cos(Math.PI / n) ** 2;
    const den = Math.sqrt(Math.abs(1 - 4 * c / 3));

    // const V = [1, 0, 1, 0];
    // const E = [2, 0, 1, 1];
    // const F = [1, 0, 0, 0];
    // const C = [1, 1, 0, 0];

    // CFE
    // (0, 0, 1, -1)
    const amat = (v) => [v[0], v[1], (v[2] + 3 * v[3]) / 2, (v[2] - v[3]) / 2];

    // CFV
    // (0, 0, 0, 1)
    const bmat = (v) => [v[0], v[1], v[2], -v[3]];

    // CEV
    // (2 cos^2, 2 * cos^2, 3, 1)
    const cmat = (v) => [
        (1 + 2 * c) * v[0] - 2 * (c ** 2) * v[1] - c * v[2] - c * v[3],
        2 * v[0] + (1 - 2 * c) * v[1] - v[2] - v[3],
        3 * v[0] - 3 * c * v[1] - v[2] / 2 - 3 * v[3] / 2,
        v[0] - c * v[1] - v[2] / 2 + v[3] / 2
    ];

    // FEV
    // (0, 1, 0, 0)
    const dmat = (v) => [v[0], -v[1], v[2], v[3]];

    const emat = (v) => v;

    const fmat =
        (n == 6) ? (v) => [
            v[0],
            3 * v[1] / 4,
            v[2] / 2,
            Math.sqrt(3) * v[3] / 2
        ] : (v) => [
            v[0] / den,
            c * v[1] / den,
            Math.sqrt(c / 3) * v[2] / den,
            Math.sqrt(c) * v[3] / den
        ];

    const initialVerts = [
        [1, 0, 2, 0],
        [1, 0, -2, 0],
        [1, 0, 1, 1],
        [1, 0, 1, -1],
        [1, 0, -1, 1],
        [1, 0, -1, -1]
    ];

    const initialEdges = [
        VF.vectorScale([2, 0, 3, 1], 1 / Math.sqrt(Math.abs(HF.hyperbolicNorm(fmat([2, 0, 3, 1]))))),
        VF.vectorScale([2, 0, 0, 2], 1 / Math.sqrt(Math.abs(HF.hyperbolicNorm(fmat([2, 0, 0, 2]))))),
        VF.vectorScale([2, 0, -3, 1], 1 / Math.sqrt(Math.abs(HF.hyperbolicNorm(fmat([2, 0, -3, 1]))))),
        VF.vectorScale([2, 0, -3, -1], 1 / Math.sqrt(Math.abs(HF.hyperbolicNorm(fmat([2, 0, -3, -1]))))),
        VF.vectorScale([2, 0, 0, -2], 1 / Math.sqrt(Math.abs(HF.hyperbolicNorm(fmat([2, 0, 0, -2]))))),
        VF.vectorScale([2, 0, 3, -1], 1 / Math.sqrt(Math.abs(HF.hyperbolicNorm(fmat([2, 0, 3, -1])))))
    ];

    const matrixDict = (letter, v) => GT.matrixDict(letter, amat, bmat, cmat, dmat, emat, fmat, v);

    const [f, fNames] = GT.makeFaces([(n == 6) ? 1 : den, 0, 0, 0], 500, 6, matrixDict);
    const v = GT.makeVertices(initialVerts, matrixDict, fNames);
    const e = GT.makeEdges(initialEdges, matrixDict, fNames);
    var faceData = GT.generateFaceData(Math.abs(1 / (1 - 4 * c / 3)), 6, metric, f, v, fmat);
    const edgeData = GT.generateEdgeData(Math.abs((1 - c) / (1 - 4 * c / 3)), metric, e, v, fmat);

    faceData = GT.orderFaces(6, faceData, edgeData);

    return {

        vertices: v,

        edges: edgeData,

        faces: faceData,

        numVertices: v.length,

        numEdges: edgeData.length,

        numFaces: faceData.length,

        numSides: 6,

        a: amat,

        b: bmat,

        c: cmat,

        d: dmat,

        e: emat,

        f: fmat,

        faceReflections: fNames,

        outerReflection: "d",

        // 3 4 5 6 7
        // h h h p u
        metric: metric,

        cellType: "euclidean",

        flip: (v) => [v[0], v[2], v[3], v[1]],

    }

}

export { hexagonData };