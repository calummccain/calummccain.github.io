
// Rough guide to what this calculates
//     u   p   h   e   s
// |       |       |       |
// |-------|-------|-------|
// |       |       |       |
// 0       p       e     PI/2
// INF                     2

function boundaries(n, e, p) {

    if (n <= 2) {

        return "error";

    } else if (n < e) {

        return "s";

    } else if (n == e) {

        return "e";

    } else if (n < p) {

        return "h";

    } else if (n == p) {

        return "p";

    } else {

        return "u";

    }

}

export { boundaries };