// order 4 dodecahedral (compact)

import { p } from "../js/data/constants.js";

function d(v) {

    return [
        p ** 2 * v[0] - v[1] - v[3] / p,
        p ** 3 * v[0] - p * v[1] - p * v[3],
        v[2],
        p ** 2 * v[0] - p * v[1]
    ];

}

function f(v) {

    return [p ** 2 / Math.sqrt(2) * v[0], Math.sqrt(p / 2) * v[1], Math.sqrt(p / 2) * v[2], Math.sqrt(p / 2) * v[3]];

}

const center = [Math.sqrt(2) / (p ** 2), 0, 0, 0];

export { d, f, center };