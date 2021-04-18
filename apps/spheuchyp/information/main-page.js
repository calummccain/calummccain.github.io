import * as THREE from "../../common/js/three-bits/three.module.js";
import { objectMaker } from "../common/js/object-maker.js";
import { MapControls } from "../../common/js/three-bits/orbit-controls.js";

const data = [
    [
        { p: 3, q: 3, r: 3, model: "", refinement: 3, colour: 0x127548, position: [-5, 0, 0], transform: "", faceMode: false },
        { p: 3, q: 3, r: 4, model: "", refinement: 3, colour: 0x127548, position: [-3, 0, 0], transform: "", faceMode: false },
        { p: 3, q: 3, r: 5, model: "", refinement: 3, colour: 0x127548, position: [-1, 0, 0], transform: "", faceMode: false },
        { p: 3, q: 4, r: 3, model: "", refinement: 3, colour: 0x127548, position: [1, 0, 0], transform: "", faceMode: false },
        { p: 4, q: 3, r: 3, model: "", refinement: 3, colour: 0x127548, position: [3, 0, 0], transform: "", faceMode: false },
        { p: 5, q: 3, r: 3, model: "", refinement: 3, colour: 0x127548, position: [5, 0, 0], transform: "", faceMode: false }
    ],
    [
        { p: 4, q: 3, r: 4, model: "", refinement: 3, colour: 0x127548, position: [0, 0, 0], transform: "", faceMode: false }
    ],
    [
        { p: 3, q: 5, r: 3, model: "poincare", refinement: 3, colour: 0x127548, position: [3, 0, 3], transform: "", faceMode: false },
        { p: 3, q: 4, r: 4, model: "poincare", refinement: 3, colour: 0x127548, position: [3, 0, 0], transform: "", faceMode: false },
        { p: 5, q: 3, r: 7, model: "poincare", refinement: 3, colour: 0x127548, position: [3, 0, -3], transform: "", faceMode: false },
        { p: 6, q: 3, r: 3, model: "poincare", refinement: 3, colour: 0x127548, position: [0, 0, 3], transform: "", faceMode: false },
        { p: 4, q: 4, r: 4, model: "poincare", refinement: 3, colour: 0x127548, position: [0, 0, 0], transform: "", faceMode: false },
        { p: 6, q: 3, r: 7, model: "poincare", refinement: 3, colour: 0x127548, position: [0, 0, -3], transform: "", faceMode: false },
        { p: 3, q: 7, r: 3, model: "poincare", refinement: 3, colour: 0x127548, position: [-3, 0, 3], transform: "", faceMode: false },
        { p: 4, q: 4, r: 4, model: "poincare", refinement: 3, colour: 0x127548, position: [-3, 0, 0], transform: "", faceMode: false },
        { p: 5, q: 5, r: 4, model: "poincare", refinement: 3, colour: 0x127548, position: [-3, 0, -3], transform: "", faceMode: false },
    ],
    [
        { p: 4, q: 3, r: 3, model: "poincare", refinement: 3, colour: 0x127548, position: [-5, 0, 0], transform: "", faceMode: false },
        { p: 4, q: 3, r: 4, model: "poincare", refinement: 3, colour: 0x127548, position: [-3, 0, 0], transform: "", faceMode: false },
        { p: 4, q: 3, r: 5, model: "poincare", refinement: 3, colour: 0x127548, position: [-1, 0, 0], transform: "", faceMode: false },
        { p: 4, q: 3, r: 6, model: "poincare", refinement: 3, colour: 0x127548, position: [1, 0, 0], transform: "", faceMode: false },
        { p: 4, q: 3, r: 7, model: "poincare", refinement: 3, colour: 0x127548, position: [3, 0, 0], transform: "", faceMode: false },
        { p: 4, q: 3, r: 8, model: "poincare", refinement: 3, colour: 0x127548, position: [5, 0, 0], transform: "", faceMode: false },

    ],
    [
        { p: 5, q: 3, r: 7, model: "uhp", refinement: 15, colour: 0x127548, position: [0, 0, 0], transform: "", faceMode: false, intersection: true, cells: [""] }
    ]
];

window.onload = main;

function main() {

    const canvas = document.getElementById("c");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(window.devivePixelRatio);
    const visuals = document.querySelectorAll(".visual");
    var scenes = [];
    var t = 0;
    var camera;

    // Loop over the visuals
    for (var n = 0; n < visuals.length; n++) {

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xEEEEEE);

        var objects = [];

        camera = new THREE.PerspectiveCamera(70, visuals[n].clientWidth / visuals[n].clientHeight, 0.1, 10);
        camera.position.set(0, 3, 0);
        camera.lookAt(0, 0, 0);
        scene.userData.camera = camera;

        data[n].forEach((params) => {
            var obj = objectMaker(params);
            objects.push(obj);

            if (params.model === "uhp") {

                scene.add(obj(0, 0, 0, camera.position.toArray()));

            } else {

                scene.add(obj);

            }

            scene.userData.model = params.model;

        });

        scene.userData.visual = visuals[n];
        scene.userData.objects = objects;

        var controls = new MapControls(camera, visuals[n]);
        controls.enabled = true;
        controls.update();

        const light = new THREE.HemisphereLight(0xFFFFFF, 0x333333, 1);
        light.position.set(0, 2, 0);
        scene.add(light);

        scene.userData.objects = objects;

        scenes.push(scene);

    }

    window.addEventListener("resize", updateSize, false);

    function updateSize() {

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        if (canvas.width !== width || canvas.height != height) {

            renderer.setSize(width, height, false);

        }

        scenes.forEach((scene) => {
            scene.userData.camera.aspect = width / height;
            scene.userData.camera.updateProjectionMatrix();
        });

    }

    function animate() {

        render();
        requestAnimationFrame(animate);

    }

    function render() {

        updateSize();

        renderer.setClearColor(0xFFFFFF);
        renderer.setScissorTest(false);
        renderer.clear();

        renderer.setClearColor(0x000000);
        renderer.setScissorTest(true);

        scenes.forEach((scene) => {

            const rect = scene.userData.visual.getBoundingClientRect();

            scene.userData.objects.forEach((obj) => {

                if (scene.userData.model !== "uhp") {

                    obj.rotation.y = t * 0.0053;
                    obj.rotation.z = t * 0.0031;

                } else {

                    // scene.children[0] = obj(0, 0, 0, camera.position.toArray());

                }

            });

            // check if it's offscreen. If so skip it

            if (rect.bottom < 0 || rect.top > renderer.domElement.clientHeight ||
                rect.right < 0 || rect.left > renderer.domElement.clientWidth) {

                return; // it's off screen

            }

            // set the viewport

            const width = rect.right - rect.left;
            const height = rect.bottom - rect.top;
            const left = rect.left;
            const bottom = renderer.domElement.clientHeight - rect.bottom;

            renderer.setViewport(left, bottom, width, height);
            renderer.setScissor(left, bottom, width, height);

            renderer.render(scene, scene.userData.camera);

        });

        t++;

    }

    animate();

}
