import { octahedronData } from "../data/34n.js";
import { sphericalGeometry } from "./spherical-geometry.js";
import { euclideanGeometry } from "./euclidean-geometry.js";
import { hyperbolicGeometry } from "./hyperbolic-geometry.js";

function octahedronGeometry(transform, order, refinement, model) {

    const d = 1;

    const data = octahedronData(order[2]);

    var octahedron;

    if (data.metric == "s") {

        refinement += 1;
        octahedron = sphericalGeometry(data, transform, refinement, d);

    } else if (data.metri == "e") {

        octahedron = euclideanGeometry(data, transform);

    } else if (data.metric == "h" || data.metric == "p" || data.metric == "u") {

        octahedron = hyperbolicGeometry(data, transform, refinement, model);

    }


    return [octahedron, data.faceReflections, data.numFaces];

}

export { octahedronGeometry };