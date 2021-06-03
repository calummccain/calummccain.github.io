// ========================================================
// Order n cubic truncated t{4,3,n}
// 
// Inputs: n
// Output: data
//
// Change history:
//     ??/??/?? Initial commit
//     24/05/21 Renamed
//     31/05/21 Added v-v distance
//     03/06/21 Removed 1 *
//              Fixed edges - typo
//=========================================================

import { p, p2, p_1, rt2 } from "./constants.js";
import { boundaries } from "./geometry-decider.js";

const cubeTruncData = (n) => {

    const metric = boundaries(n, 4, Math.PI / Math.atan(Math.sqrt(1 / (7 + 4 * rt2))));
    const cos = Math.cos(2 * Math.PI / n);
    const cot = 1 / (Math.tan(Math.PI / n) ** 2);
    const factor = rt2 - 1;

    const d =
        (n == 3) ? (v) => [
            v[1],
            v[0],
            v[2],
            v[3]
        ] : (n == 4) ? (v) => [
            v[0],
            2 * v[0] - v[1],
            v[2],
            v[3]
        ] : (n == 5) ? (v) => [
            p * v[0] - p_1 * v[1],
            p2 * v[0] - p * v[1],
            v[2],
            v[3]
        ] : (n == 6) ? (v) => [
            2 * v[0] - v[1],
            3 * v[0] - 2 * v[1],
            v[2],
            v[3]
        ] : (v) => [
            (1 + 2 * cos) * v[0] - 2 * cos * v[1],
            2 * (1 + cos) * v[0] - (1 + 2 * cos) * v[1],
            v[2],
            v[3]
        ];

    const f =
        (n == 4) ? (v) => [
            v[0],
            v[1] / 2,
            v[2] / 2,
            v[3] / 2
        ] : (v) => [
            Math.sqrt(Math.abs(2 * cot / (5 - 2 * rt2 - (3 - 2 * rt2) * cot))) * v[0],
            Math.sqrt(Math.abs((cot - 1) / (5 - 2 * rt2 - (3 - 2 * rt2) * cot))) * v[1],
            Math.sqrt(Math.abs((cot - 1) / (5 - 2 * rt2 - (3 - 2 * rt2) * cot))) * v[2],
            Math.sqrt(Math.abs((cot - 1) / (5 - 2 * rt2 - (3 - 2 * rt2) * cot))) * v[3]
        ];

    return {

        vertices: [
            [1, 1, 1, factor], [1, 1, factor, 1], [1, factor, 1, 1],
            [1, 1, 1, -factor], [1, 1, factor, -1], [1, factor, 1, -1],
            [1, 1, -1, factor], [1, 1, -factor, 1], [1, factor, -1, 1],
            [1, 1, -1, -factor], [1, 1, -factor, -1], [1, factor, -1, -1],
            [1, -1, 1, factor], [1, -1, factor, 1], [1, -factor, 1, 1],
            [1, -1, 1, -factor], [1, -1, factor, -1], [1, -factor, 1, -1],
            [1, -1, -1, factor], [1, -1, -factor, 1], [1, -factor, -1, 1],
            [1, -1, -1, -factor], [1, -1, -factor, -1], [1, -factor, -1, -1]
        ],

        edges: [
            [0, 1], [0, 2], [0, 3], [1, 2], [1, 7], [2, 14], [3, 4], [3, 5],
            [4, 5], [4, 10], [5, 17], [6, 7], [6, 8], [6, 9], [7, 8], [8, 20],
            [9, 10], [9, 11], [10, 11], [11, 23], [12, 13], [12, 14], [12, 15], [13, 14],
            [13, 19], [15, 16], [15, 17], [16, 17], [16, 22], [18, 19], [18, 20], [18, 21],
            [19, 20], [21, 22], [21, 23], [22, 23]
        ],

        faces: [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11],
            [12, 13, 14], [15, 16, 17], [18, 19, 20], [21, 22, 23],
            [0, 1, 7, 6, 9, 10, 4, 3], [0, 2, 14, 12, 15, 17, 5, 3],
            [1, 2, 14, 13, 19, 20, 8, 7], [6, 8, 20, 18, 21, 23, 11, 9],
            [4, 5, 17, 16, 22, 23, 11, 10], [12, 13, 19, 18, 21, 22, 16, 15]
        ],

        numVertices: 24,

        numEdges: 36,

        numFaces: 14,

        // CFE
        // (0, 0, 0, 1)
        a: (v) => [v[0], v[1], v[2], -v[3]],

        // CFV
        // (0, 0, 1, -1)
        b: (v) => [v[0], v[1], v[3], v[2]],

        // CEV
        // (0, 1, -1, 0)
        c: (v) => [v[0], v[2], v[1], v[3]],

        // FEV
        // (cot ** 2 - 1, 2 cot ** 2, 0, 0)
        d: d,

        // Identity matrix
        e: (v) => v,

        f: f,

        faceReflections: [""],

        outerReflection: "d",

        // (1, 1, 1, 1)
        V: [1, 1, 1, 1],

        // (1, 1, 1, 0)
        E: [1, 1, 1, 0],

        // (1, 1, 0, 0)
        F: [1, 1, 0, 0],

        // (1, 0, 0, 0)
        C: [1, 0, 0, 0],

        // 3 4 5 6 7
        // s e h d u
        metric: metric,

        cellType: "spherical",

        vv: ((3 - 2 * rt2) * cot + 2 * rt2 - 1) / Math.abs(-(3 - 2 * rt2) * cot + 5 - 2 * rt2)

    }

}

export { cubeTruncData };