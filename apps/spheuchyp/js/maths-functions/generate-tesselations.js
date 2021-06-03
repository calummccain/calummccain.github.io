import * as VF from "../maths-functions/vector-functions.js";
import * as HF from "../maths-functions/hyperbolic-functions.js";

const eps = 1e-4;

// ========================================================
// Reflects the vertices 'initialVerts' according to the
// reflections in 'fNames'. Only returns unique vertices 
// 
// Inputs: initialVerts
//         matrixDict
//         fNames
// Output: array of vertices
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function makeVertices(initialVerts, matrixDict, fNames) {

    var verts = initialVerts;

    var newVerts = [];

    var testVertices;

    for (var i = 0; i < fNames.length; i++) {

        testVertices = VF.transformVertices(verts, fNames[i], matrixDict);

        testVertices.forEach((vector) => {
            if (!(VF.isInArray(vector, verts) || VF.isInArray(vector, newVerts))) {

                newVerts.push(vector);

            }
        })

    }

    verts = verts.concat(newVerts);

    return verts;

}

// ========================================================
// Reflects the edges 'initialEdges' according to the
// reflections in 'fNames'. Only returns unique edges 
// 
// Inputs: initialEdgess
//         matrixDict
//         fNames
// Output: array of edges
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function makeEdges(initialEdges, matrixDict, fNames) {

    var edges = initialEdges;

    var newEdges = [];

    var testEdges;

    for (var i = 0; i < fNames.length; i++) {

        testEdges = VF.transformVertices(edges, fNames[i], matrixDict);

        testEdges.forEach((vector) => {
            if (!(VF.isInArray(vector, edges) || VF.isInArray(vector, newEdges))) {

                newEdges.push(vector);

            }
        })

    }

    edges = edges.concat(newEdges);

    return edges;

}

// ========================================================
// Transforms the vertex according to the matrix (function)
// given
// 
// Inputs: letter
//         amat
//         bmat
//         cmat
//         dmat
//         emat
//         fmat
//         v
// Output: vertex
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function matrixDict(letter, amat, bmat, cmat, dmat, emat, fmat, v) {

    if (letter === "a") {

        return amat(v);

    } else if (letter === "b") {

        return bmat(v);

    } else if (letter === "c") {

        return cmat(v);

    } else if (letter === "d") {

        return dmat(v);

    } else if (letter === "e") {

        return emat(v);

    } else if (letter === "f") {

        return fmat(v);

    } else {

        throw 'letter needs to be one of a, b, c, d, e, f!';

    }

}

// ========================================================
// Generates unique faces and their names
// 
// Inputs: face
//         maxNumber
//         numEdges
//         matrixDict
// Output: [array of face vectors, array of face names]
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function makeFaces(face, maxNumber, numEdges, matrixDict) {

    var faces = [face];
    var faceNames = [""];
    const maxFaces = maxNumber;
    var i = 1;

    var j, append, newFaces, newNames, testCenters;

    while (i < maxFaces) {

        j = 0
        append = "c";
        newFaces = [];
        newNames = [];

        while (j < numEdges) {

            testCenters = VF.transformVertices(faces, append, matrixDict);

            for (var k = 0; k < testCenters.length; k++) {

                if (!(VF.isInArray(testCenters[k], faces) || VF.isInArray(testCenters[k], newFaces))) {
                    newFaces.push(testCenters[k]);
                    newNames.push(append + faceNames[k]);
                }

            }

            append = "ab" + append;
            j++;

        }

        faces = faces.concat(newFaces);
        faceNames = faceNames.concat(newNames);

        i = faces.length;

    }

    return [faces, faceNames];

}

// ========================================================
// Finds which vertices surround each face
// 
// Inputs: fvDist
//         numEdges
//         metric
//         f
//         v
//         fmat
// Output: array of [p1, p2, p3, ...]
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function generateFaceData(fvDist, numEdges, metric, f, v, fmat) {

    var faceData = [];
    var fv = (metric !== "p") ? fvDist : 1;

    var nearestPoints, j;

    f.forEach((face) => {

        nearestPoints = [];
        j = 0;

        for (var i = 0; i < v.length; i++) {

            if (j === numEdges) {

                break;

            }

            if (Math.abs(HF.hyperboloidInnerProduct(fmat(v[i]), fmat(face)) ** 2 - fv) < eps) {

                nearestPoints.push(i)
                j++;

            }

        }

        faceData.push(nearestPoints);

    })

    return faceData;

}

// ========================================================
// Finds which vertices surround each edge
//
// Inputs: evDist
//         e
//         v
//         fmat
// Output: array of [p1, p2]
//
// Change history:
//     ??/??/?? Initial commit
//     01/05/21 Removed ev calculation
//=========================================================

function generateEdgeData(evDist, e, v, fmat) {

    var edgeData = [];
    var nearestPoints, j;

    e.forEach((edge) => {

        nearestPoints = [];
        j = 0;

        for (var i = 0; i < v.length; i++) {

            if (j === 2) {

                break;

            }

            if (Math.abs(HF.hyperboloidInnerProduct(fmat(v[i]), fmat(edge)) ** 2 - evDist) < eps) {

                nearestPoints.push(i)
                j++;

            }

        }

        edgeData.push(nearestPoints);

    })

    return edgeData;

}

// ========================================================
// Orders the face-vertex lists so that when drawn in 
// sequence the vertices produce the face cyclically
// 
// Inputs: numEdges
//         faceData
//         edgeData
// Output: array of [p1, p2, p3, ...]
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function orderFaces(numEdges, faceData, edgeData) {

    var newFaceData = [];

    var newFace, k;

    faceData.forEach((face) => {

        newFace = [face[0]];
        k = 1;

        while (k < numEdges) {

            for (var i = 1; i < numEdges; i++) {

                if (VF.isInArray([Math.min(newFace[newFace.length - 1], face[i]), Math.max(newFace[newFace.length - 1], face[i])], edgeData) && !newFace.includes(face[i])) {

                    newFace.push(face[i]);
                    k++;

                }

            }

        }

        newFaceData.push(newFace);

    })

    return newFaceData;

}

export {
    makeVertices,
    makeEdges,
    matrixDict,
    makeFaces,
    generateFaceData,
    generateEdgeData,
    orderFaces
}
