import * as VF from "./vector-functions.js";
import { hyperToStereoEps } from "../eps.js";

// ========================================================
// Stereographic projection from the hypersphere
// 
// Inputs: point
// Output: (x1/(1-x0), x2/(1-x0), x3/(1-x0))
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function hyperToStereo(point) {

    if (Math.abs(point[0] - 1) < hyperToStereoEps) {

        return [point[1], point[2], point[3]];

    } else {

        var scale = 1 / (1 - point[0]);
        return [point[1] * scale, point[2] * scale, point[3] * scale];

    }

}

// ========================================================
// Converts from stereographic projection to hypersphere
// 
// Inputs: point
// Output: ((r-1)/(r+1), 2 x1/(r+1), 2 x2/(r+1), 2 x3/(r+1))
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function stereoToHyper(point) {

    const r2 = VF.vectorDot(point, point);
    const denom = 1 / (r2 + 1);

    return [(r2 - 1) * denom, 2 * point[0] * denom, 2 * point[1] * denom, 2 * point[2] * denom];

}

// ========================================================
// Converts from hypersphere projection to klein
// 
// Inputs: point
// Output: (x1/x0, x2/x0, x3/x0)
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function hyperToKlein(point) {

    const denom = 1 / point[0];

    return [point[1] * denom, point[2] * denom, point[3] * denom];

}

export { hyperToStereo, stereoToHyper, hyperToKlein };