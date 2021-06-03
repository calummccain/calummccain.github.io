// ========================================================
// Geometry/compactness decider
// 
// Inputs: n = geometry order: {*,*,n}
//         e = euclidean boundary
//         p = paracmpact boundary
// Output: Geometry & compactness
//
//     u   p   h   e   s
// |       |       |       |
// |-------|-------|-------|
// |       |       |       |
// 0       p       e     PI/2
// INF                     2
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

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

// ========================================================
// Determines type of cell
// 
// Inputs: p, q, r
// Output: "s"/"e"/"h"/"p"/"u"
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function typeOfCell(p, q, r) {

    const name = p + "-" + q + "-" + r;

    if (["3-3-3", "3-3-4", "3-3-5", "3-4-3", "4-3-3", "5-3-3"].includes(name)) {

        return "s";

    } else if (name === "4-3-4") {

        return "e";

    } else {

        const qr = (q - 2) * (r - 2);

        if (qr < 4) {

            return "h"

        } else if (qr == 4) {

            return "p"

        } else {

            return "u"

        }

    }

}

export { boundaries, typeOfCell };