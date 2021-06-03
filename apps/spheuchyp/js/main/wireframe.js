// ========================================================
// main for the wireframe viewer
// 
// Inputs: 
// Output:
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

import * as THREE from "../three-bits/three.module.js";
import { OrbitControls } from "../three-bits/orbit-controls.js";
import { objectMaker } from "./object-maker.js";
import { typeOfCell } from "../data/geometry-decider.js";
import { SVGRenderer } from "../three-bits/SVGRenderer.js";

window.onload = main;

function main() {

    var thetax = 0, thetay = 0, thetaz = 0, thetau = 0, thetav = 0, thetaw = 0;
    var geom = {};
    var cellType;

    const canvas = document.getElementById("canvas");

    var WIDTH = canvas.clientWidth;
    var HEIGHT = canvas.clientHeight;

    var renderer = new SVGRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    canvas.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xE5E5E5);

    var camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.1, 100);
    camera.position.set(0, 10, 0);
    camera.up = new THREE.Vector3(0, 0, 1);

    scene.add(camera);

    var controls = new OrbitControls(camera, canvas);
    controls.enabled = true;
    controls.update();

    var lineGroup = new THREE.Group();
    scene.add(lineGroup);

    var data = {
        p: 3,
        q: 3,
        r: 3,
        modifier: "",
        model: "wireframe",
        refinement: 25,
        invisibleLines: false,
        cells: [""],
        numFaces: 20
    }

    // const geometry = new THREE.SphereBufferGeometry(1.128, 64, 64);
    // const material1 = new THREE.MeshBasicMaterial({ color: 0xffff00, opacity: 0.5, transparent: true });
    // const sphere1 = new THREE.Mesh(geometry, material1);
    // sphere1.position.set(0.7947, 1.286, 0);
    // scene.add(sphere1);

    geom = objectMaker(data);
    lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];

    render();

    window.addEventListener("resize", onWindowResize, false);

    function onWindowResize() {

        WIDTH = canvas.clientWidth;
        HEIGHT = canvas.clientHeight;

        renderer.setSize(WIDTH, HEIGHT);

        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();

    }

    function render() {

        renderer.render(scene, camera);
        requestAnimationFrame(render);

    }

    window.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            geom = objectMaker(data);
            lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
        }
    });

    window.addEventListener("touchend", () => {
        geom = objectMaker(data);
    }, false);

    document.getElementById("myRangex").oninput = function () {
        thetax = Math.PI * this.value / 50;
        lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
    };

    document.getElementById("myRangey").oninput = function () {
        thetay = Math.PI * this.value / 50;
        lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
    };

    document.getElementById("myRangez").oninput = function () {
        thetaz = Math.PI * this.value / 50;
        lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
    };

    document.getElementById("myRangeu").oninput = function () {
        thetau = Math.PI * this.value / 50 - Math.PI;
        lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
    };

    document.getElementById("myRangev").oninput = function () {
        thetav = Math.PI * this.value / 50 - Math.PI;
        lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
    };

    document.getElementById("myRangew").oninput = function () {
        thetaw = Math.PI * this.value / 50 - Math.PI;
        lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
    };

    document.getElementById("visibleLines").addEventListener("click", function () {
        data.invisibleLines = !data.invisibleLines;
    });

    document.getElementById("model").addEventListener("click", function () {
        data.model = (data.model === "uhp") ? "poincare" : "uhp";
    });

    $(document).ready(function () {

        updateCellSelector(data.r);

        $("#pqr").click(function () {
            $("#pqrselector").toggle();
        });

        $("#rightarrow").click(function () {
            data.r = Math.min(data.r + 1, 8);
            updateCellSelector(data.r);
        });

        $("#leftarrow").click(function () {
            data.r = Math.max(data.r - 1, 3);
            updateCellSelector(data.r);
        });

        $(".cellselector").click(function () {
            var [p, q, modifier] = $(this).attr("id").split("-");
            data.p = Number(p), data.q = Number(q), data.modifier = modifier;
            geom = objectMaker(data);
            lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
        })

    });

    const cellTypeColours = {
        "s": "#FFB3BA",
        "e": "#FFDFBA",
        "h": "#FFFFBA",
        "p": "#BAFFC9",
        "u": "#BAE1FF"
    }

    const truncRectDict = {
        "r-3-3-3": "s",
        "r-3-3-4": "s",
        "r-3-3-5": "s",
        "r-3-3-6": "h",
        "r-3-3-7": "h",
        "r-3-3-8": "h",
        "r-3-4-3": "s",
        "r-3-4-4": "h",
        "r-3-4-5": "h",
        "r-3-4-6": "h",
        "r-3-4-7": "h",
        "r-3-4-8": "h",
        "r-3-5-3": "h",
        "r-3-5-4": "h",
        "r-3-5-5": "h",
        "r-3-5-6": "h",
        "r-3-5-7": "h",
        "r-3-5-8": "h",
        "r-4-3-3": "s",
        "r-4-3-4": "e",
        "r-4-3-5": "h",
        "r-4-3-6": "h",
        "r-4-3-7": "h",
        "r-4-3-8": "h",
        "r-5-3-3": "s",
        "r-5-3-4": "h",
        "r-5-3-5": "h",
        "r-5-3-6": "h",
        "r-5-3-7": "h",
        "r-5-3-8": "h",
        "t-3-3-3": "s",
        "t-3-3-4": "s",
        "t-3-3-5": "s",
        "t-3-3-6": "h",
        "t-3-3-7": "h",
        "t-3-3-8": "h",
        "t-3-4-3": "s",
        "t-3-4-4": "h",
        "t-3-4-5": "h",
        "t-3-4-6": "h",
        "t-3-4-7": "h",
        "t-3-4-8": "u",
        "t-3-5-3": "h",
        "t-3-5-4": "h",
        "t-3-5-5": "h",
        "t-3-5-6": "h",
        "t-3-5-7": "u",
        "t-3-5-8": "u",
        "t-4-3-3": "s",
        "t-4-3-4": "e",
        "t-4-3-5": "h",
        "t-4-3-6": "h",
        "t-4-3-7": "h",
        "t-4-3-8": "h",
        "t-5-3-3": "s",
        "t-5-3-4": "h",
        "t-5-3-5": "h",
        "t-5-3-6": "h",
        "t-5-3-7": "h",
        "t-5-3-8": "h"
    }

    function updateCellSelector(r) {

        for (var p = 3; p <= 8; p++) {

            for (var q = 3; q <= 8; q++) {

                cellType = typeOfCell(p, q, r);

                document.getElementById(p + "-" + q + "-").innerHTML = "{" + p + "," + q + "," + r + "}";
                document.getElementById(p + "-" + q + "-").style.backgroundColor = cellTypeColours[cellType];

            }

        }

        [[3, 3], [3, 4], [3, 5], [4, 3], [5, 3]].forEach(([p, q]) => {

            ["t", "r"].forEach((affix) => {

                document.getElementById(p + "-" + q + "-" + affix).innerHTML = affix + "{" + p + "," + q + "," + r + "}";
                document.getElementById(p + "-" + q + "-" + affix).style.backgroundColor = cellTypeColours[truncRectDict[affix + "-" + p + "-" + q + "-" + r]];

            })

        })

    }

}