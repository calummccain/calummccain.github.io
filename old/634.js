// Order 4 hexagonal (paracompact)

import { p } from "../js/data/constants.js";

function a(v) {

    return [v[0], v[1], (v[2] + v[3]) / 2, (3 * v[2] - v[3]) / 2];

}

function b(v) {

    return [v[0], v[1], -v[2], v[3]];

}

function c(v) {

    return [(5 * v[0] - v[1] - 4 * v[3]) / 4, (v[0] + 3 * v[1] - 4 * v[3]) / 4, v[2], (2 * v[0] - 2 * v[1] - 4 * v[3]) / 4];

}

function d(v) {

    const i = v[0];
    const j = v[1];
    const k = v[2];
    const l = v[3];

    return [i, (-j + 6 * k + 2 * l) / 3, (2 * j + 3 * k - l) / 6, (2 * j - 3 * k + 5 * l) / 6];

}

function e(v) {

    return [v[0], v[1], v[2], v[3]];

}

// function f(v) {

//     return [v[0] - 3, v[1], Math.sqrt(3/2) * v[2], Math.sqrt(1/2) * v[3]];

// }

function f(v) {

    return [(p ** 4) * v[0] / 2 + 1 - 2 * (p ** 4), (p ** 4) * v[1] / 2, Math.sqrt(3) * (p ** 2) * v[2] / 2, (p ** 2) * v[3] / 2];

}

function matrixDict(order, letter, vector) {
    var newVector;
    switch (letter) {
        case 'a':
            newVector = a(vector);
            break;
        case 'b':
            newVector = b(vector);
            break;
        case 'c':
            newVector = c(vector);
            break;
        case 'd':
            newVector = d(vector);
            break;
        case 'e':
            newVector = e(vector);
            break;
        case 'f':
            newVector = f(vector);
            break;
    }
    return newVector;
};

const faceReflections = ['', 'b', 'ab', 'cab', 'acab', 'bacab', 'cacab', 'cbacab', 'acacab', 'abcacab', 'bacacab', 'abacacab', 'cabcacab', 'cabacacab', 'acabcacab', 'abcabcacab', 'bacabcacab', 'abacabcacab', 'cacabcacab', 'cabcabcacab', 'cbacabcacab', 'cabacabcacab', 'abcacabcacab', 'acabcabcacab', 'abcabcabcacab', 'bacabcabcacab', 'abacabcabcacab', 'cabcacabcacab', 'cabcabcabcacab', 'cabacabcabcacab', 'acabcacabcacab', 'bacabcacabcacab', 'acabcabcabcacab', 'abcabcabcabcacab', 'bacabcabcabcacab', 'abacabcabcabcacab', 'cacabcacabcacab', 'cbacabcacabcacab', 'cacabcabcabcacab', 'cabcabcabcabcacab', 'cbacabcabcabcacab', 'cabacabcabcabcacab', 'abcacabcacabcacab', 'abacacabcacabcacab', 'acabcabcabcabcacab', 'abcabcabcabcabcacab', 'bacabcabcabcabcacab', 'abacabcabcabcabcacab', 'cabcacabcacabcacab', 'cabacacabcacabcacab', 'cabcabcabcabcabcacab', 'cabacabcabcabcabcacab', 'acabcacabcacabcacab', 'abcabcacabcacabcacab', 'bacabcacabcacabcacab', 'abacabcacabcacabcacab', 'acabcabcabcabcabcacab', 'abcabcabcabcabcabcacab', 'bacabcabcabcabcabcacab', 'abacabcabcabcabcabcacab', 'cacabcacabcacabcacab', 'cabcabcacabcacabcacab', 'cbacabcacabcacabcacab', 'cabacabcacabcacabcacab', 'cacabcabcabcabcabcacab', 'cabcabcabcabcabcabcacab', 'cbacabcabcabcabcabcacab', 'cabacabcabcabcabcabcacab', 'abcacabcacabcacabcacab', 'abcabcabcacabcacabcacab', 'abacabcabcacabcacabcacab', 'acabcabcabcabcabcabcacab', 'abcabcabcabcabcabcabcacab', 'bacabcabcabcabcabcabcacab', 'abacabcabcabcabcabcabcacab', 'cabcacabcacabcacabcacab', 'cabcabcabcacabcacabcacab', 'cabacabcabcacabcacabcacab', 'cabcabcabcabcabcabcabcacab', 'cabacabcabcabcabcabcabcacab', 'acabcacabcacabcacabcacab', 'bacabcacabcacabcacabcacab', 'acabcabcabcacabcacabcacab', 'abcabcabcabcacabcacabcacab', 'bacabcabcabcacabcacabcacab', 'abacabcabcabcacabcacabcacab', 'acabcabcabcabcabcabcabcacab', 'abcabcabcabcabcabcabcabcacab', 'bacabcabcabcabcabcabcabcacab', 'abacabcabcabcabcabcabcabcacab', 'cacabcacabcacabcacabcacab', 'cbacabcacabcacabcacabcacab', 'cacabcabcabcacabcacabcacab', 'cabcabcabcabcacabcacabcacab', 'cbacabcabcabcacabcacabcacab', 'cabacabcabcabcacabcacabcacab', 'cacabcabcabcabcabcabcabcacab', 'cabcabcabcabcabcabcabcabcacab', 'cbacabcabcabcabcabcabcabcacab', 'cabacabcabcabcabcabcabcabcacab', 'abcacabcacabcacabcacabcacab', 'abacacabcacabcacabcacabcacab', 'abcabcabcabcabcacabcacabcacab', 'abacabcabcabcabcacabcacabcacab', 'acabcabcabcabcabcabcabcabcacab', 'abcabcabcabcabcabcabcabcabcacab', 'bacabcabcabcabcabcabcabcabcacab', 'abacabcabcabcabcabcabcabcabcacab'];

function vectorSum(x, y) {

    var vDiff = [];

    for (var i = 0; i < x.length; i++) {

        vDiff[i] = Math.round(x[i] + y[i]);

    }

    return vDiff;

}

// scales a vector by 's'
function vectorScale(x, s) {

    var vScale = [];

    for (var i = 0; i < x.length; i++) {

        vScale[i] = x[i] * s;

    }

    return vScale;

}

function transformVertices(baseVertices, transformation, dictionary) {

    var newVertices = [];
    var e1 = [1, 0, 0, 0], e2 = [0, 1, 0, 0], e3 = [0, 0, 1, 0], e4 = [0, 0, 0, 1];

    if (transformation !== '') {
        for (var i = transformation.length - 1; i > -1; i--) {
            e1 = dictionary(transformation[i], e1);
            e2 = dictionary(transformation[i], e2);
            e3 = dictionary(transformation[i], e3);
            e4 = dictionary(transformation[i], e4);
        }
    }


    for (var j = 0; j < baseVertices.length; j++) {
        var oldVertex = baseVertices[j];
        var newVertex = vectorSum(
            vectorSum(
                vectorScale(e1, oldVertex[0]),
                vectorScale(e2, oldVertex[1])
            ),
            vectorSum(
                vectorScale(e3, oldVertex[2]),
                vectorScale(e4, oldVertex[3])
            )
        );
        newVertices.push(newVertex);
    }

    return newVertices;
}

// var v = [];
// for (var i = 0; i < faceReflections.length; i++) {
//     v = v.concat(transformVertices(vertices, faceReflections[i], matrixDict));
// }
// console.log(v.slice(600, 700));
export { vertices, faces, a, b, c, d, e, f, matrixDict, faceReflections };
