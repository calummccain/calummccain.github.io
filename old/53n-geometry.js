import { dodecahedronData } from "../data/53n.js";
import { sphericalGeometry } from "./spherical-geometry.js";
import { euclideanGeometry } from "./euclidean-geometry.js";
import { hyperbolicGeometry } from "./hyperbolic-geometry.js";

function dodecahedronGeometry(transform, order, refinement, model) {

    const d = 1;

    const data = dodecahedronData(order[2]);

    var dodecahedron;

    if (data.metric == "s") {

        refinement += 1;
        dodecahedron = sphericalGeometry(data, transform, refinement, d);

    } else if (data.metric == "e") {

        dodecahedron = euclideanGeometry(data, transform);

    } else if (data.metric == "h" || data.metric == "p" || data.metric == "u") {

        dodecahedron = hyperbolicGeometry(data, transform, refinement, model);

    }

    return [dodecahedron, data.faceReflections, data.numFaces];

}

export { dodecahedronGeometry };