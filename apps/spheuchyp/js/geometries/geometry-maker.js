import { sphericalGeometry } from "./spherical-geometry.js";
import { euclideanGeometry } from "./euclidean-geometry.js";
import { hyperbolicGeometry } from "./hyperbolic-geometry.js";

function honeycombGeometry(data, transform, refinement, model) {

    var honeycomb;

    if (data.metric === "s") {

        refinement += 1;
        honeycomb = sphericalGeometry(data, transform, refinement);

    } else if (data.metric === "e") {

        honeycomb = euclideanGeometry(data, transform);

    } else if (data.metric === "h" || data.metric === "p" || data.metric === "u") {

        if ((data.cellType === "euclidean" || data.cellType === "hyperbolic") && model === "uhp") {

            const newVertices = [];
            data.vertices.forEach((v) => { newVertices.push(data.flip(v)) });
            data.vertices = newVertices;

        }

        honeycomb = hyperbolicGeometry(data, transform, refinement, model);

    }


    return honeycomb;

}

export { honeycombGeometry };