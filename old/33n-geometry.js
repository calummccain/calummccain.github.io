import { tetrahedronData } from "../js/data/33n.js";
import { sphericalGeometry } from "../js/geometries/spherical-geometry.js";
import { euclideanGeometry } from "../js/geometries/euclidean-geometry.js";
import { hyperbolicGeometry } from "../js/geometries/hyperbolic-geometry.js";

function tetrahedronGeometry(transform, order, refinement, model) {

    const d = 1;

    const data = tetrahedronData(order[2]);

    var tetrahedron;

    if (data.metric == "s") {

        refinement += 1;
        tetrahedron = sphericalGeometry(data, transform, refinement, d);

    } else if (data.metric == "e") {

        tetrahedron = euclideanGeometry(data, transform);

    } else if (data.metric == "h" || data.metric == "p" || data.metric == "u") {

        tetrahedron = hyperbolicGeometry(data, transform, refinement, model);

    }


    return [tetrahedron, data.faceReflections, data.numFaces];

}

export { tetrahedronGeometry };