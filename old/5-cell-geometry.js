import * as V from "../js/data/polychorons/5-cell.js";
import * as GEOM from "../js/geometries/spherical-geometry.js";

function vCellGeometry(refinement, cellName, d) {

    var cellFaceDict = V.cellFaceDict;
    var vertexDict = V.vertexDict;

    var tetrahedron = GEOM.sphericalGeometry(cellName, cellFaceDict, vertexDict, refinement, d, 3);

    return tetrahedron;
}

export { vCellGeometry };