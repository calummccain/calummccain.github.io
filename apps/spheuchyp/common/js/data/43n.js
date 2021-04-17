// Order n cubic

import { rt2, rt3, p, p2, p_1 } from "./constants.js";
import { boundaries } from "./geometry-decider.js";

const cubeData = (n) => {

    const metric = boundaries(n, 4, 6);
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
            p * v[0] - p_1*v[1],
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
    const f =
        (n == 3) ? (v) => [
            v[0] / 2,
            v[1] / 2,
            v[2] / 2,
            v[3] / 2
        ] : (n == 4) ? (v) => [
            v[0],
            v[1] / 2,
            v[2] / 2,
            v[3] / 2
        ] : (n == 5) ? (v) => [
            p2 * v[0] / rt2,
            Math.sqrt(p / 2) * v[1],
            Math.sqrt(p / 2) * v[2],
            Math.sqrt(p / 2) * v[3]
        ] : (n == 6) ? (v) => [
            rt3 * v[0],
            v[1],
            v[2],
            v[3]
        ] : (v) => [
            Math.sqrt(Math.abs(2 * cot / (3 - cot))) * v[0],
            Math.sqrt(Math.abs((cot - 1) / (3 - cot))) * v[1],
            Math.sqrt(Math.abs((cot - 1) / (3 - cot))) * v[2],
            Math.sqrt(Math.abs((cot - 1) / (3 - cot))) * v[3]
        ];

    return {

        vertices: [
            [1, 1, 1, 1], [1, 1, -1, 1],
            [1, -1, -1, 1], [1, -1, 1, 1],
            [1, 1, 1, -1], [1, 1, -1, -1],
            [1, -1, -1, -1], [1, -1, 1, -1]
        ],

        edges: [
            [0, 3], [3, 2], [2, 1], [1, 0],
            [7, 4], [4, 5], [5, 6], [6, 7],
            [0, 4], [1, 5], [2, 6], [3, 7]
        ],

        faces: [
            [0, 1, 2, 3], [4, 7, 3, 0], [7, 6, 2, 3],
            [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5]
        ],

        numVertices: 8,

        numEdges: 12,

        numFaces: 6,

        numSides: 4,

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

        faceReflections: ["bc", "c", "cbabc", "abc", "", "babc"],

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

export { cubeData };