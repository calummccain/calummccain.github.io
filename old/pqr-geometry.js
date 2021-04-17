import { pqrData } from "../js/data/pqr.js";
import { hyperbolicGeometry } from "../js/geometries/hyperbolic-geometry.js";

function pqrGeometry(transform, order, refinement, model) {

    var data = pqrData(order[0], order[1], order[2]);

    const newVertices = [];
    data.vertices.forEach((v) => { newVertices.push(data.flip(v)) });
    data.vertices = newVertices;

    var pqr = hyperbolicGeometry(data, transform, refinement, model);

    return [pqr, data.faceReflections, data.numFaces];

}

export { pqrGeometry };