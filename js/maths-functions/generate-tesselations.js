import * as VF from "../maths-functions/vector-functions.js";
import * as HF from "../maths-functions/hyperbolic-functions.js";

const eps = 1e-4;

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

function generateEdgeData(evDist, metric, e, v, fmat) {

    var edgeData = [];
    var ev = (metric !== "p") ? evDist : HF.hyperboloidInnerProduct(fmat(v[0]), fmat(e[0])) ** 2;

    var nearestPoints, j;

    e.forEach((edge) => {

        nearestPoints = [];
        j = 0;

        for (var i = 0; i < v.length; i++) {

            if (j === 2) {

                break;

            }

            if (Math.abs(HF.hyperboloidInnerProduct(fmat(v[i]), fmat(edge)) ** 2 - ev) < eps) {

                nearestPoints.push(i)
                j++;

            }

        }

        edgeData.push(nearestPoints);

    })

    return edgeData;

}

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
