// ========================================================
// Order n octahedral rectified r{3,4,n}
// 
// Inputs: n
// Output: data
//
// Change history:
//     ??/??/?? Initial commit
//     24/05/21 Renamed
//     31/05/21 Added v-v distance
//=========================================================

import { boundaries } from "./geometry-decider.js";
import { rt2 } from "./constants.js";

const octahedronRectData = (n) => {

    const cos = Math.cos(Math.PI / n) ** 2;
    const tan = 1 / cos - 1;
    const cot = 1 / tan;

    const metric = boundaries(n, Math.PI / Math.atan(rt2), Infinity);

    const d =
        (n == 3) ? (v) => [
            (v[0] + v[1] + v[2] + v[3]) / 2,
            (v[0] + v[1] - v[2] - v[3]) / 2,
            (v[0] - v[1] + v[2] - v[3]) / 2,
            (v[0] - v[1] - v[2] + v[3]) / 2
        ] : (n == 4) ? (v) => [
            2 * v[0] - v[1] - v[2] - v[3],
            v[0] - v[2] - v[3],
            v[0] - v[1] - v[3],
            v[0] - v[1] - v[2]
        ] : (v) => [
            (6 * cos - 1) * v[0] + (2 - 6 * cos) * v[1] + (2 - 6 * cos) * v[2] + (2 - 6 * cos) * v[3],
            2 * cos * v[0] + (1 - 2 * cos) * v[1] - 2 * cos * v[2] - 2 * cos * v[3],
            2 * cos * v[0] - 2 * cos * v[1] + (1 - 2 * cos) * v[2] - 2 * cos * v[3],
            2 * cos * v[0] - 2 * cos * v[1] - 2 * cos * v[2] + (1 - 2 * cos) * v[3]
        ];

    const f = (v) => [
        Math.sqrt(Math.abs(2 * cot)) * v[0],
        Math.sqrt(Math.abs(cot - 1 / 2)) * v[1],
        Math.sqrt(Math.abs(cot - 1 / 2)) * v[2],
        Math.sqrt(Math.abs(cot - 1 / 2)) * v[3]
    ];

    return {

        vertices: [
            [1, 1, 1, 0], [1, 1, 0, 1], [1, 0, 1, 1],
            [1, 1, -1, 0], [1, -1, 0, 1], [1, 0, 1, -1],
            [1, -1, 1, 0], [1, 1, 0, -1], [1, 0, -1, 1],
            [1, -1, -1, 0], [1, -1, 0, -1], [1, 0, -1, -1]
        ],

        edges: [
            [0, 1], [1, 2], [2, 0], [0, 5], [5, 7], [7, 0],
            [3, 7], [7, 11], [11, 3], [1, 3], [3, 8], [8, 1],
            [4, 8], [4, 9], [8, 9], [2, 4], [2, 6], [4, 6],
            [5, 6], [5, 10], [6, 10], [9, 10], [9, 11], [10, 11]
        ],

        faces: [
            [0, 1, 2], [0, 5, 7], [3, 7, 11], [1, 3, 8],
            [4, 8, 9], [2, 4, 6], [5, 6, 10], [9, 10, 11],
            [0, 5, 6, 2], [1, 2, 4, 8], [0, 1, 3, 7],
            [3, 8, 9, 11], [5, 7, 11, 10], [4, 6, 10, 9]
        ],

        numVertices: 12,

        numEdges: 24,

        numFaces: 14,

        // CFE
        // (0, 1, -1, 0)
        a: (v) => [v[0], v[2], v[1], v[3]],

        // CFV
        // (0, 0, 1, -1)
        b: (v) => [v[0], v[1], v[3], v[2]],

        // CEV
        // (0, 0, 0, 1)
        c: (v) => [v[0], v[1], v[2], -v[3]],

        // FEV
        // (2 cot^2 - 1, cot^2, cot^2, cot^2)
        d: d,

        // Identity matrix
        e: (v) => v,

        f: f,

        faceReflections: [""],

        outerReflection: "d",

        // (1, 1, 0, 0)
        V: [1, 1, 0, 0],

        //(2, 1, 1, 0)
        E: [2, 1, 1, 0],

        // (3, 1, 1, 1)
        F: [3, 1, 1, 1],

        // (1, 0, 0, 0)
        C: [1, 0, 0, 0],

        // 3 4 5 6 7
        // s p u u u
        metric: metric,

        cellType: "spherical",

        vv: cot + 1 / 2

    }

}

export { octahedronRectData };