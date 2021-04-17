// Order 5 icosahedral (compact)

import { p } from "../constants.js";

function d(v) {
    return [
        ((p ** 4 - 1) * v[0] - ((p ** 4) - 3) / p * v[2] - ((p ** 4) - 3) / (p ** 3) * v[3]) / 2,
        v[1],
        ((p ** 5) * v[0] + (2 - (p ** 4)) * v[2] - p ** 2 * v[3]) / 2,
        ((p ** 3) * v[0] - (p ** 2) * v[2] + v[3]) / 2
    ];
}

function f(v) {
    return [
        ((p ** 3) / 2) * v[0],
        (Math.sqrt(3 * p - 1) / 2) * v[1],
        (Math.sqrt(3 * p - 1) / 2) * v[2],
        (Math.sqrt(3 * p - 1) / 2) * v[3]
    ];
}

const center = [2 / (p ** 3), 0, 0, 0];

export { d, f, center };