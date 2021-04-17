import * as THREE from "../js/three-bits/three.module.js";
import * as GM from "../js/geometries/geometry-maker.js";

function addCellToGroup(params) {

    var data = params.data;
    var group = params.group;
    var refinement = params.refinement || 3;
    var opacityValue = params.opacity || 1;
    var transform = params.transform || "";
    // var colour = params.colour || "#" + Math.floor(Math.random() * 16777215).toString(16);
    var colour = params.colour; 
    var position = params.position || [0, 0, 0];
    var name = params.name || "";
    var faceMode = params.faceMode || false;
    var model = params.model || "";

    var shapeGeometry;

    shapeGeometry = GM.honeycombGeometry(data, transform, refinement, model);

    // faceMode keeps the faces as seperate meshes (and hence seperate objects)
    // without faceMode the polyhedron is made as one mesh/object and the individual faces cannot be selected by ray-casting
    if (faceMode) {

        const col = new THREE.Color().setHSL(Math.random(), 0.5, Math.random() * 0.5 + 0.1);

        for (var j = 0; j < data.numFaces; j++) {

            if (colour === "normal") {

                shapeGeometry[j].computeVertexNormals();
                var faceMesh = new THREE.Mesh(
                    shapeGeometry[j],
                    new THREE.MeshNormalMaterial({
                        side: THREE.DoubleSide
                    }));

            } else {

                var faceMesh = new THREE.Mesh(
                    shapeGeometry[j],
                    new THREE.MeshLambertMaterial({
                        color: new THREE.Color(colour),
                        // color: col,
                        opacity: opacityValue,
                        transparent: true,
                        side: THREE.DoubleSide
                    }));

            }

            faceMesh.position.set(position[0], position[1], position[2]);
            faceMesh.cellName = transform;
            faceMesh.name = name;
            faceMesh.faceName = data.faceReflections[j];
            faceMesh.params = params;
            faceMesh.geometry.computeVertexNormals();

            group.add(faceMesh);

        }

    } else {

        var cellGeometry = new THREE.Geometry();

        for (var j = 0; j < data.numFaces; j++) {

            cellGeometry.merge(shapeGeometry[j]);

        }

        if (colour === "normal") {

            var cellMesh = new THREE.Mesh(
                cellGeometry,
                new THREE.MeshNormalMaterial({
                    side: THREE.DoubleSide
                }));

        } else {

            var cellMesh = new THREE.Mesh(
                cellGeometry,
                new THREE.MeshLambertMaterial({
                    color: new THREE.Color(colour),
                    //color: new THREE.Color().setHSL(Math.random(), 0.5, Math.random() * 0.5 + 0.1),
                    opacity: opacityValue,
                    transparent: true,
                    side: THREE.DoubleSide
                }));

        }

        cellMesh.position.set(position[0], position[1], position[2]);
        cellMesh.name = name;
        cellMesh.geometry.computeVertexNormals();

        group.add(cellMesh);

    }

}

function removeCellFromGroup(cellName, group) {

    var newChildren = [];

    group.children.forEach(element => {
        if (element.cellName !== cellName) {

            newChildren.push(element);

        }
    });

    group.children = newChildren;

}

export {
    addCellToGroup,
    removeCellFromGroup
};
