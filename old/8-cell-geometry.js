import * as VIII from "../data/polychorons/8-cell.js";
import * as GEOM from "./spherical-geometry.js";

function viiiCellGeometry(refinement, cellName, d) {

    var cellFaceDict = VIII.cellFaceDict;
    var vertexDict = VIII.vertexDict;

    var cube = GEOM.sphericalGeometry(cellName, cellFaceDict, vertexDict, refinement, d, 4);

    return cube;
}

export { viiiCellGeometry };