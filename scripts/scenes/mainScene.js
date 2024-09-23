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

    // Create a built-in "box" shape; its constructor takes 6 params: name, width, height, depth, subdivisions, scene.
    const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);

    // Move the box upward 1/2 of its height.
    box.position.y = 1;

    // Add interactivity
    box.actionManager = new BABYLON.ActionManager(scene);
    box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (evt) {
        alert("Box clicked!");
    }));

    return scene;
};
