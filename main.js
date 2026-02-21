import * as THREE from "three";
import { MindARThree } from "mindar-image-three";

const mindarThree = new MindARThree({
    container: document.querySelector("#container"),
    imageTargetSrc: "./targets_2.mind",
    // ^ Replace with your .mind file path
});

const { renderer, scene, camera } = mindarThree;

// Add a light (standard practice even for BasicMaterials)
const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
scene.add(light);

// 1. Load Texture
const loader = new THREE.TextureLoader();
const texture = loader.load("./faded_2.png");

// 2. Create Geometry & Material
// Note: 32x32 segments gives us the "points" to distort later
const geometry = new THREE.PlaneGeometry(1, 0.55, 32, 32);
const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
});
const plane = new THREE.Mesh(geometry, material);

// 3. Anchor to the first target
const anchor = mindarThree.addAnchor(0);
anchor.group.add(plane);

// 4. The Start Loop
const start = async () => {
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
};

start();
