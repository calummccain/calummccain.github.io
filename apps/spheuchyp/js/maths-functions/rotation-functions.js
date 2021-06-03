// ========================================================
// Rotation about the yz plane
// 
// Inputs: v, theta
// Output: 
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function rx(v, theta) {

    const c = Math.cos(theta);
    const s = Math.sin(theta);

    return [v[0], v[1], c * v[2] - s * v[3], s * v[2] + c * v[3]];

}

// ========================================================
// Rotation about the xz plane
// 
// Inputs: v, theta
// Output: 
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function ry(v, theta) {

    const c = Math.cos(theta);
    const s = Math.sin(theta);

    return [v[0], c * v[1] - s * v[3], v[2], s * v[1] + c * v[3]];

}

// ========================================================
// Rotation about the xy plane
// 
// Inputs: v, theta
// Output: 
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function rz(v, theta) {

    const c = Math.cos(theta);
    const s = Math.sin(theta);

    return [v[0], c * v[1] - s * v[2], s * v[1] + c * v[2], v[3]];

}

// ========================================================
// Rotation about the wx plane
// 
// Inputs: v, theta, metric
// Output: 
//
// Change history:
//     ??/??/?? Initial commit
//     03/06/21 Fixed euclidean bug
//=========================================================

function ru(v, theta, metric) {

    if (metric === "s") {

        const c = Math.cos(theta);
        const s = Math.sin(theta);

        return [c * v[0] - s * v[1], s * v[0] + c * v[1], v[2], v[3]];

    } else if (metric === "e") {

        return [v[0], v[1] + theta, v[2], v[3]];

    } else if (metric === "h" || metric === "p" || metric === "u") {

        const c = Math.cosh(theta);
        const s = Math.sinh(theta);

        return [c * v[0] + s * v[1], s * v[0] + c * v[1], v[2], v[3]];

    }

}

// ========================================================
// Rotation about the wy plane
// 
// Inputs: v, theta, metric
// Output: 
//
// Change history:
//     ??/??/?? Initial commit
//     03/06/21 Fixed euclidean bug
//=========================================================

function rv(v, theta, metric) {

    if (metric === "s") {

        const c = Math.cos(theta);
        const s = Math.sin(theta);

        return [c * v[0] - s * v[2], v[1], s * v[0] + c * v[2], v[3]];

    } else if (metric === "e") {

        return [v[0], v[1], v[2] + theta, v[3]];

    } else if (metric === "h" || metric === "p" || metric === "u") {

        const c = Math.cosh(theta);
        const s = Math.sinh(theta);

        return [c * v[0] + s * v[2], v[1], s * v[0] + c * v[2], v[3]];

    }

}

// ========================================================
// Rotation about the wz plane
// 
// Inputs: v, theta, metric
// Output: 
//
// Change history:
//     ??/??/?? Initial commit
//     03/06/21 Fixed euclidean bug
//=========================================================

function rw(v, theta, metric) {

    if (metric === "s") {

        const c = Math.cos(theta);
        const s = Math.sin(theta);

        return [c * v[0] - s * v[3], v[1], v[2], s * v[0] + c * v[3]];

    } else if (metric === "e") {

        return [v[0], v[1], v[2], v[3] + theta];

    } else if (metric === "h" || metric === "p" || metric === "u") {

        const c = Math.cosh(theta);
        const s = Math.sinh(theta);

        return [c * v[0] + s * v[3], v[1], v[2], s * v[0] + c * v[3]];

    }

}

// ========================================================
// 
// 
// Inputs:
// Output: 
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function rxyz(v, x, y, z) {

    return rx(ry(rz(v, z), y), x);

}

// ========================================================
// 
// 
// Inputs: 
// Output: 
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function ruvw(vector, u, v, w, metric) {

    return ru(rv(rw(vector, w, metric), v, metric), u, metric);

}

export { rx, ry, rz, rxyz, ru, rv, rw, ruvw };