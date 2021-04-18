import * as VF from "../maths-functions/vector-functions.js";

function hyperbolicFace(vertices, refinement, metric) {

    var sideNumber = vertices.length;
    var faces = [];
    var center = [0, 0, 0];

    var coords = vertices;

    if (metric === "u") {

        refinement += 1;

    }

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

    if (metric === "u") {

        var outside = [];
        var newFaces = [];
        var numberOfCoords = coords.length;

        for (var i = 0; i < coords.length; i++) {

            if (VF.norm(coords[i]) > 1) {

                outside.push(i);

            }

        }

        var faceBadNumber, faceBadVertices, faceGoodVertices, bv, p1, p2, bv1, bv2, dbv;

        faces.forEach((face) => {

            faceBadNumber = 0;
            faceBadVertices = [];
            faceGoodVertices = [];

            for (var i = 0; i < 3; i++) {

                if (outside.includes(face[i])) {

                    faceBadNumber += 1;
                    faceBadVertices.push(i);

                } else {

                    faceGoodVertices.push(i);

                }

            }

            if (faceBadNumber == 0) {

                newFaces.push(face);

            } else if (faceBadNumber == 1) {

                bv = faceBadVertices[0];

                p1 = VF.lineSphereIntersection(coords[face[(bv + 1) % 3]], coords[face[bv]]);
                p2 = VF.lineSphereIntersection(coords[face[(bv + 2) % 3]], coords[face[bv]]);

                coords.push(p1);
                coords.push(p2);

                newFaces.push([face[(bv + 1) % 3], face[(bv + 2) % 3], numberOfCoords]);
                newFaces.push([face[(bv + 2) % 3], numberOfCoords + 1, numberOfCoords]);

                numberOfCoords += 2;

            } else if (faceBadNumber == 2) {

                bv1 = faceBadVertices[0];
                bv2 = faceBadVertices[1];

                dbv = bv1 - bv2;

                if (dbv == 1 || dbv == -2) {

                    [bv1, bv2] = [bv2, bv1];

                }

                p1 = VF.lineSphereIntersection(coords[face[3 - bv1 - bv2]], coords[face[bv1]]);
                p2 = VF.lineSphereIntersection(coords[face[3 - bv1 - bv2]], coords[face[bv2]]);

                coords.push(p1);
                coords.push(p2);

                newFaces.push([face[3 - bv1 - bv2], numberOfCoords, numberOfCoords + 1]);
                numberOfCoords += 2;

            } else {

            }

        })

        faces = newFaces;

    }

    return [faces, coords];

}

export { hyperbolicFace };