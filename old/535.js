// order 5 dodecahedral (compact)

import { p } from "../js/data/constants.js";

function d(v) {

    return [
        ((4 * p + 1) * v[0] - (4 * p - 1) / p * v[1] - (4 * p - 1) / (p ** 2) * v[3]) / 2,
        (p ** 5 * v[0] + (2 - p ** 4) * v[1] - p ** 3 * v[3]) / 2,
        v[2],
        (p ** 4 * v[0] - p ** 3 * v[1] - v[3] / p) / 2
    ];

}

function f(v) {

    return [(p ** 4) / 2 * v[0], p * Math.sqrt(4 * p - 1) / 2 * v[1], p * Math.sqrt(4 * p - 1) / 2 * v[2], p * Math.sqrt(4 * p - 1) / 2 * v[3]];

}

const center = [2 / (p ** 4), 0, 0, 0];

export { d, f, center };