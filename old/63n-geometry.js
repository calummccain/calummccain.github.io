import { hexagonData } from "../data/63n.js";
import { sphericalGeometry } from "./spherical-geometry.js";
import { euclideanGeometry } from "./euclidean-geometry.js";
import { hyperbolicGeometry } from "./hyperbolic-geometry.js";

function hexagonalGeometry(transform, order, refinement, model) {

    const d = 1;

    const data = hexagonData(order[2]);

    var hexagonal;

    if (data.metric == "s") {

        refinement += 1;
        hexagonal = sphericalGeometry(data, transform, refinement, d);

    } else if (data.metric == "e") {

        hexagonal = euclideanGeometry(data, transform);

    } else if (data.metric == "h" || data.metric == "p" || data.metric == "u") {

        hexagonal = hyperbolicGeometry(data, transform, refinement, model);

    }


    return [hexagonal, data.faceReflections, data.numFaces];

}

export { hexagonalGeometry };