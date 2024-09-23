const createScene = function (engine, canvas) {
    const scene = new BABYLON.Scene(engine);

    // Create a FreeCamera, and set its position to (x:0, y:5, z:-10).
    const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);

    // Target the camera to scene origin.
    camera.setTarget(BABYLON.Vector3.Zero());

    // Attach the camera to the canvas.
    camera.attachControl(canvas, true);

    // Enable camera controls
    camera.keysUp.push(87);    // W
    camera.keysDown.push(83);  // S
    camera.keysLeft.push(65);  // A
    camera.keysRight.push(68); // D

    // Create a basic light, aiming 0,1,0 - meaning, to the sky.
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Load the 3D environment
    BABYLON.SceneLoader.ImportMesh("", "assets/models/", "environment.glb", scene, function (meshes) {
        meshes.forEach(mesh => {
            mesh.position = new BABYLON.Vector3(0, 0, 0);
        });
    });

    // Movement variables
    const moveSpeed = 0.1;
    const keys = {};

    // Event listeners for keydown and keyup
    window.addEventListener("keydown", (event) => {
        keys[event.key] = true;
    });

    window.addEventListener("keyup", (event) => {
        keys[event.key] = false;
    });

    // Update camera position based on keys pressed
    scene.onBeforeRenderObservable.add(() => {
        if (keys["w"] || keys["W"] || keys["ArrowUp"]) {
            camera.position.z += moveSpeed;
        }
        if (keys["s"] || keys["S"] || keys["ArrowDown"]) {
            camera.position.z -= moveSpeed;
        }
        if (keys["a"] || keys["A"] || keys["ArrowLeft"]) {
            camera.position.x -= moveSpeed;
        }
        if (keys["d"] || keys["D"] || keys["ArrowRight"]) {
            camera.position.x += moveSpeed;
        }
    });

    return scene;
};
