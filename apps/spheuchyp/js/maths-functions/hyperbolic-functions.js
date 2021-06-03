import * as VF from "./vector-functions.js";
import {
    hyperboloidToPoincareEps,
    poincareToUpperHalfPlaneEps,
    poincareToHyperboloidEps,
    kleinToPoincareEps,
    geodesicEndpointsEps,
    upperHalfPlaneToHyperboloidEps
} from "../eps.js";

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
// the klein model
//
// Inputs: x
// Output: (x1/x0, x2/x0, x3/x0)
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function hyperboloidToKlein(x) {

    return VF.vectorScale([x[1], x[2], x[3]], 1 / x[0]);

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
//     16/05/21 Tidy up
//=========================================================

function hyperboloidToPoincare(x) {

    if (Math.abs(hyperbolicNorm(x)) < hyperboloidToPoincareEps) {

        return VF.vectorScale([x[1], x[2], x[3]], 1 / x[0]);

    } else if (hyperbolicNorm(x) >= hyperboloidToPoincareEps) {

        return VF.vectorScale([x[1], x[2], x[3]], 1 / (1 + x[0]));

    } else {

        const initialVect = [x[1], x[2], x[3]];

        return VF.vectorScale(initialVect, 1 / VF.norm(initialVect));

    }

}

// ========================================================
// Transform from hyperboloid model to uhp model
//
// Inputs: (w, x, y, z)
// Output: (x, y, 1) / (w - z)
//
// Change history:
//     ??/??/?? Initial commit
//     16/05/21 Much more efficient - actually did the 
//              calculation
//=========================================================

function hyperboloidToUpperHalfPlane(point) {

    if (Math.abs(point[0] - point[3]) < poincareToUpperHalfPlaneEps) {

        return [point[1] / point[0], point[2] / point[0], Infinity];

    } else if (hyperbolicNorm(point) < poincareToUpperHalfPlaneEps) {

        return VF.vectorScale([point[1], point[2], 0], 1 / (point[0] - point[3]));

    } else {

        return VF.vectorScale([point[1], point[2], 1], 1 / (point[0] - point[3]));

    }

}

// ========================================================
// Stereographic projection from klein model to
// the hyperboloid model
//
// Inputs: x
// Output: (1, x0, x1, x2) / sqrt(1-r^2)
//
// Change history:
//     15/05/21 Initial commit
//=========================================================

function kleinToHyperboloid(x) {

    return VF.vectorScale([1, x[0], x[1], x[2]], 1 / Math.sqrt(1 - VF.norm2(x)));

}

// ========================================================
// Transform from klein model to poincare model
//
// Inputs: x
// Output: x / (1 + sqrt(1 - r^2))
//
// Change history:
//     ??/??/?? Initial commit
//     16/05/21 Changed var to const and removed dist
//=========================================================

function kleinToPoincare(x) {

    const hyperbolicDist = (VF.norm2(x) < 1 - kleinToPoincareEps) ? 1 / (1 + Math.sqrt(Math.abs(1 - VF.norm2(x)))) : 1;

    return VF.vectorScale(x, hyperbolicDist);

}

// ========================================================
// Transform from klein model to uhp model
//
// Inputs: point
// Output: (x, y, sqrt(1 - r^2)) / (1 - z)
//
// Change history:
//     ??/??/?? Initial commit
//     16/05/21 Much more efficient - actually did the 
//              calculation
//=========================================================

function kleinToUpperHalfPlane(point) {

    return VF.vectorScale([point[0], point[1], Math.sqrt(1 - VF.norm2(point))], 1 / (1 - point[2]));

}

// ========================================================
// Cayley transform from the poincare model to the upper
// half plane model
//
// Inputs: x
// Output: ((1+r)/(1-r), 2 x0 / (1-r), 2 x1 / (1-r), 2 x2 / (1-r))
//         or (1, x0, x1, x2) if on light cone
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function poincareToHyperboloid(x) {

    const r = x[0] * x[0] + x[1] * x[1] + x[2] * x[2];

    if (Math.abs(r - 1) < poincareToHyperboloidEps) {

        return VF.vectorScale([(1 + r), 2 * x[0], 2 * x[1], 2 * x[2]], 1 / (1 - r));

    } else {

        return [1, x[0], x[1], x[2]];
    }

}

// ========================================================
// Transform from poincare model to klein model
//
// Inputs: x
// Output: x * 2 / (1 + r^2)
//
// Change history:
//     ??/??/?? Initial commit
//     16/05/21 Removed extra constant
//=========================================================

function poincareToKlein(x) {

    return VF.vectorScale(x, 2 / (1 + VF.norm2(x)));

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
//     16/05/21 Removed excess constants
//=========================================================

function poincareToUpperHalfPlane(point) {

    const s = 1 / (point[0] * point[0] + point[1] * point[1] + (1 - point[2]) * (1 - point[2]));

    if (s < poincareToUpperHalfPlaneEps) {

        return [point[0], point[1], Infinity];

    } else if (VF.norm2(point) > 1 - poincareToUpperHalfPlaneEps) {

        return VF.vectorScale([point[0], point[1], 0], 2 * s);

    } else {

        return VF.vectorScale([2 * point[0], 2 * point[1], 1 - VF.norm2(point)], s);

    }

}

// ========================================================
// Transform from uhp model to hyperboloid model
//
// Inputs: (x, y, z)
// Output: ((r^2 + 1) / 2, x, y, (r^2 - 1) / 2) / z
//
// Change history:
//     16/05/21 Initial commit
//=========================================================

function upperHalfPlaneToHyperboloid(point) {

    if (point[2] > upperHalfPlaneToHyperboloidEps) {

        return VF.vectorScale([(VF.norm2(point) + 1) * 0.5, point[0], point[1], (VF.norm2(point) - 1) * 0.5], 1 / point[2]);

    } else {

        return [(VF.norm2(point) + 1) * 0.5, point[0], point[1], (VF.norm2(point) - 1) * 0.5];
    }

}

// ========================================================
// Transform from uhp model to klein model
//
// Inputs: (x, y, z)
// Output: (2x, 2y, r^2 - 1) / (r^2 + 1)
//
// Change history:
//     ??/??/?? Initial commit
//     16/05/21 Much more efficient - actually did the 
//              calculation
//=========================================================

function upperHalfPlaneToKlein(point) {

    return VF.vectorScale([2 * point[0], 2 * point[1], VF.norm2(point) - 1], 1 / (VF.norm2(point) + 1));

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

    return VF.vectorScale([2 * point[0], 2 * point[1], VF.norm2(point) - 1], 1 / (point[0] * point[0] + point[1] * point[1] + (1 + point[2]) * (1 + point[2])));

}

// ========================================================
// Find the center of a sphere knowing three points lying
// on it's surface and that the center lies on the plane
// z = 0
//
// Inputs: p1, p2, p3 
// Output: center = [*, *, *]
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function uhpCenter(p1, p2, p3) {

    var p12 = VF.midpoint(p1, p2);
    var p13 = VF.midpoint(p1, p3);
    var n12 = VF.vectorDiff(p1, p2);
    var n13 = VF.vectorDiff(p1, p3);

    var d12 = VF.vectorDot(p12, n12);
    var d13 = VF.vectorDot(p13, n13);

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

// ========================================================
// Given two points in the hyperboloid model calculates the
// endpoints of the geodesic that passes through them
// (endpoints lie on the plane at infinity)
//
// Inputs: a, b
// Output: [p1, p2]
//
// Change history:
//     ??/??/?? Initial commit
//     30/05/21 Improvement
//=========================================================

function geodesicEndpoints(a, b, l) {

    if ((Math.abs(hyperbolicNorm(a)) < geodesicEndpointsEps) && (Math.abs(hyperbolicNorm(b)) < geodesicEndpointsEps)) {

        return [a, b];

    }

    const cosh = -l;
    const sinh = Math.sqrt(cosh * cosh - 1);

    const p1 = VF.vectorScale(VF.vectorSum([VF.vectorScale(a, sinh - cosh), b]), 1 / sinh); // nearer b
    const p2 = VF.vectorScale(VF.vectorDiff(b, VF.vectorScale(a, sinh + cosh)), 1 / sinh); // nearer a

    return [p1, p2];
}


export {
    hyperboloidInnerProduct,
    hyperbolicNorm,
    hyperboloidToKlein,
    hyperboloidToPoincare,
    hyperboloidToUpperHalfPlane,
    kleinToHyperboloid,
    kleinToPoincare,
    kleinToUpperHalfPlane,
    poincareToHyperboloid,
    poincareToKlein,
    poincareToUpperHalfPlane,
    upperHalfPlaneToHyperboloid,
    upperHalfPlaneToKlein,
    upperHalfPlaneToPoincare,
    uhpCenter,
    geodesicEndpoints
};