// Order 4 octahedral

function d(v) {

    return [
        2 * v[0] - v[1] - v[2] - v[3],
        v[0] - v[2] - v[3],
        v[0] - v[1] - v[3],
        v[0] - v[1] - v[2]
    ];

}

function f(v) {

    return [v[0], v[1], v[2], v[3]];

}

const center = [1, 0, 0, 0];

export { d, f, center };