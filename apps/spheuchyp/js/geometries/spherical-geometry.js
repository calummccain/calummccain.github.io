// ========================================================
// Generates the geometric data for the cell in question
//
// Inputs: data
//         transform
//         refinement
// Output: [array of geometries for each face]
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

import * as THREE from "../three-bits/three.module.js";
import { sphericalFace } from "../faces/spherical-faces.js";
import * as SF from "../maths-functions/spherical-functions.js";
import * as VF from "../maths-functions/vector-functions.js";
import { matrixDict } from "../maths-functions/generate-tesselations.js";

function sphericalGeometry(data, transform, refinement) {

    const matrix = (letter, v) => matrixDict(letter, data.a, data.b, data.c, data.d, data.e, data.f, v);

    // Transform the 'central' cell's vertices to the transformed cell's vertices
    var newVertices = VF.transformVertices(data.vertices, transform, matrix);

    var properVertices = [];

    for (var i = 0; i < newVertices.length; i++) {

        properVertices[i] = data.f(newVertices[i]);

    }

    var cellGeometry = [];
    var faceGeometry, initial, faceVertices, faceData, facets, hypersphereVertices, vertex, vertex2, facetPiece;

    for (var i = 0; i < data.numFaces; i++) {

        faceGeometry = new THREE.Geometry();
        initial = 0;
        faceVertices = Array(data.faces[i].length).fill().map(() => initial++);
        faceVertices = faceVertices.map((x) => properVertices[data.faces[i][x]]);
        faceData = sphericalFace(faceVertices, refinement);

        facets = faceData[0];
        hypersphereVertices = faceData[1];

        for (var j = 0; j < hypersphereVertices.length; j++) {

            vertex = VF.vectorScale(hypersphereVertices[j], 1 / VF.norm(hypersphereVertices[j]));
            vertex2 = SF.hyperToStereo(vertex);
            faceGeometry.vertices.push(new THREE.Vector3(vertex2[0], vertex2[1], vertex2[2]));

        }

        for (var k = 0; k < facets.length; k++) {

            facetPiece = facets[k];
            faceGeometry.faces.push(new THREE.Face3(facetPiece[0], facetPiece[1], facetPiece[2]));

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


export { sphericalGeometry };