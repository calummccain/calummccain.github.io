const vertices = [
    'a', 'b', 'c', 'd',
    'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p'
];

const vertexDict = {
    'a': [1, 1, 1, 1],
    'b': [1, 1, 1, -1],
    'c': [1, 1, -1, 1],
    'd': [1, 1, -1, -1],
    'e': [1, -1, 1, 1],
    'f': [1, -1, 1, -1],
    'g': [1, -1, -1, 1],
    'h': [1, -1, -1, -1],
    'i': [-1, 1, 1, 1],
    'j': [-1, 1, 1, -1],
    'k': [-1, 1, -1, 1],
    'l': [-1, 1, -1, -1],
    'm': [-1, -1, 1, 1],
    'n': [-1, -1, 1, -1],
    'o': [-1, -1, -1, 1],
    'p': [-1, -1, -1, -1]
};

const lines = [
    'ab', 'ac', 'ae', 'ai', 'bd',
    'bf', 'bj', 'cd', 'cg', 'ck',
    'dh', 'dl', 'ef', 'eg', 'em',
    'fh', 'fn', 'gh', 'go', 'hp',
    'ij', 'ik', 'im', 'jl', 'jn',
    'kl', 'ko', 'lp', 'mn', 'mo',
    'np', 'op'
];

const lineDict = {
    'ab': [2, 2, 2, 0],
    'ac': [2, 2, 0, 2],
    'ae': [2, 0, 2, 2],
    'ai': [0, 2, 2, 2],
    'bd': [2, 2, 0, -2],
    'bf': [2, 0, 2, -2],
    'bj': [0, 2, 2, -2],
    'cd': [2, 2, -2, 0],
    'cg': [2, 0, -2, 2],
    'ck': [0, 2, -2, 2],
    'dh': [2, 0, -2, -2],
    'dl': [0, 2, -2, -2],
    'ef': [2, -2, 2, 0],
    'eg': [2, -2, 0, 2],
    'em': [0, -2, 2, 2],
    'fh': [2, -2, 0, -2],
    'fn': [0, -2, 2, -2],
    'gh': [2, -2, -2, 0],
    'go': [0, -2, -2, 2],
    'hp': [0, -2, -2, -2],
    'ij': [-2, 2, 2, 0],
    'ik': [-2, 2, 0, 2],
    'im': [-2, 0, 2, 2],
    'jl': [-2, 2, 0, -2],
    'jn': [-2, 0, 2, -2],
    'kl': [-2, 2, -2, 0],
    'ko': [-2, 0, -2, 2],
    'lp': [-2, 0, -2, -2],
    'mn': [-2, -2, 2, 0],
    'mo': [-2, -2, 0, 2],
    'np': [-2, -2, 0, -2],
    'op': [-2, -2, -2, 0]
};

const faces = [
    'abcd', 'abef', 'abij',
    'aceg', 'acik', 'aeim',
    'bdfh', 'bdjl', 'bfjn',
    'cdgh', 'cdkl', 'cgko',
    'dhlp', 'efgh', 'efmn',
    'egmo', 'fhnp', 'ghop',
    'ijkl', 'ijmn', 'ikmo',
    'jlnp', 'klop', 'mnop'
];

const faceDict = {
    'abcd': [4, 4, 0, 0],
    'abef': [4, 0, 4, 0],
    'abij': [0, 4, 4, 0],
    'aceg': [4, 0, 0, 4],
    'acik': [0, 4, 0, 4],
    'aeim': [0, 0, 4, 4],
    'bdfh': [4, 0, 0, -4],
    'bdjl': [0, 4, 0, -4],
    'bfjn': [0, 0, 4, -4],
    'cdgh': [4, 0, -4, 0],
    'cdkl': [0, 4, -4, 0],
    'cgko': [0, 0, -4, 4],
    'dhlp': [0, 0, -4, -4],
    'efgh': [4, -4, 0, 0],
    'efmn': [0, -4, 4, 0],
    'egmo': [0, -4, 0, 4],
    'fhnp': [0, -4, 0, -4],
    'ghop': [0, -4, -4, 0],
    'ijkl': [-4, 4, 0, 0],
    'ijmn': [-4, 0, 4, 0],
    'ikmo': [-4, 0, 0, 4],
    'jlnp': [-4, 0, 0, -4],
    'klop': [-4, 0, -4, 0],
    'mnop': [-4, -4, 0, 0]
};

const faceCellDict = {
    'abcd': ['abcdefgh', 'abcdijkl'],
    'abef': ['abcdefgh', 'abefijmn'],
    'abij': ['abcdijkl', 'abefijmn'],
    'aceg': ['abcdefgh', 'acegikmo'],
    'acik': ['abcdijkl', 'acegikmo'],
    'aeim': ['abefijmn', 'acegikmo'],
    'bdfh': ['abcdefgh', 'bdfhjlnp'],
    'bdjl': ['abcdijkl', 'bdfhjlnp'],
    'bfjn': ['abefijmn', 'bdfhjlnp'],
    'cdgh': ['abcdefgh', 'cdghklop'],
    'cdkl': ['abcdijkl', 'cdghklop'],
    'cgko': ['acegikmo', 'cdghklop'],
    'dhlp': ['bdfhjlnp', 'cdghklop'],
    'efgh': ['abcdefgh', 'efghmnop'],
    'efmn': ['abefijmn', 'efghmnop'],
    'egmo': ['acegikmo', 'efghmnop'],
    'fhnp': ['bdfhjlnp', 'efghmnop'],
    'ghop': ['cdghklop', 'efghmnop'],
    'ijkl': ['abcdijkl', 'ijklmnop'],
    'ijmn': ['abefijmn', 'ijklmnop'],
    'ikmo': ['acegikmo', 'ijklmnop'],
    'jlnp': ['bdfhjlnp', 'ijklmnop'],
    'klop': ['cdghklop', 'ijklmnop'],
    'mnop': ['efghmnop', 'ijklmnop']
};

