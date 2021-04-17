import * as MAIN from "../js/main/main-utilities.js";
import * as THREE from "../js/three.module.js";
import { OrbitControls } from "../js/orbit-controls.js";
import * as CONSTANTS from "../js/main/main-constants.js";

function main(cellName, geometry, range) {

    var view = document.getElementById("view");

    var WIDTH = view.clientWidth;
    var HEIGHT = view.clientHeight;
    var rect = view.getBoundingClientRect();

    // setup scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xDDDDDD);

    // group of meshes
    var meshes = new THREE.Group();
    var ghosts = new THREE.Group();

    // add camera and light to scene
    var camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.1, 100);
    camera.position.set(3, 0, 0);
    camera.updateProjectionMatrix();
    camera.add(new THREE.HemisphereLight(0xaaaaaa, 0x555555));

    scene.add(camera);
    scene.add(new THREE.HemisphereLight(0xcccccc, 0x222222));

    // add the polyhedrons to the scene
    range.forEach((polyhedron) => {
        const name = cellName.substring(0, cellName.length - 2) + polyhedron.toString() + "}"
        const angle = 2 * Math.PI * range.indexOf(polyhedron) / range.length;
        const position = [CONSTANTS.groupRadius * Math.cos(angle), 0, CONSTANTS.groupRadius * Math.sin(angle)];
        
        MAIN.addCellToGroup({
            geometryFunction: geometry,
            group: meshes,
            metric: CONSTANTS.metric[name],
            refinement: CONSTANTS.individualDefinition,
            order: CONSTANTS.order[name],
            colour: CONSTANTS.colour[name],
            numberOfFaces: CONSTANTS.numberOfFaces[name],
            name: name,
            faceMode: false,
            transform: "",
            compact: CONSTANTS.compact[name],
            position: position
        });
    })

    // setup the renderer
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    var intersectionObjectName, intersectionObject, clickObjectParams;

    // add controls to the camera
    var controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enabled = true;
    controls.minZoom = 1;
    controls.maxZoom = 5;
    controls.update();


    // add a raycaster to the scene for object selection
    var raycaster = new THREE.Raycaster(), mouseVector = new THREE.Vector2();

    // add the meshes to the scene
    scene.add(meshes);
    scene.add(ghosts);

    // add some event listeners
    window.addEventListener("resize", onWindowResize, false);

    // add the renderer to the 'view' div
    view.appendChild(renderer.domElement);

    render();

    // click Object is the object clicked by the user
    var clickObject = "";

    function render() {

        requestAnimationFrame(render);

        renderer.render(scene, camera);

    }

    function onWindowResize(event) {

        WIDTH = view.clientWidth;
        HEIGHT = view.clientHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();

    }

}

export { main };