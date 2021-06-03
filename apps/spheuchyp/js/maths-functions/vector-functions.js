import { isInArrayEps } from "../eps.js";

// ========================================================
// Returns the component-wise sum of several arrays
//
// Inputs: [p1, p2, ...]
// Output: vector of length p1
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function vectorSum(array) {

    var vSum = [];

    var smallSum;

    for (var i = 0; i < array[0].length; i++) {

        smallSum = 0;

        for (var j = 0; j < array.length; j++) {

            smallSum += array[j][i];

        }

        vSum.push(smallSum);

    }

    return vSum;

}

// ========================================================
// Returns the component-wise difference of two arrays
//
// Inputs: x, y
// Output: vector of length x
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function vectorDiff(x, y) {

    var vDiff = [];

    for (var i = 0; i < x.length; i++) {

        vDiff.push(x[i] - y[i]);

    }

    return vDiff;

}

// ========================================================
// Returns the component-wise scaling of a vector by a 
// constant
//
// Inputs: x, s
// Output: vector of length x
//         s * x
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function vectorScale(x, s) {

    var vScale = [];

    for (var i = 0; i < x.length; i++) {

        vScale.push(x[i] * s);

    }

    return vScale;

}

// ========================================================
// Returns the cross product of two 3d vectors
//
// Inputs: a, b
// Output: a x b
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function vectorCross(a, b) {

    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
    ];

}

// ========================================================
// Returns the nD dot product of two vectors
// Inputs: a, b
// Output: vector of length a
//         a.b
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function vectorDot(a, b) {

    var dot = 0;

    for (var i = 0; i < a.length; i++) {

        dot += a[i] * b[i];

    }

    return dot;

}

// calculates intersection of a line and a sphere 
// TODO: assumes line intersects sphere
function lineSphereIntersection(a, b) {

    var ab = vectorDiff(a, b);

    var A = vectorDot(ab, ab), B = 2 * vectorDot(b, ab), C = vectorDot(b, b) - 1;

    var l1 = (-B + Math.sqrt(B ** 2 - 4 * A * C)) / (2 * A);
    var l2 = (-B - Math.sqrt(B ** 2 - 4 * A * C)) / (2 * A);

    var l = Math.min(l1, l2);
    return vectorSum([vectorScale(a, l), vectorScale(b, 1 - l)]);

}

// ========================================================
// Returns the midpoint of the interval between two points
//
// Inputs: a, b
// Output: (a+b)/2
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function midpoint(a, b) {

    return vectorScale(vectorSum([a, b]), 0.5);

}

// ========================================================
// Returns the nD norm of a vector
//
// Inputs: x
// Output: sqrt(x.x)
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function norm(x) {

    return Math.sqrt(vectorDot(x, x));

}

// ========================================================
// Returns nD norm of a vector squared 
//
// Inputs: x
// Output: x.x
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function norm2(x) {

    return vectorDot(x, x);

}

// ========================================================
// Returns the nD distance between two points
//
// Inputs: x, y
// Output: sqrt((x-y).(x-y))
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function distance(x, y) {

    return norm(vectorDiff(x, y));

}

// ========================================================
// Returns the nD distance squared between two points
//
// Inputs: x, y
// Output: (x-y).(x-y)
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function distance2(x, y) {

    return norm2(vectorDiff(x, y));

}

// ========================================================
// Returns the circumradius of a triangle given its side 
// lengths
//
// Inputs: a, b, c
// Output: C
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function circumradius(a, b, c) {

    return (a * b * c) / Math.sqrt(Math.abs((a + b + c) * (b + c - a) * (c + a - b) * (a + b - c)));

}

// ========================================================
// Returns the circumcenter of a triangle in 2D given its 
// vertices
//
// Inputs: u, v, w
// Output: C
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function circumcenter(u, v, w) {

    const a = -1 / (2 * determinant([[u[0], u[1], 1], [v[0], v[1], 1], [w[0], w[1], 1]]));
    const ru = u[0] * u[0] + u[1] * u[1], rv = v[0] * v[0] + v[1] * v[1], rw = w[0] * w[0] + w[1] * w[1];
    const bx = -determinant([[ru, u[1], 1], [rv, v[1], 1], [rw, w[1], 1]]);
    const by = determinant([[ru, u[0], 1], [rv, v[0], 1], [rw, w[0], 1]]);

    return [bx * a, by * a]

}

