// ========================================================
// Order n tetrahedral truncated t{3,3,n}
// 
// Inputs: n
// Output: data
//
// Change history:
//     19/05/21 Initial commit
//     24/05/21 Renamed
//     31/05/21 Added v-v distance
//=========================================================

import { boundaries } from "./geometry-decider.js";
import { rt2, rt11 } from "./constants.js";

const tetrahedronTruncData = (n) => {

    const metric = boundaries(n, Math.PI / Math.atan(1 / rt2), Math.PI / Math.atan(1 / rt11));
    const cos = Math.cos(Math.PI / n) ** 2;
    const cot = cos / (1 - cos);

    const d = (v) => [
        (3 * cos - 1) * v[0] + (2 - 3 * cos) * v[1] + (2 - 3 * cos) * v[2] + (3 * cos - 2) * v[3],
        cos * v[0] + (1 - cos) * v[1] - cos * v[2] + cos * v[3],
        cos * v[0] - cos * v[1] + (1 - cos) * v[2] + cos * v[3],
        -cos * v[0] + cos * v[1] + cos * v[2] + (1 - cos) * v[3]
    ];

    const f = (v) => [
        3 * Math.sqrt(Math.abs(cot / (2 * (11 - cot)))) * v[0],
        3 * Math.sqrt(Math.abs((cot - 2) / (2 * (11 - cot)))) * v[1],
        3 * Math.sqrt(Math.abs((cot - 2) / (2 * (11 - cot)))) * v[2],
        3 * Math.sqrt(Math.abs((cot - 2) / (2 * (11 - cot)))) * v[3]
    ];

    return {

        vertices: [
            [1, 1, 1 / 3, 1 / 3], [1, 1 / 3, 1, 1 / 3], [1, 1 / 3, 1 / 3, 1],
            [1, 1, -1 / 3, -1 / 3], [1, 1 / 3, -1, -1 / 3], [1, 1 / 3, -1 / 3, -1],
            [1, -1, 1 / 3, -1 / 3], [1, -1 / 3, 1, -1 / 3], [1, -1 / 3, 1 / 3, -1],
            [1, -1, -1 / 3, 1 / 3], [1, -1 / 3, -1, 1 / 3], [1, -1 / 3, -1 / 3, 1]
        ],

        edges: [
            [0, 1], [0, 2], [0, 3], [1, 2], [1, 7], [2, 11],
            [3, 4], [3, 5], [4, 5], [4, 10], [5, 8], [6, 7],
            [6, 8], [6, 9], [7, 8], [9, 10], [9, 11], [10, 11]
        ],

        faces: [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11],
            [0, 2, 11, 10, 4, 3], [0, 1, 7, 8, 5, 3],
            [1, 2, 11, 9, 6, 7], [4, 5, 8, 6, 9, 10]
        ],

        numVertices: 12,

        numEdges: 18,

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

        cellType: "spherical",

        vv: (cot + 7) / Math.abs(11 - cot)

    }

}

export { tetrahedronTruncData };