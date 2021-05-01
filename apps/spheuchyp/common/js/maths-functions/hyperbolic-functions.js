import * as VF from "./vector-functions.js";

const tol = 1e-4;

// ========================================================
// Hyperboloid model inner product
// 
// Inputs: x, y
// Output: <x,y> with the lorentzian metric tensor
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function hyperboloidInnerProduct(x, y) {

    return x[0] * y[0] - x[1] * y[1] - x[2] * y[2] - x[3] * y[3];

}

// ========================================================
// Hyperboloid model norm
// 
// Inputs: x
// Output: <x,x> with the lorentzian metric tensor
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function hyperbolicNorm(x) {

    return hyperboloidInnerProduct(x, x);

}

// ========================================================
// Stereographic projection from hyperboloid model to
// the poincare model
//
// Inputs: x
// Output: If x is on/near lightcone (x1/x0, x2/x0, x3/x0)
//         If <x,x> > 0 (x1/(1+x0), x2/(1+x0), x3/(1+x0))
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function hyperboloidToPoincare(x) {

    if (Math.abs(hyperbolicNorm(x)) < tol) {

        const scale = 1 / x[0];
        return [x[1] * scale, x[2] * scale, x[3] * scale];

    } else if (hyperbolicNorm(x) >= tol) {

        const scale = 1 / (1 + x[0]);
        return [x[1] * scale, x[2] * scale, x[3] * scale];

    } else {

        const initialVect = [x[1], x[2], x[3]];
        const l = VF.norm(initialVect);

        return VF.vectorScale(initialVect, 1 / l);

    }

}

// ========================================================
// Stereographic projection from hyperboloid model to
// the klein model
//
// Inputs: x
// Output: (x1/x0, x2/x0, x3/x0)
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function hyperboloidToKlein(x) {

    return [x[1] / x[0], x[2] / x[0], x[3] / x[0]];

}

// ========================================================
// Cayley transform from the poincare model to the upper
// half plane model
//
// Inputs: point = (x,y,z)
// Output: (2 * x / (x ** 2 + y ** 2 + (1 - z) ** 2), 
//          2 * y / (x ** 2 + y ** 2 + (1 - z) ** 2), 
//          (1 - x ** 2 - y ** 2 - z ** 2) / 
//                        (x ** 2 + y ** 2 + (1 - z) ** 2))
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function poincareToUpperHalfPlane(point) {

    var x = point[0], y = point[1], z = point[2];
    var s = 1 / (x * x + y * y + 1 - 2 * z + z * z);

    if (s < tol) {

        return [x, y, Infinity];

    } else if (VF.norm([x, y, z]) > 1 - tol) {

        return [2 * x * s, 2 * y * s, 0];

    } else {

        return [2 * x * s, 2 * y * s, (1 - x * x - y * y - z * z) * s];

    }

}

// ========================================================
// Cayley transform from the upper half plane model to the
// poincare model
//
// Inputs: point = (x,y,z)
// Output: (2 * x / (x ** 2 + y ** 2 + (1 + z) ** 2), 
//          2 * y / (x ** 2 + y ** 2 + (1 + z) ** 2), 
//          (x ** 2 + y ** 2 + z ** 2 - 1) / 
//                        (x ** 2 + y ** 2 + (1 + z) ** 2))
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function upperHalfPlaneToPoincare(point) {

    const x = point[0], y = point[1], z = point[2];
    const s = 1 / (x * x + y * y + (1 + z) * (1 + z));

    return [2 * x * s, 2 * y * s, (x * x + y * y + z * z - 1) * s];

}

// ========================================================
// Cayley transform from the poincare model to the upper
// half plane model
//
// Inputs: x
// Output: (2 * x / (x ** 2 + y ** 2 + (1 - z) ** 2), 
//          2 * y / (x ** 2 + y ** 2 + (1 - z) ** 2), 
//          (1 - x ** 2 - y ** 2 - z ** 2) / 
//                        (x ** 2 + y ** 2 + (1 - z) ** 2))
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

