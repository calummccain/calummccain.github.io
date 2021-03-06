// ========================================================
// Order n octahedral truncated t{3,4,n}
// 
// Inputs: n
// Output: data
//
// Change history:
//     20/05/21 Initial commit
//     24/05/21 Renamed
//     31/05/21 Added v-v distance
//=========================================================

import { boundaries } from "./geometry-decider.js";
import { rt2, rt5 } from "./constants.js";

const octahedronTruncData = (n) => {

    const cos = Math.cos(Math.PI / n) ** 2;
    const tan = 1 / cos - 1;
    const cot = 1 / tan;

    const metric = boundaries(n, Math.PI / Math.atan(rt2), Math.PI / Math.atan(1 / rt5));

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
        Math.sqrt(Math.abs(cot / (5 / 9 - cot / 9))) * v[0],
        Math.sqrt(Math.abs((2 * cot - 1) / (5 / 9 - cot / 9))) * v[1],
        Math.sqrt(Math.abs((2 * cot - 1) / (5 / 9 - cot / 9))) * v[2],
        Math.sqrt(Math.abs((2 * cot - 1) / (5 / 9 - cot / 9))) * v[3]
    ];

    return {

        vertices: [
            [1, 2 / 3, 1 / 3, 0], [1, 2 / 3, 0, 1 / 3], [1, 2 / 3, -1 / 3, 0], [1, 2 / 3, 0, -1 / 3],
            [1, 0, 2 / 3, 1 / 3], [1, 1 / 3, 2 / 3, 0], [1, 0, 2 / 3, -1 / 3], [1, -1 / 3, 2 / 3, 0],
            [1, 1 / 3, 0, 2 / 3], [1, 0, 1 / 3, 2 / 3], [1, -1 / 3, 0, 2 / 3], [1, 0, -1 / 3, 2 / 3],
            [1, -2 / 3, 1 / 3, 0], [1, -2 / 3, 0, 1 / 3], [1, -2 / 3, -1 / 3, 0], [1, -2 / 3, 0, -1 / 3],
            [1, 0, -2 / 3, 1 / 3], [1, 1 / 3, -2 / 3, 0], [1, 0, -2 / 3, -1 / 3], [1, -1 / 3, -2 / 3, 0],
            [1, 1 / 3, 0, -2 / 3], [1, 0, 1 / 3, -2 / 3], [1, -1 / 3, 0, -2 / 3], [1, 0, -1 / 3, -2 / 3]
        ],

        edges: [
            [0, 1], [0, 3], [0, 5], [1, 2], [1, 8], [2, 3], [2, 17], [3, 20],
            [4, 5], [4, 7], [4, 9], [5, 6], [6, 7], [6, 21], [7, 12], [8, 9],
            [8, 11], [9, 10], [10, 11], [10, 13], [11, 16], [12, 13], [12, 15],
            [13, 14], [14, 15], [14, 19], [15, 22], [16, 17], [16, 19], [17, 18],
            [18, 19], [18, 23], [20, 21], [20, 23], [21, 22], [22, 23]
        ],

        faces: [
            [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11],
            [12, 13, 14, 15], [16, 17, 18, 19], [20, 21, 22, 23],
            [0, 1, 8, 9, 4, 5], [0, 3, 20, 21, 6, 5],
            [4, 7, 12, 13, 10, 9], [1, 2, 17, 16, 11, 8],
            [2, 3, 20, 23, 18, 17], [6, 7, 12, 15, 22, 21],
            [10, 11, 16, 19, 14, 13], [14, 15, 22, 23, 18, 19]
        ],

        numVertices: 24,

        numEdges: 36,

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

        vv: (cot + 4) / Math.abs(5 - cot)

    }

}

export { octahedronTruncData };