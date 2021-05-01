// Order n tetrahedral truncated

import { boundaries } from "./geometry-decider.js";
import { rt2, rt3, rt5, p2, p_1 } from "./constants.js";

const tetrahedronTruncData = (n) => {

    const metric = boundaries(n, Math.PI / Math.atan(1 / rt2), Infinity);
    const cos = Math.cos(Math.PI / n) ** 2;
    const cot = cos / (1 - cos);
    const cos5 = p2 / 4;
    const sin5 = (5 - rt5) / 8;

    const d =
        (n == 3) ? (v) => [
            (-v[0] + 5 * v[1] + 5 * v[2] - 5 * v[3]) / 4,
            (v[0] + 3 * v[1] - v[2] + v[3]) / 4,
            (v[0] - v[1] + 3 * v[2] + v[3]) / 4,
            (-v[0] + v[1] + v[2] + 3 * v[3]) / 4
        ] : (n == 4) ? (v) => [
            (v[0] + v[1] + v[2] - v[3]) / 2,
            (v[0] + v[1] - v[2] + v[3]) / 2,
            (v[0] - v[1] + v[2] + v[3]) / 2,
            (-v[0] + v[1] + v[2] + v[3]) / 2
        ] : (n == 5) ? (v) => [
            (2 - 3 * sin5) * v[0] + (3 * sin5 - 1) * v[1] + (3 * sin5 - 1) * v[2] + (1 - 3 * sin5) * v[3],
            cos5 * v[0] + sin5 * v[1] - cos5 * v[2] + cos5 * v[3],
            cos5 * v[0] - cos5 * v[1] + sin5 * v[2] + cos5 * v[3],
            -cos5 * v[0] + cos5 * v[1] + cos5 * v[2] + sin5 * v[3]
        ] : (n == 6) ? (v) => [
            (5 * v[0] - v[1] - v[2] + v[3]) / 4,
            (3 * v[0] + v[1] - 3 * v[2] + 3 * v[3]) / 4,
            (3 * v[0] - 3 * v[1] + v[2] + 3 * v[3]) / 4,
            (-3 * v[0] + 3 * v[1] + 3 * v[2] + v[3]) / 4
        ] : (v) => [
            (3 * cos - 1) * v[0] + (2 - 3 * cos) * v[1] + (2 - 3 * cos) * v[2] + (3 * cos - 2) * v[3],
            cos * v[0] + (1 - cos) * v[1] - cos * v[2] + cos * v[3],
            cos * v[0] - cos * v[1] + (1 - cos) * v[2] + cos * v[3],
            -cos * v[0] + cos * v[1] + cos * v[2] + (1 - cos) * v[3]
        ];

    const f = (v) => [
        Math.sqrt(Math.abs(cot / 2)) * v[0],
        Math.sqrt(Math.abs((cot - 2) / 2)) * v[1],
        Math.sqrt(Math.abs((cot - 2) / 2)) * v[2],
        Math.sqrt(Math.abs((cot - 2) / 2)) * v[3]
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

        // CFE
        // (0, 0, 1, 1) 
        a: (v) => [v[0], v[1], -v[3], -v[2]],

        // CVF
        // (0, 1, -1, 0)
        b: (v) => [v[0], v[2], v[1], v[3]],

        // CEV
        // (0, 0, 1, -1)
        c: (v) => [v[0], v[1], v[3], v[2]],

        // FEV
        // (cot^2-2, cot^2, 0, 0)
        d: d,

        // Identity matrix
        e: (v) => v,

        f: f,

        faceReflections: [""],

        outerReflection: "d",

        // (1, 1, 1, 1)
        V: [1, 1, 1, 1],

        // (1, 1, 0, 0)
        E: [1, 1, 0, 0],

        // (3, 1, 1, -1)
        F: [3, 1, 1, -1],

        // (1, 0, 0, 0)
        C: [1, 0, 0, 0],

        metric: metric,

        cellType: "spherical"

    }

}

export { tetrahedronTruncData };