// TODO what if point is ideal ie r = 1 - tol

function poincareToHyperboloid(x) {

    const r = x[0] * x[0] + x[1] * x[1] + x[2] * x[2];
    const denom = 1 / (1 - r);

    return [(1 + r) * denom, 2 * x[0] * denom, 2 * x[1] * denom, 2 * x[2] * denom];

}

// 'Cayley transform' from poincare to UHP
// (w, x, y, z) ===> (x / (w - z), 
//                    y / (w - z), 
//                    (z ** 2) / (2 * w * (w - z)))
// function lightConeToUpperHalfPlane(point) {

//     var w = point[0];
//     var x = point[1];
//     var y = point[2];
//     var z = point[3];
//     var s = x ** 2 + y ** 2 + (w - z) ** 2;
//     return [2 * x / s, 2 * y / s, (1 - x ** 2 - y ** 2) / s];

// }

//TODO ideal point again
function kleinToPoincare(point) {

    var dist = VF.norm2(point);
    var hyperbolicDist = (dist < 1 - tol) ? 1 / (1 + Math.sqrt(Math.abs(1 - dist))) : 1;

    return VF.vectorScale(point, hyperbolicDist);

}

function hyperboloidToUpperHalfPlane(point) {

    // var w = point[0];
    // var x = point[1];
    // var y = point[2];
    // var z = point[3];

    // var den = (w ** 2) + 1 - z * (w + 1);

    //return [x * (w + 1) / den, y * (w + 1) / den, 2 * w / den];

    return poincareToUpperHalfPlane(hyperboloidToPoincare(point));
}

function kleinToUpperHalfPlane(point) {

    return poincareToUpperHalfPlane(kleinToPoincare(point));

}

function upperHalfPlaneToKlein(point) {

    return poincareToKlein(upperHalfPlaneToPoincare(point));

}

function poincareToKlein(point) {

    const x = point[0], y = point[1], z = point[2];
    const s = 2 / (1 + x * x + y * y + z * z);

    return [x * s, y * s, z * s];

}

// finds center of a crcle knowing two points and that it lies on z = 0
function uhpCenter(p1, p2, p3) {

    var p12 = VF.midpoint(p1, p2);
    var p13 = VF.midpoint(p1, p3);
    var n12 = VF.vectorDiff(p1, p2);
    var n13 = VF.vectorDiff(p1, p3);

    var d12 = VF.vectorDot(p12, n12);
    var d13 = VF.vectorDot(p13, n13);

    // var p0 = [0, 0, 0];
    var n0 = [0, 0, 1];

    var A = [n0[0], n12[0], n13[0]];
    var B = [n0[1], n12[1], n13[1]];
    var C = [n0[2], n12[2], n13[2]];
    var D = [0, d12, d13];

    var ABC = 1 / VF.determinant3([A, B, C]);

    return [
        VF.determinant3([D, B, C]) * ABC,
        VF.determinant3([A, D, C]) * ABC,
        VF.determinant3([A, B, D]) * ABC
    ];

}


function geodesicEndpoints(a, b) {

    if ((Math.abs(hyperbolicNorm(a)) < tol) && (Math.abs(hyperbolicNorm(b)) < tol)) {

        return [a, b];

    }

    var inner = hyperboloidInnerProduct(a, b);
    var eAlpha = 1 / (inner + Math.sqrt(inner * inner - 1));
    return [VF.vectorDiff(VF.vectorScale(a, eAlpha), b), VF.vectorDiff(VF.vectorScale(b, eAlpha), a)];

}


export {
    poincareToHyperboloid,
    hyperboloidInnerProduct,
    poincareToUpperHalfPlane,
    hyperboloidToKlein,
    hyperboloidToPoincare,
    hyperbolicNorm,
    kleinToPoincare,
    hyperboloidToUpperHalfPlane,
    kleinToUpperHalfPlane,
    upperHalfPlaneToPoincare,
    upperHalfPlaneToKlein,
    uhpCenter,
    geodesicEndpoints
};