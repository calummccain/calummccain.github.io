import { cubeData } from "../data/43n.js";
import { sphericalGeometry } from "./spherical-geometry.js";
import { euclideanGeometry } from "./euclidean-geometry.js";
import { hyperbolicGeometry } from "./hyperbolic-geometry.js";

function cubeGeometry(transform, order, refinement, model) {

    const data = cubeData(order[2]);

    const d = 1;

    var cube;

    if (data.metric == "s") {

        refinement += 1;
        cube = sphericalGeometry(data, transform, refinement, d);

    } else if (data.metric == "e") {

        cube = euclideanGeometry(data, transform);

    } else if (data.metric == "h" || data.metric == "p" || data.metric == "u") {

        cube = hyperbolicGeometry(data, transform, refinement, model);

    }

    return [cube, data.faceReflections, data.numFaces];

}

export { cubeGeometry };