const cells = [
    'abcdefgh',
    'abcdijkl',
    'abefijmn',
    'acegikmo',
    'bdfhjlnp',
    'cdghklop',
    'efghmnop',
    'ijklmnop'
];

const cellDict = {
    'abcdefgh': [8, 0, 0, 0],
    'abcdijkl': [0, 8, 0, 0],
    'abefijmn': [0, 0, 8, 0],
    'acegikmo': [0, 0, 0, 8],
    'bdfhjlnp': [0, 0, 0, -8],
    'cdghklop': [0, 0, -8, 0],
    'efghmnop': [0, -8, 0, 0],
    'ijklmnop': [-8, 0, 0, 0]
};

const cellFaceDict = {
    'abcdefgh': ['abcd', 'abef', 'aceg', 'bdfh', 'cdgh', 'efgh'],
    'abcdijkl': ['abcd', 'abij', 'acik', 'bdjl', 'cdkl', 'ijkl'],
    'abefijmn': ['abef', 'abij', 'aeim', 'bfjn', 'efmn', 'ijmn'],
    'acegikmo': ['aceg', 'acik', 'aeim', 'cgko', 'egmo', 'ikmo'],
    'bdfhjlnp': ['bdfh', 'bdjl', 'bfjn', 'dhlp', 'fhnp', 'jlnp'],
    'cdghklop': ['cdgh', 'cdkl', 'cgko', 'dhlp', 'ghop', 'klop'],
    'efghmnop': ['efgh', 'efmn', 'egmo', 'fhnp', 'ghop', 'mnop'],
    'ijklmnop': ['ijkl', 'ijmn', 'ikmo', 'jlnp', 'klop', 'mnop']
};

function distance(x, y) {
    var d = (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2 + (x[3] - y[3]) ** 2;
    return d;
}

function scaleQuaternion(x, s) {
    return [x[0] * s, x[1] * s, x[2] * s, x[3] * s];
}

function sumQuaternions(m) {
    var v = [];
    for (var i = 0; i < 4; i++) {
        v[i] = 0;
        for (var j = 0; j < m.length; j++) {
            v[i] += m[j][i];
        }
    }
    return v;
}

function findLines(l) {
    var lines = [];
    var linesDict = {};
    for (var i = 0; i < 16; i++) {
        for (var j = i + 1; j < 16; j++) {
            if (Math.abs(distance(vertexDict[vertices[i]], vertexDict[vertices[j]]) - l) < 0.001) {
                lines.push(vertices[i] + vertices[j]);
                linesDict[vertices[i] + vertices[j]] = sumQuaternions([vertexDict[vertices[i]], vertexDict[vertices[j]]]);
            }
        }
    }
    return [lines, linesDict];
}

//const countOccurrences = (arr, val) => arr.reduce((a, v) => (Math.abs(v) === val ? a + 1 : a), 0);

function findFaces() {
    var faces = [];
    var faceDict = {};
    for (var i = 0; i < 32; i++) {
        for (var j = i + 1; j < 32; j++) {
            if (lines[i][1] < lines[j][0]) {
                var mid = sumQuaternions([lineDict[lines[i]], lineDict[lines[j]]]);
                if (countOccurrences(mid, 0) == 2 && countOccurrences(mid, 4) == 2) {
                    faces.push(lines[i] + lines[j]);
                    faceDict[lines[i] + lines[j]] = mid;
                }
            }
        }
    }
    return [faces, faceDict];
}

function findCells() {
    var cells = [];
    var cellDict = {};
    for (var i = 0; i < 24; i++) {
        for (var j = i + 1; j < 24; j++) {
            if (faces[i][3] < faces[j][0]) {
                var mid = sumQuaternions([faceDict[faces[i]], faceDict[faces[j]]]);
                if (countOccurrences(mid, 0) == 3 && countOccurrences(mid, 8) == 1) {
                    cells.push(faces[i] + faces[j]);
                    cellDict[faces[i] + faces[j]] = mid;
                }
            }
        }
    }
    return [cells, cellDict];
}

function cellFaces() {
    var cellFaceDict = {}
    for (var l = 0; l < 8; l++) {
        var cell = cells[l];
        var cf = []
        for (var i = 0; i < 8; i++) {
            for (var j = i + 1; j < 8; j++) {
                for (var k = j + 1; k < 8; k++) {
                    for (var m = k + 1; m < 8; m++) {
                        var face = cell[i] + cell[j] + cell[k] + cell[m];
                        if (faces.includes(face)) {
                            cf.push(face);
                        }
                    }
                }
            }
        }
        cellFaceDict[cell] = cf;
    }
    return cellFaceDict;
}

function findFaceCells() {
    var faceCellDict = {};

    for (var i = 0; i < 24; i++) {
        var cell = [];
        for (var j = 0; j < 8; j++) {
            if (cellFaceDict[cells[j]].includes(faces[i])) {
                cell.push(cells[j]);
            }
        }
        faceCellDict[faces[i]] = cell;
    }
    return faceCellDict
}

//console.log(findFaceCells());
//console.log('abc'.includes('a'));
//console.log(findFaces());
//console.log(cellFaces());

export { vertices, vertexDict, lines, lineDict, faces, faceDict, faceCellDict, cells, cellDict, cellFaceDict };