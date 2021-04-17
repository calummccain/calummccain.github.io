import * as THREE from "../../../../common/js/three-bits/three.module.js";
import { hyperbolicFace } from "../faces/hyperbolic-faces.js";
import * as HF from "../maths-functions/hyperbolic-functions.js";
import * as VF from "../maths-functions/vector-functions.js";
import { matrixDict } from "../data/matrix-dictionary.js";

function hyperbolicGeometry(data, transform, refinement, model) {

    var matrix = matrixDict(data);

    // Transform the 'central' cell's vertices to the transformed cell's vertices
    var newVertices = VF.transformVertices(data.vertices, transform, matrix);

    // Project the transformed cell's vertices to the Klein Model
    var kleinVertices = [];

    for (var i = 0; i < newVertices.length; i++) {

        kleinVertices[i] = HF.hyperboloidToKlein(data.f(newVertices[i]));

    }

    // For each face make a geometry for it and add it to the cellGeometry array
    var cellGeometry = [];
    var subdividedFaces, subdividedVertices, initial, faceGeometry, faceVertices, vertex;

    for (var i = 0; i < data.numFaces; i++) {

        subdividedFaces, subdividedVertices;
        initial = 0;
        faceGeometry = new THREE.Geometry();
        faceVertices = Array(data.numSides).fill().map(() => initial++);
        faceVertices = faceVertices.map((x) => kleinVertices[data.faces[i][x]]);

        // kleinFace subdivides the face automatically and returns the vertices and the face indices
        [subdividedFaces, subdividedVertices] = hyperbolicFace(faceVertices, refinement, data.metric);

        // Transform the vertices from the Klein Model to the Poincare Model
        // Then add these to the faceGeometry (as THREE.Vector3)
        for (var j = 0; j < subdividedVertices.length; j++) {

            vertex = [0, 0, 0];

            if (model === "klein") {

                vertex = subdividedVertices[j]

            } else if (model === "poincare") {

                vertex = HF.kleinToPoincare(subdividedVertices[j]);

            } else if (model === "uhp") {

                vertex = HF.kleinToUpperHalfPlane(subdividedVertices[j]);

            }

            faceGeometry.vertices.push(new THREE.Vector3(vertex[0], vertex[1], vertex[2]));

        }

        // Add the faces to the geometry (as THREE.Face3)
        for (var k = 0; k < subdividedFaces.length; k++) {

            faceGeometry.faces.push(new THREE.Face3(subdividedFaces[k][0], subdividedFaces[k][1], subdividedFaces[k][2]));

        }

        // Optimise the geometry
        faceGeometry.mergeVertices();

        //  Give the face a name (useful for raycasting)
        faceGeometry.name = data.faceReflections[i];

        // Add the face's geometry to the cellGeometry array
        cellGeometry.push(faceGeometry);

    }

    return cellGeometry;
}

export { hyperbolicGeometry };