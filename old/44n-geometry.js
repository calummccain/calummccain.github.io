import { squareData } from "../data/44n.js";
import { sphericalGeometry } from "./spherical-geometry.js";
import { euclideanGeometry } from "./euclidean-geometry.js";
import { hyperbolicGeometry } from "./hyperbolic-geometry.js";

function squareGeometry(transform, order, refinement, model) {

    const d = 1;

    const data = squareData(order[2]);

    var square;

    if (data.metric == "s") {

        refinement += 1;
        square = sphericalGeometry(data, transform, refinement, d);

    } else if (data.metric == "e") {

        square = euclideanGeometry(data, transform);

    } else if (data.metric == "h" || data.metric == "p" || data.metric == "u") {

        square = hyperbolicGeometry(data, transform, refinement, model);

    }

    return [square, data.faceReflections, data.numFaces];

}

export { squareGeometry };