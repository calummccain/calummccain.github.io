// ========================================================
// Triangulates a Euclidean face
// 
// Inputs: vertices = vertex positions of face
// Output: [mini triangle data, coordinates of mini triangles]
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

import * as VF from "../maths-functions/vector-functions.js";

function euclideanFace(vertices) {

    var sideNumber = vertices.length;

    var coords = vertices;
    var faces = [];

    if (sideNumber == 3) {

        faces = [[0, 1, 2]];

    } else if (sideNumber == 4) {

        faces = faces.concat([[0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4]]);
        var center = VF.vectorScale(VF.vectorSum([coords[0], coords[1], coords[2], coords[3]]), 0.25);
        coords.push(center);

    } else if (sideNumber == 5) {

        faces = faces.concat([[0, 1, 5], [1, 2, 5], [2, 3, 5], [3, 4, 5], [4, 0, 5]]);
        var center = VF.vectorScale(VF.vectorSum([coords[0], coords[1], coords[2], coords[3], coords[4]]), 0.2);
        coords.push(center);

    }

    return [faces, coords];

}

export { euclideanFace };