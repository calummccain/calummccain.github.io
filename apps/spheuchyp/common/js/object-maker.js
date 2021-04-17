import * as THREE from "../three-bits/three.module.js";
import * as GM from "../geometries/geometry-maker.js";
import * as EM from "../main/edge-maker.js";

import { tetrahedronData } from "../data/33n.js";
import { octahedronData } from "../data/34n.js";
import { icosahedronData } from "../data/35n.js";
import { cubeData } from "../data/43n.js";
import { dodecahedronData } from "../data/53n.js";
import { hexagonData } from "../data/63n.js";
import { squareData } from "../data/44n.js";
import { triangleData } from "../data/36n.js";
import { pqrData } from "../data/pqr.js";

const geom = {
    "{3,3}": tetrahedronData,
    "{3,4}": octahedronData,
    "{3,5}": icosahedronData,
    "{3,6}": triangleData,
    "{4,3}": cubeData,
    "{4,4}": squareData,
    "{5,3}": dodecahedronData,
    "{6,3}": hexagonData
};

function objectMaker(parameters) {

    const position = parameters.position;

    const [p, q, r] = [parameters.p, parameters.q, parameters.r];

    const name = "{" + p + "," + q + "," + r + "}";

    const data = ((p - 2) * (q - 2) > 4) ? pqrData(p, q, r) : geom["{" + p + "," + q + "}"](r);

    if (parameters.model === "poincare" || parameters.model === "") {

        const shapeGeometry = GM.honeycombGeometry(data, parameters.transform, parameters.refinement, parameters.model);

        const opacity = parameters.opacity || 1;

        if (parameters.faceMode) {

            var faceGroup = new THREE.Group();

            for (var j = 0; j < data.numFaces; j++) {

                var faceMesh = new THREE.Mesh(
                    shapeGeometry[j],
                    new THREE.MeshLambertMaterial({
                        color: new THREE.Color(parameters.colour),
                        opacity: opacity,
                        transparent: true,
                        side: THREE.DoubleSide
                    }));

                faceMesh.position.set(position[0], position[1], position[2]);
                faceMesh.cellName = parameters.transform;
                faceMesh.name = name;
                faceMesh.faceName = data.faceReflections[j];
                faceMesh.parameters = parameters;
                faceMesh.geometry.computeVertexNormals();

                faceGroup.add(faceMesh);

            }

            return faceGroup;

        } else {

            var cellGeometry = new THREE.Geometry();

            for (var j = 0; j < data.numFaces; j++) {

                cellGeometry.merge(shapeGeometry[j]);

            }

            var cellMesh = new THREE.Mesh(
                cellGeometry,
                new THREE.MeshLambertMaterial({
                    color: new THREE.Color(parameters.colour),
                    opacity: opacity,
                    transparent: true,
                    side: THREE.DoubleSide
                }));

            cellMesh.position.set(position[0], position[1], position[2]);
            cellMesh.name = name;
            cellMesh.geometry.computeVertexNormals();

            return cellMesh;

        }

    } else if (parameters.model === "uhp") {

        const cameraLines = (rx, ry, rz, ru, rv, rw, camera) => EM.generateData(
            data, rx, ry, rz, ru, rv, rw, parameters.refinement, parameters.intersection, parameters.invisibleLines, camera, parameters.cells
        );

        return cameraLines;

    }

}

export { objectMaker };