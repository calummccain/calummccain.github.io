function matrixDict(data) {

    return (letter, vector) => {
        
        if (letter === "a") {

            return data.a(vector)

        } else if (letter === "b") {

            return data.b(vector)

        } else if (letter === "c") {

            return data.c(vector)

        } else if (letter === "d") {

            return data.d(vector)

        } else if (letter === "e") {

            return data.e(vector)

        } else if (letter === "f") {

            return data.f(vector)

        } else {

            throw 'letter needs to be one of a, b, c, d, e, f!';

        }

    }

}

export { matrixDict };