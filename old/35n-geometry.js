import { icosahedronData } from "../data/35n.js";
import { sphericalGeometry } from "./spherical-geometry.js";
import { euclideanGeometry } from "./euclidean-geometry.js";
import { hyperbolicGeometry } from "./hyperbolic-geometry.js";

function icosahedronGeometry(transform, order, refinement, model) {

    const d = 1

    const data = icosahedronData(order[2]);

    var icosahedron;

    if (data.metric == "s") {

        refinement += 1;
        icosahedron = sphericalGeometry(data, transform, refinement, d);

    } else if (data.metric == "e") {

        icosahedron = euclideanGeometry(data, transform);

    } else if (data.metric == "h" || data.metric == "p" || data.metric == "u") {

        icosahedron = hyperbolicGeometry(data, transform, refinement, model);

    }


    return [icosahedron, data.faceReflections, data.numFaces];

}

export { icosahedronGeometry };