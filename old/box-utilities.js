import * as THREE from "../js/three.module.js";

function lineBox(points, colour, scene) {

    var p0 = new THREE.Vector3().fromArray(points[0]);
    var p1 = new THREE.Vector3().fromArray(points[1]);
    var p2 = new THREE.Vector3().fromArray(points[2]);
    var p3 = new THREE.Vector3().fromArray(points[3]);
    var p4 = new THREE.Vector3().fromArray(points[4]);
    var p5 = new THREE.Vector3().fromArray(points[5]);
    var p6 = new THREE.Vector3().fromArray(points[6]);
    var p7 = new THREE.Vector3().fromArray(points[7]);

    var geometry0 = new THREE.BufferGeometry().setFromPoints([p0, p1]);
    var geometry1 = new THREE.BufferGeometry().setFromPoints([p1, p2]);
    var geometry2 = new THREE.BufferGeometry().setFromPoints([p2, p3]);
    var geometry3 = new THREE.BufferGeometry().setFromPoints([p3, p0]);
    var geometry4 = new THREE.BufferGeometry().setFromPoints([p4, p5]);
    var geometry5 = new THREE.BufferGeometry().setFromPoints([p5, p6]);
    var geometry6 = new THREE.BufferGeometry().setFromPoints([p6, p7]);
    var geometry7 = new THREE.BufferGeometry().setFromPoints([p7, p4]);
    var geometry8 = new THREE.BufferGeometry().setFromPoints([p0, p4]);
    var geometry9 = new THREE.BufferGeometry().setFromPoints([p1, p5]);
    var geometry10 = new THREE.BufferGeometry().setFromPoints([p2, p6]);
    var geometry11 = new THREE.BufferGeometry().setFromPoints([p3, p7]);

    var material = new THREE.LineBasicMaterial({
        color: new THREE.Color(colour)
    });

    scene.add(new THREE.Line(geometry0, material));
    scene.add(new THREE.Line(geometry1, material));
    scene.add(new THREE.Line(geometry2, material));
    scene.add(new THREE.Line(geometry3, material));
    scene.add(new THREE.Line(geometry4, material));
    scene.add(new THREE.Line(geometry5, material));
    scene.add(new THREE.Line(geometry6, material));
    scene.add(new THREE.Line(geometry7, material));
    scene.add(new THREE.Line(geometry8, material));
    scene.add(new THREE.Line(geometry9, material));
    scene.add(new THREE.Line(geometry10, material));
    scene.add(new THREE.Line(geometry11, material));

}

export { lineBox };