// {p,q,r} data

import * as VF from "../maths-functions/vector-functions.js";
import * as HF from "../maths-functions/hyperbolic-functions.js";
import * as GT from "../maths-functions/generate-tesselations.js";

const pqrData = (p, q, r, n) => {

    const cr = (i) => Math.cos(Math.PI * i / r);
    const sr = (i) => Math.sin(Math.PI * i / r);

    const cq = (i) => Math.cos(Math.PI * i / q);
    const sq = (i) => Math.sin(Math.PI * i / q);

    const cp = (i) => Math.cos(Math.PI * i / p);
    const sp = (i) => Math.sin(Math.PI * i / p);

    const qr = (q - 2) * (r - 2);

    const den = sp(1) * Math.sqrt(Math.abs(sr(1) ** 2 - cq(1) ** 2));

    const metric = (qr < 4) ? "h" : (qr == 4) ? "p" : "u";

    const cellType = "hyperbolic";

    const V = [1, 0, cp(1), sp(1)];
    const E = [1, 0, cp(1), 0];
    const F = [(qr === 4 ? 1 : sp(1) * Math.sqrt(Math.abs(sr(1) ** 2 - cq(1) ** 2)) / (cp(1) * cq(1))), 0, 0, 0];
    const C = [cp(1) * cq(1) / (sp(1) * cr(1)), 1, 0, 0];

    // CFE
    // (0, 0, 0, 1)
    const amat = (v) => [v[0], v[1], v[2], -v[3]];

    // CFV
    // (0, 0, sp -cq)
    const bmat = (v) => {

        const c = cp(2);
        const s = sp(2);

        return [v[0], v[1], c * v[2] + s * v[3], s * v[2] - c * v[3]];

    }

    // CEV
    // (sp ** 2 sr ** 2 - cq ** 2, -cp cq cr sp, -cp cq ** 2, 0)
    const cmat = (v) => {

        const cqc = cq(1);
        const src = sr(1);
        const spc = sp(1);
        const cpc = cp(1);
        const crc = cr(1);

        const r = src ** 2 * spc ** 2 - cqc ** 2;

        return [
            (1 - 2 * r / (spc ** 2)) * v[0] + (2 * r * crc / (spc * cpc * cqc)) * v[1] + (2 * r / (cpc * (spc ** 2))) * v[2],
            (2 * cpc * cqc * crc / spc) * v[0] + (1 - 2 * (crc ** 2)) * v[1] - (2 * crc * cqc / spc) * v[2],
            (2 * cpc * (cqc) ** 2 / (spc ** 2)) * v[0] - (2 * crc * cqc / spc) * v[1] + (1 - 2 * (cqc ** 2) / (spc ** 2)) * v[2],
            v[3]
        ];

    }

    // FEV
    // (0, 1, 0, 0)
    const dmat = (v) => [v[0], -v[1], v[2], v[3]];

    const emat = (v) => v;

    const fmat = (qr == 4) ? (v) => v : (v) => [
        cp(1) * cq(1) * v[0] / den,
        Math.sqrt(Math.abs(sp(1) ** 2 * sr(1) ** 2 - cq(1) ** 2)) * v[1] / den,
        Math.sqrt(Math.abs(sp(1) ** 2 * sr(1) ** 2 - cq(1) ** 2)) * v[2] / den,
        Math.sqrt(Math.abs(sp(1) ** 2 * sr(1) ** 2 - cq(1) ** 2)) * v[3] / den
    ];

    var initialVerts = [];

    for (var i = 0; i < p; i++) {

        initialVerts.push([1, 0, cp(2 * i + 1), sp(2 * i + 1)]);

    }

    var initialEdges = [];

    for (var i = 0; i < p; i++) {

        var initialEdge = [1, 0, cp(1) * cp(2 * i), cp(1) * sp(2 * i)];

        initialEdges.push(VF.vectorScale(initialEdge, 1 / Math.sqrt(Math.abs(HF.hyperbolicNorm(fmat(initialEdge))))));

    }

    const matrixDict = (letter, v) => GT.matrixDict(letter, amat, bmat, cmat, dmat, emat, fmat, v);

    const [f, fNames] = GT.makeFaces(F, n, p, matrixDict);
    const v = GT.makeVertices(initialVerts, matrixDict, fNames);
    const e = GT.makeEdges(initialEdges, matrixDict, fNames);
    var faceData = GT.generateFaceData(Math.abs(cp(1) ** 2 * cq(1) ** 2 / (sp(1) ** 2 * (sr(1) ** 2 - cq(1) ** 2))), p, metric, f, v, fmat);
    const edgeData = GT.generateEdgeData(Math.abs(sr(1) ** 2 * cp(1) ** 2 / (sr(1) ** 2 - cq(1) ** 2)), metric, e, v, fmat);

    faceData = GT.orderFaces(p, faceData, edgeData);

    return {

        vertices: v,

        edges: edgeData,

        faces: faceData,

        numVertices: v.length,

        numEdges: edgeData.length,

        numFaces: fNames.length,

        a: amat,

        b: bmat,

        c: cmat,

        d: dmat,

        e: emat,

        f: fmat,

        faceReflections: fNames,

        outerReflection: "d",

        //(1, 0, cp, sp)
        V: V,

        //(1, 0, cp, 0)
        E: E,

        //(sp sqrt(sr ** 2 - cq ** 2) / (cp cq), 0, 0, 0)
        F: F,

        //(cp * cq / (sp * cr), 1, 0, 0)
        C: C,

        metric: metric,

        cellType: cellType,

        flip: (v) => [v[0], v[2], v[3], v[1]],

    }

}

export { pqrData };