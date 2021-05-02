import * as THREE from "../three-bits/three.module.js";
import * as GM from "../geometries/geometry-maker.js";
import * as EM from "../main/edge-maker.js";

import { tetrahedronData } from "./data/33n.js";
import { octahedronData } from "./data/34n.js";
import { icosahedronData } from "./data/35n.js";
import { triangleData } from "./data/36n.js";
import { cubeData } from "./data/43n.js";
import { squareData } from "./data/44n.js";
import { dodecahedronData } from "./data/53n.js";
import { hexagonData } from "./data/63n.js";
import { pqrData } from "./data/pqr.js";

import { tetrahedronTruncData } from "./data/33nt.js";
import { octahedronTruncData } from "./data/34nt.js";
import { icosahedronTruncData } from "./data/35nt.js";
import { cubeTruncData } from "./data/43nt.js";
import { dodecahedronTruncData } from "./data/53nt.js";


function objectMaker(parameters) {

    const geom = {
        "{3,3}": tetrahedronData,
        "{3,4}": octahedronData,
        "{3,5}": icosahedronData,
        "{3,6}": (r) => triangleData(r, parameters.numFaces),
        "{4,3}": cubeData,
        "{4,4}": (r) => squareData(r, parameters.numFaces),
        "{5,3}": dodecahedronData,
        "{6,3}": (r) => hexagonData(r, parameters.numFaces),
    };

    const geomTrunc = {
        "{3,3}": tetrahedronTruncData,
        "{3,4}": octahedronTruncData,
        "{3,5}": icosahedronTruncData,
        "{4,3}": cubeTruncData,
        "{5,3}": dodecahedronTruncData
    }

    const position = parameters.position;
    const [p, q, r] = [parameters.p, parameters.q, parameters.r];
    const name = "{" + p + "," + q + "," + r + "}";
    var data;

    if (!parameters.truncated) {

        data = ((p - 2) * (q - 2) > 4) ? pqrData(p, q, r, parameters.numFaces) : geom["{" + p + "," + q + "}"](r);

    } else {

        data = geomTrunc["{" + p + "," + q + "}"](r);

    }

    if (parameters.model === "poincare" || parameters.model === "") {

        const shapeGeometry = GM.honeycombGeometry(data, parameters.transform, parameters.refinement, parameters.model);

        const opacity = parameters.opacity || 1;

        var material;

        if (parameters.shader === "toon") {

            const colors = new Uint8Array(parameters.slices);

            for (let c = 0; c <= colors.length; c++) {

                colors[c] = 128 * (c / colors.length) + 128;

            }

            const gradientMap = new THREE.DataTexture(colors, colors.length, 1, THREE.LuminanceFormat);
            gradientMap.minFilter = THREE.NearestFilter;
            gradientMap.magFilter = THREE.NearestFilter;
            gradientMap.generateMipmaps = false;

            material = new THREE.MeshToonMaterial({
                color: new THREE.Color(parameters.colour),
                // opacity: opacity,
                // transparent: true,
                side: THREE.DoubleSide,
                gradientMap: gradientMap
            })

        } else {

            material = new THREE.MeshLambertMaterial({
                color: new THREE.Color(parameters.colour),
                opacity: opacity,
                transparent: true,
                side: THREE.DoubleSide
            })

        }

        if (parameters.faceMode) {

            var faceGroup = new THREE.Group();
            var faceMesh;

            for (var j = 0; j < data.numFaces; j++) {

                faceMesh = new THREE.Mesh(shapeGeometry[j], material);

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

            var cellMesh = new THREE.Mesh(cellGeometry, material);

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