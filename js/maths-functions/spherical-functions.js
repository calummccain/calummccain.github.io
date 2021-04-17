import * as VF from "./vector-functions.js";

//performs the stereographic projection
function hyperToStereo(point) {

    const tol = 1e-4;

    if (Math.abs(point[0] - 1) < tol) {

        return [point[1], point[2], point[3]];

    } else {

        var scale = 1 / (1 - point[0]);
        return [point[1] * scale, point[2] * scale, point[3] * scale];

    }

}

function stereoToSphere(point) {

    const r2 = VF.vectorDot(point, point);
    const denom = 1 / (r2 + 1);

    return [(r2 - 1) * denom, 2 * point[0] * denom, 2 * point[1] * denom, 2 * point[2] * denom];

}

function hyperToKlein(point) {

    const denom = 1 / point[0];

    return [point[1] * denom, point[2] * denom, point[3] * denom];

}

export { hyperToStereo, stereoToSphere, hyperToKlein };