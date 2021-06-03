import * as THREE from "../three-bits/three.module.js";
import * as GM from "../geometries/geometry-maker.js";

import * as SW from "../wireframes/spherical-wireframe.js";
import * as EW from "../wireframes/euclidean-wireframe.js";
import * as HW from "../wireframes/hyperbolic-wireframe.js";

import { tetrahedronData } from "../data/33n.js";
import { octahedronData } from "../data/34n.js";
import { icosahedronData } from "../data/35n.js";
import { triangleData } from "../data/36n.js";
import { cubeData } from "../data/43n.js";
import { squareData } from "../data/44n.js";
import { dodecahedronData } from "../data/53n.js";
import { hexagonData } from "../data/63n.js";
import { pqrData } from "../data/pqr.js";

import { tetrahedronTruncData } from "../data/t33n.js";
import { tetrahedronRectData } from "../data/r33n.js";

import { octahedronTruncData } from "../data/t34n.js";
import { octahedronRectData } from "../data/r34n.js";

import { icosahedronTruncData } from "../data/t35n.js";
import { icosahedronRectData } from "../data/r35n.js";

import { cubeTruncData } from "../data/t43n.js";
import { cubeRectData } from "../data/r43n.js";

import { dodecahedronTruncData } from "../data/t53n.js";
import { dodecahedronRectData } from "../data/r53n.js";


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

    const geomRect = {
        "{3,3}": tetrahedronRectData,
        "{3,4}": octahedronRectData,
        "{3,5}": icosahedronRectData,
        "{4,3}": cubeRectData,
        "{5,3}": dodecahedronRectData
    }

    const position = parameters.position;
    const [p, q, r] = [parameters.p, parameters.q, parameters.r];
    const name = "{" + p + "," + q + "," + r + "}";
    var data;

    if (parameters.modifier === "") {

        data = ((p - 2) * (q - 2) > 4) ? pqrData(p, q, r, parameters.numFaces) : geom["{" + p + "," + q + "}"](r);

    } else if (parameters.modifier === "r") {

        data = geomRect["{" + p + "," + q + "}"](r);

    } else if (parameters.modifier === "t") {

        data = geomTrunc["{" + p + "," + q + "}"](r);

    }

    if (parameters.model === "solid") {

        const shapeGeometry = GM.honeycombGeometry(data, parameters.transform, parameters.refinement, parameters.hyperbolicModel);

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

    } else if (parameters.model === "wireframe") {

        if (data.metric === "s") {

            return (rx, ry, rz, ru, rv, rw, camera) => SW.sphericalEdges(data, {
                cells: parameters.cells,
                angles: [rx, ry, rz, ru, rv, rw],
                number: 50,
                camera: camera,
                width: 2,
            });

        } else if (data.metric === "e") {

            return (rx, ry, rz, ru, rv, rw, camera) => EW.euclideanEdges(data, {
                cells: parameters.cells,
                angles: [rx, ry, rz, ru, rv, rw],
                number: 50,
                camera: camera,
                width: 2,
            });

        } else if (data.metric === "h" || data.metric === "p" || data.metric === "u") {

            return (rx, ry, rz, ru, rv, rw, camera) => HW.hyperbolicEdges(data, {
                cells: parameters.cells,
                angles: [rx, ry, rz, ru, rv, rw],
                number: 50,
                camera: camera,
                width: 2,
                invisibleLines: parameters.invisibleLines,
                model: parameters.model
            });

        }

    }

}

export { objectMaker };