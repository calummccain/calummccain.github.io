function rx(v, theta) {

    const c = Math.cos(theta);
    const s = Math.sin(theta);

    return [v[0], v[1], c * v[2] - s * v[3], s * v[2] + c * v[3]];

}

function ry(v, theta) {

    const c = Math.cos(theta);
    const s = Math.sin(theta);

    return [v[0], c * v[1] - s * v[3], v[2], s * v[1] + c * v[3]];

}

function rz(v, theta) {

    const c = Math.cos(theta);
    const s = Math.sin(theta);

    return [v[0], c * v[1] - s * v[2], s * v[1] + c * v[2], v[3]];

}

function ru(v, theta, metric) {

    if (metric === "s") {

        const c = Math.cos(theta);
        const s = Math.sin(theta);

        return [c * v[0] - s * v[1], s * v[0] + c * v[1], v[2], v[3]];

    } else if (metric === "e") {

        return [v[0] - theta * v[1], theta * v[0] + v[1], v[2], v[3]];

    } else if (metric === "h" || metric === "p" || metric === "u") {

        const c = Math.cosh(theta);
        const s = Math.sinh(theta);

        return [c * v[0] + s * v[1], s * v[0] + c * v[1], v[2], v[3]];

    }

}

function rv(v, theta, metric) {

    if (metric === "s") {

        const c = Math.cos(theta);
        const s = Math.sin(theta);

        return [c * v[0] - s * v[2], v[1], s * v[0] + c * v[2], v[3]];

    } else if (metric === "e") {

        return [v[0] + theta * v[2], v[1], theta * v[0] + v[2], v[3]];

    } else if (metric === "h" || metric === "p" || metric === "u") {

        const c = Math.cosh(theta);
        const s = Math.sinh(theta);

        return [c * v[0] + s * v[2], v[1], s * v[0] + c * v[2], v[3]];

    }

}

function rw(v, theta, metric) {

    if (metric === "s") {

        const c = Math.cos(theta);
        const s = Math.sin(theta);

        return [c * v[0] - s * v[3], v[1], v[2], s * v[0] + c * v[3]];

    } else if (metric === "e") {

        return [v[0] + theta * v[3], v[1], v[2], theta * v[0] + v[3]];

    } else if (metric === "h" || metric === "p" || metric === "u") {

        const c = Math.cosh(theta);
        const s = Math.sinh(theta);

        return [c * v[0] + s * v[3], v[1], v[2], s * v[0] + c * v[3]];

    }

}

function rxyz(v, x, y, z) {

    return rx(ry(rz(v, z), y), x);

}

function ruvw(vector, u, v, w, metric) {

    return ru(rv(rw(vector, w, metric), v, metric), u, metric);

}

export { rx, ry, rz, rxyz, ru, rv, rw, ruvw };