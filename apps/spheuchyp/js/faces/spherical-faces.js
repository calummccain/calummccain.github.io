// ========================================================
// Triangulates a spherical face
// 
// Inputs: vertices = vertex positions of face
//         refinement = number of subdivision passes
// Output: [mini triangle data, coordinates of mini triangles]
//
// Change history:
//     ??/??/?? Initial commit
//     19/05/21 Supports faces with 6+ sides
//=========================================================

import * as VF from "../maths-functions/vector-functions.js";

function sphericalFace(vertices, refinement) {

    var sideNumber = vertices.length;

    var coords = vertices;
    var faces = [];
    var center = [0, 0, 0, 0];

    if (sideNumber == 3) {

        faces = [[0, 1, 2]];

    } else {

        for (var i = 0; i < sideNumber; i++) {

            faces.push([i, (i + 1) % sideNumber, sideNumber]);
            center = VF.vectorSum([center, vertices[i]]);

        }

        center = VF.vectorScale(center, 1 / sideNumber);
        coords.push(center);

    }

    var j = 0;
    var newCoords, newFaces, u, v, w, sixi;

    while (j < refinement) {

        newCoords = [];
        newFaces = [];

        for (var i = 0; i < faces.length; i++) {

            u = VF.midpoint(coords[faces[i][0]], coords[faces[i][1]]);
            v = VF.midpoint(coords[faces[i][1]], coords[faces[i][2]]);
            w = VF.midpoint(coords[faces[i][2]], coords[faces[i][0]]);

            newCoords = newCoords.concat([
                coords[faces[i][0]],
                coords[faces[i][1]],
                coords[faces[i][2]],
                u,
                v,
                w
            ]);

            sixi = 6 * i;

            newFaces = newFaces.concat([
                [sixi, sixi + 3, sixi + 5],
                [sixi + 3, sixi + 1, sixi + 4],
                [sixi + 5, sixi + 4, sixi + 2],
                [sixi + 3, sixi + 4, sixi + 5]
            ]);
        }

        faces = newFaces;
        coords = newCoords;
        j++;

    }

    return [faces, coords];

}

export { sphericalFace };