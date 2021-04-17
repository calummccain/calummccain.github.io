// Order n octahedral

import { boundaries } from "./geometry-decider.js";
import { rt2 } from "./constants.js";

const octahedronData = (n) => {

    const cos = Math.cos(Math.PI / n) ** 2;
    const tan = 1 / cos - 1;
    const cot = 1 / tan;
    const cot2 = Math.sqrt(Math.abs(1 - 2 * cot));
    const cot3 = Math.sqrt(Math.abs(1 - cot));

    const metric = boundaries(n, Math.PI / Math.atan(rt2), 4);

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

    const f =
        (n == 3) ? (v) => [
            v[0] / rt2,
            v[1] / rt2,
            v[2] / rt2,
            v[3] / rt2
        ] : (n == 4) ? (v) => [
            v[0],
            v[1],
            v[2],
            v[3]
        ] : (v) => [
            v[0] / Math.sqrt(Math.abs(tan - 1)),
            cot2 * v[1] / cot3,
            cot2 * v[2] / cot3,
            cot2 * v[3] / cot3,
        ];

    return {

        vertices: [
            [1, 1, 0, 0],
            [1, -1, 0, 0],
            [1, 0, 1, 0],
            [1, 0, -1, 0],
            [1, 0, 0, 1],
            [1, 0, 0, -1]
        ],

        edges: [
            [0, 2], [0, 3], [0, 4], [0, 5],
            [1, 2], [1, 3], [1, 4], [1, 5],
            [2, 4], [4, 3], [3, 5], [5, 2]
        ],

        faces: [
            [0, 2, 4], [0, 5, 2],
            [0, 4, 3], [0, 3, 5],
            [1, 4, 2], [1, 2, 5],
            [1, 3, 4], [1, 5, 3]
        ],

        numVertices: 6,

        numEdges: 12,

        numFaces: 8,

        numSides: 3,

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

        faceReflections: ["", "c", "bc", "cbc", "abc", "cabc", "bcabc", "cbcabc"],

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

        cellType: "spherical"

    }

}

export { octahedronData };