function circum4(u, v, w, x) {

    const nu = vectorDot(u, u), nv = vectorDot(v, v), nw = vectorDot(w, w), nx = vectorDot(x, x);

    const a = determinant4([[u[0], u[1], u[2], 1], [v[0], v[1], v[2], 1], [w[0], w[1], w[2], 1], [x[0], x[1], x[2], 1]]);
    const g = determinant4([[nu, u[0], u[1], u[2]], [nv, v[0], v[1], v[2]], [nw, w[0], w[1], w[2]], [nx, x[0], x[1], x[2]]]);

    const dx = determinant4([[nu, u[1], u[2], 1], [nv, v[1], v[2], 1], [nw, w[1], w[2], 1], [nx, x[1], x[2], 1]]);
    const dy = -determinant4([[nu, u[0], u[2], 1], [nv, v[0], v[2], 1], [nw, w[0], w[2], 1], [nx, x[0], x[2], 1]]);
    const dz = determinant4([[nu, u[0], u[1], 1], [nv, v[0], v[1], 1], [nw, w[0], w[1], 1], [nx, x[0], x[1], 1]]);

    return [[dx / (2 * a), dy / (2 * a), dz / (2 * a)], Math.sqrt((dx * dx + dy * dy + dz * dz - 4 * a * g) / (4 * a * a))];

}

// ========================================================
// Returns the determinant of a 2x2 matrix
//
// Inputs: m
// Output: det(m)
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function determinant2(m) {

    return m[0][0] * m[1][1] - m[0][1] * m[1][0];

}

// ========================================================
// Returns the determinant of a 3x3 matrix
//
// Inputs: m
// Output: det(m)
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function determinant3(m) {

    return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);

}

// ========================================================
// Returns the determinant of a 4x4 matrix
//
// Inputs: m
// Output: det(m)
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function determinant4(m) {

    const m1 = [[m[1][1], m[1][2], m[1][3]], [m[2][1], m[2][2], m[2][3]], [m[3][1], m[3][2], m[3][3]]];
    const m2 = [[m[1][0], m[1][2], m[1][3]], [m[2][0], m[2][2], m[2][3]], [m[3][0], m[3][2], m[3][3]]];
    const m3 = [[m[1][0], m[1][1], m[1][3]], [m[2][0], m[2][1], m[2][3]], [m[3][0], m[3][1], m[3][3]]];
    const m4 = [[m[1][0], m[1][1], m[1][2]], [m[2][0], m[2][1], m[2][2]], [m[3][0], m[3][1], m[3][2]]];

    return m[0][0] * determinant3(m1) - m[0][1] * determinant3(m2) + m[0][2] * determinant3(m3) - m[0][3] * determinant3(m4);

}

// ========================================================
// Transforms the set of vertices 'baseVertices' with the 
// word 'transformation' using the dictionary 'dictionary'
//
// Inputs: baseVertives
//         transformation
//         dictionary
// Output: newVertoces
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

// transforms the baseVertices with the word 'transformation' using the dictionary
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

    var oldVertex, newVertex;

    for (var j = 0; j < baseVertices.length; j++) {

        oldVertex = baseVertices[j];
        newVertex = vectorSum([
            vectorScale(e1, oldVertex[0]),
            vectorScale(e2, oldVertex[1]),
            vectorScale(e3, oldVertex[2]),
            vectorScale(e4, oldVertex[3])
        ]);


        newVertices.push(newVertex);

    }

    return newVertices;

}

// ========================================================
// Tests to see if a given vector is in an array
//
// Inputs: testVector
//         groupVectors
// Output: boolean
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function isInArray(testVector, groupVectors) {

    for (var i = 0; i < groupVectors.length; i++) {

        if (distance2(groupVectors[i], testVector) < isInArrayEps) {

            return true;

        }
    }

    return false;

}

export {
    vectorScale,
    vectorSum,
    vectorDiff,
    vectorCross,
    vectorDot,
    midpoint,
    norm,
    norm2,
    distance,
    lineSphereIntersection,
    circumradius,
    circumcenter,
    determinant2,
    determinant3,
    determinant4,
    circum4,
    transformVertices,
    isInArray
}