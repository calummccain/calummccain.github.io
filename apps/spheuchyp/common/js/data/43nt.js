// Order n cubic truncated

import { p, p2, p_1 } from "./constants.js";
import { boundaries } from "./geometry-decider.js";

const cubeTruncData = (n) => {

    const metric = boundaries(n, 4, Infinity);
    const cos = Math.cos(2 * Math.PI / n);
    const cot = 1 / (Math.tan(Math.PI / n) ** 2);

    const d =
        (n == 3) ? (v) => [
            v[1],
            v[0],
            v[2],
            v[3]
        ] : (n == 4) ? (v) => [
            v[0],
            2 * v[0] - 1 * v[1],
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

    // for n = 4: factor of 1/2 is arbitrary but scales shapes nicely
    const f = (v) => [
        Math.sqrt(Math.abs(cot)) * v[0],
        Math.sqrt(Math.abs((cot - 1) / 2)) * v[1],
        Math.sqrt(Math.abs((cot - 1) / 2)) * v[2],
        Math.sqrt(Math.abs((cot - 1) / 2)) * v[3]
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

        faceReflections: ["", "", ""],

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

        cellType: "spherical"

    }

}

export { cubeTruncData };