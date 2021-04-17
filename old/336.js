// Order 6 tetrahedral (paracompact)

function d(v) {

    return [
        (5 * v[0] - v[1] - v[2] + v[3]) / 4,
        (3 * v[0] + v[1] - 3 * v[2] + 3 * v[3]) / 4,
        (3 * v[0] - 3 * v[1] + v[2] + 3 * v[3]) / 4,
        (-3 * v[0] + 3 * v[1] + 3 * v[2] + v[3]) / 4
    ];

}

function f(v) {

    return [Math.sqrt(3) * v[0], v[1], v[2], v[3]];

}

const center = [1 / Math.sqrt(3), 0, 0, 0];

export { d, f, center };
