import { triangleData } from "../data/36n.js";
import { sphericalGeometry } from "./spherical-geometry.js";
import { euclideanGeometry } from "./euclidean-geometry.js";
import { hyperbolicGeometry } from "./hyperbolic-geometry.js";

function triangularGeometry(transform, order, refinement, model) {

    const d = 1;

    const data = triangleData(order[2]);

    var triangular;

    if (data.metric == "s") {

        refinement += 1;
        triangular = sphericalGeometry(data, transform, refinement, d);

    } else if (data.metric == "e") {

        triangular = euclideanGeometry(data, transform);

    } else if (data.metric == "h" || data.metric == "p" || data.metric == "u") {

        triangular = hyperbolicGeometry(data, transform, refinement, model);

    }

    return [triangular, data.faceReflections, data.numFaces];

}

export { triangularGeometry };