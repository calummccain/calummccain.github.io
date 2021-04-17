import {p} from "../constants.js";

const vertices = [
    'a', 'b', 'c', 'd', 'e'
];

// const vertexDict = {
//     'a': [1 / Math.sqrt(10), 1 / Math.sqrt(6), 1 / Math.sqrt(3), 1],
//     'b': [1 / Math.sqrt(10), 1 / Math.sqrt(6), 1 / Math.sqrt(3), -1],
//     'c': [1 / Math.sqrt(10), 1 / Math.sqrt(6), -2 / Math.sqrt(3), 0],
//     'd': [1 / Math.sqrt(10), -Math.sqrt(3 / 2), 0, 0],
//     'e': [-2 * Math.sqrt(2 / 5), 0, 0, 0]
// };

const vertexDict = {
    'a': [-1 / Math.sqrt(5), 1, 1, 1],
    'b': [-1 / Math.sqrt(5), 1, -1, -1],
    'c': [-1 / Math.sqrt(5), -1, 1, -1],
    'd': [-1 / Math.sqrt(5), -1, -1, 1],
    'e': [Math.sqrt(5) - 1 / Math.sqrt(5), 0, 0, 0]
};


const lines = [
    'ab', 'ac', 'ad', 'ae',
    'bc', 'bd', 'be',
    'cd', 'ce',
    'de'
];

const lineDict = {
};

const faces = [
    'abc', 'abd', 'abe',
    'acd', 'ace',
    'ade',
    'bcd', 'bce',
    'bde',
    'cde'
];

const faceDict = {
};

const faceCellDict = {
    'abc': ['abcd', 'abce'], 
    'abd': ['abcd', 'abde'], 
    'abe': ['abce', 'abde'],
    'acd': ['abcd', 'acde'], 
    'ace': ['abce', 'acde'],
    'ade': ['abde', 'acde'],
    'bcd': ['abcd', 'bcde'], 
    'bce': ['abce', 'bcde'],
    'bde': ['abde', 'bcde'],
    'cde': ['acde', 'bcde']
};

const cells = [
    'abcd',
    'abce',
    'abde',
    'acde',
    'bcde'
];

const cellDict = {
};

const cellFaceDict = {
    'abcd': ['abc', 'abd', 'acd', 'bcd'],
    'abce': ['abc', 'abe', 'ace', 'bce'],
    'abde': ['abd', 'abe', 'ade', 'bde'],
    'acde': ['acd', 'ace', 'ade', 'cde'],
    'bcde': ['bcd', 'bce', 'bde', 'cde']
};

export { vertices, vertexDict, lines, lineDict, faces, faceDict, faceCellDict, cells, cellDict, cellFaceDict };