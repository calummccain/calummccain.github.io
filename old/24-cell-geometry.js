import * as XXIV from "../data/polychorons/24-cell.js";
import * as GEOM from "./spherical-geometry.js";

function xxivCellGeometry(refinement, cellName, d) {

    var cellFaceDict = XXIV.cellFaceDict;
    var vertexDict = XXIV.vertexDict;

    var octahedron = GEOM.sphericalGeometry(cellName, cellFaceDict, vertexDict, refinement, d, 3);

    return octahedron;
}

export { xxivCellGeometry };