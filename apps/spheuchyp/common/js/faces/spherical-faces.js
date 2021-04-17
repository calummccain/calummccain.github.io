import * as VF from "../maths-functions/vector-functions.js";

function sphericalFace(vertices, refinement) {

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