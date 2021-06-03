// ========================================================
// Given two endpoints, generate the hyperbolic geodesic
// between them
// 
// Inputs: a, b, number
// Output: array of intermediary points
//
// Change history:
//     18/05/21 Initial commit
//     23/05/21 Added VF and updates inputs
//              Returns both poincare and upper half plane
//              geodesics as a dictionary
//=========================================================

import * as HF from "./hyperbolic-functions.js";
import * as VF from "./vector-functions.js";

const eps = 1e-4;

function hyperbolicGeodesic(p1, p2, number) {

    var edgePoincare = [];
    var edgeUpperHalfPlane = [];
    var p;

    if (Math.abs(HF.hyperbolicNorm(p1.hyperboloid)) < eps && Math.abs(HF.hyperbolicNorm(p2.hyperboloid)) < eps) {

        const denom = 1 / Math.sqrt(Math.abs(2 * HF.hyperboloidInnerProduct(p1.hyperboloid, p2.hyperboloid)));
        const delta = 10 / number;
        var theta = -5;
        var ratios = [];

        for (var i = 0; i <= number; i++) {

            ratios.push(Math.exp(theta) * denom);
            theta += delta;

        }

        for (var i = 0; i <= number; i++) {

            p = VF.vectorSum([VF.vectorScale(p1.hyperboloid, ratios[i]), VF.vectorScale(p2.hyperboloid, ratios[number - i])]);

            edgePoincare.push(HF.hyperboloidToPoincare(p));
            edgeUpperHalfPlane.push(HF.hyperboloidToUpperHalfPlane(p));

        }

    } else if (Math.abs(HF.hyperbolicNorm(p1.hyperboloid)) < eps || Math.abs(HF.hyperbolicNorm(p2.hyperboloid)) < eps) {

        const denom = 1 / HF.hyperboloidInnerProduct(p1.hyperboloid, p2.hyperboloid);
        const delta = 10 / number;
        var theta = 0;
        var ratios1 = [];
        var ratios2 = [];

        for (var i = 0; i <= number; i++) {

            ratios1.push(Math.exp(-theta));
            ratios2.push(Math.sinh(theta) * denom)
            theta += delta;

        }

        var a, b;

        if (Math.abs(HF.hyperbolicNorm(p1.hyperboloid)) < eps) {

            a = p2;
            b = p1;

        } else {

            a = p1;
            b = p2;

        }

        for (var i = 0; i <= number; i++) {

            p = VF.vectorSum([VF.vectorScale(a.hyperboloid, ratios1[i]), VF.vectorScale(b.hyperboloid, ratios2[i])]);

            edgePoincare.push(HF.hyperboloidToPoincare(p));
            edgeUpperHalfPlane.push(HF.hyperboloidToUpperHalfPlane(p));

        }

    } else {

        const ca = HF.hyperboloidInnerProduct(p1.hyperboloid, p2.hyperboloid);
        const an = Math.acosh(ca) / number;
        const denom = 1 / Math.sqrt(ca * ca - 1);
        var theta = 0;
        var ratios = [];

        for (var i = 0; i <= number; i++) {

            ratios.push(Math.sinh(theta) * denom);
            theta += an;

        }

        for (var i = 0; i <= number; i++) {

            p = VF.vectorSum([VF.vectorScale(p1.hyperboloid, ratios[i]), VF.vectorScale(p2.hyperboloid, ratios[number - i])]);

            edgePoincare.push(HF.hyperboloidToPoincare(p));
            edgeUpperHalfPlane.push(HF.hyperboloidToUpperHalfPlane(p));

        }

    }

    return { poincare: edgePoincare, uhp: edgeUpperHalfPlane };

}

export { hyperbolicGeodesic };