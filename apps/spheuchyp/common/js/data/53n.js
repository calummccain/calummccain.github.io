// Order n dodecahedral

import { p } from "./constants.js";
import { boundaries } from "./geometry-decider.js";

const dodecahedronData = (n) => {

    const metric = boundaries(n, Math.PI / Math.atan(p), 6);
    const cos = Math.cos(Math.PI / n) ** 2;
    const rt = Math.sqrt(5);
    const cot = cos / (1 - cos);

    const d =
        (n == 3) ? (v) => [
            (p * v[0] + v[1] / (p ** 3) + v[3] / (p ** 4)) / 2,
            ((p ** 3) * v[0] - v[1] / p - p * v[3]) / 2,
            v[2],
            ((p ** 2) * v[0] - p * v[1] + v[3]) / 2
        ] : (n == 4) ? (v) => [
            p ** 2 * v[0] - v[1] - v[3] / p,
            p ** 3 * v[0] - p * v[1] - p * v[3],
            v[2],
            p ** 2 * v[0] - p * v[1]
        ] : (n == 5) ? (v) => [
            ((4 * p + 1) * v[0] - (4 * p - 1) / p * v[1] - (4 * p - 1) / (p ** 2) * v[3]) / 2,
            (p ** 5 * v[0] + (2 - p ** 4) * v[1] - p ** 3 * v[3]) / 2,
            v[2],
            (p ** 4 * v[0] - p ** 3 * v[1] - v[3] / p) / 2
        ] : (n == 6) ? (v) => [
            ((2 + p ** 4) * v[0] - p ** 3 * v[1] - p ** 2 * v[3]) / 2,
            (3 * p ** 3 * v[0] + (2 - 3 * p ** 2) * v[1] - 3 * p * v[3]) / 2,
            v[2],
            (3 * p ** 2 * v[0] - 3 * p * v[1] - v[3]) / 2
        ] : (v) => [
            (2 * p * rt * cos - 1) * v[0] - (2 * rt * cos - 2 / p) * v[1] - (2 * rt * cos / p - 2 / (p ** 2)) * v[3],
            2 * (p ** 3) * cos * v[0] + (1 - 2 * (p ** 2) * cos) * v[1] - 2 * p * cos * v[3],
            v[2],
            2 * (p ** 2) * cos * v[0] - 2 * p * cos * v[1] + (1 - 2 * cos) * v[3]
        ];

    const f =
        (n == 3) ? (v) => [
            (p ** 2) * v[0] / Math.sqrt(8),
            v[1] / (p * Math.sqrt(8)),
            v[2] / (p * Math.sqrt(8)),
            v[3] / (p * Math.sqrt(8))
        ] : (n == 4) ? (v) => [
            p ** 2 / Math.sqrt(2) * v[0],
            Math.sqrt(p / 2) * v[1],
            Math.sqrt(p / 2) * v[2],
            Math.sqrt(p / 2) * v[3]
        ] : (n == 5) ? (v) => [
            (p ** 4) / 2 * v[0],
            p * Math.sqrt(4 * p - 1) / 2 * v[1],
            p * Math.sqrt(4 * p - 1) / 2 * v[2],
            p * Math.sqrt(4 * p - 1) / 2 * v[3]
        ] : (n == 6) ? (v) => [
            Math.sqrt(3) * v[0],
            v[1],
            v[2],
            v[3]
        ] : (v) => [
            (p ** 2) * Math.sqrt(Math.abs(cot / (cot - 3))) * v[0],
            Math.sqrt(Math.abs(((p ** 2) * cot - 1) / (cot - 3))) * v[1],
            Math.sqrt(Math.abs(((p ** 2) * cot - 1) / (cot - 3))) * v[2],
            Math.sqrt(Math.abs(((p ** 2) * cot - 1) / (cot - 3))) * v[3]
        ];

    return {

        vertices: [
            [1, 1, 1, 1], [1, 1, 1, -1], [1, 1, -1, 1], [1, 1, -1, -1],
            [1, -1, 1, 1], [1, -1, 1, -1], [1, -1, -1, 1], [1, -1, -1, -1],
            [1, 0, p, 1 / p], [1, 0, p, -1 / p], [1, 0, -p, 1 / p], [1, 0, -p, -1 / p],
            [1, p, 1 / p, 0], [1, p, -1 / p, 0], [1, -p, 1 / p, 0], [1, -p, -1 / p, 0],
            [1, 1 / p, 0, p], [1, -1 / p, 0, p], [1, 1 / p, 0, -p], [1, -1 / p, 0, -p]
        ],

        edges: [
            [0, 8], [0, 12], [0, 16], [1, 9],
            [1, 12], [1, 18], [2, 10], [2, 13],
            [2, 16], [3, 11], [3, 13], [3, 18],
            [4, 8], [4, 14], [4, 17], [5, 9],
            [5, 14], [5, 19], [6, 10], [6, 15],
            [6, 17], [7, 11], [7, 15], [7, 19],
            [8, 9], [10, 11], [12, 13], [14, 15],
            [16, 17], [18, 19]
        ],

        faces: [
            [0, 16, 2, 13, 12], [1, 12, 13, 3, 18],
            [0, 12, 1, 9, 8], [0, 8, 4, 17, 16],
            [2, 16, 17, 6, 10], [1, 18, 19, 5, 9],
            [4, 8, 9, 5, 14], [5, 19, 7, 15, 14],
            [6, 17, 4, 14, 15], [3, 13, 2, 10, 11],
            [3, 11, 7, 19, 18], [11, 10, 6, 15, 7]
        ],

        numVertices: 20,

        numEdges: 30,

        numFaces: 12,

        numSides: 5,

        // CFE
        // (0, 0, 1, 0)
        a: (v) => [v[0], v[1], -v[2], v[3]],
        // CFV
        // (0, 1, -p ** 2, p)
        b: (v) => [v[0], (p * v[1] + v[2] + v[3] / p) / 2, (v[1] - v[2] / p - p * v[3]) / 2, (v[1] / p - p * v[2] + v[3]) / 2],

        // CEV
        // (0, 0, 0, 1)
        c: (v) => [v[0], v[1], v[2], -v[3]],

        // FEV
        // ?????
        d: d,

        e: (v) => v,

        f: f,

        faceReflections: [
            "", "c", "bc", "acacbabc", "cacbabc",
            "cbabc", "bacbabc", "cbabacbabc", "babacbabc",
            "abc", "acbabc", "abacbabc"
        ],

        outerReflection: "d",

        // (1, p, 1 / p, 0)
        V: [1, p, 1 / p, 0],

        // (1, p, 0, 0)
        E: [1, p, 0, 0],

        // (3 - p, p, 0, 1)
        F: [3 - p, p, 0, 1],

        // (1, 0, 0, 0)
        C: [1, 0, 0, 0],

        // 3 4 5 6 7
        // s h h p u
        metric: metric,

        cellType: "spherical"

    }

}

export { dodecahedronData };