 // Set up scene
 import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
 import * as THREE from 'three';
 const scene = new THREE.Scene();
 const loader = new GLTFLoader();
 let mixer;
 let player;
 let animations; 
 const clock = new THREE.Clock();
 loader.load(
    'Mech.glb',
    function (gltf) {
        player = gltf;
        animations = gltf.animations;
        gltf.scene.scale.set(1, 1, 1);
        gltf.scene.position.set(0, 2, 0);
        scene.add(gltf.scene);

        // Create an animation mixer and pass the model's scene to it
        mixer = new THREE.AnimationMixer(gltf.scene);


    },
    undefined,
    function (error) {
        console.log(error);
    }
);




//add point light
const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.set(5, 5, 5);   

scene.add(pointLight);



 // Set up camera
 const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

 //stock position
 camera.position.z = -10;
 camera.position.y = 10;
 camera.position.x = 0;
camera.rotation.x = -2.3;
camera.rotation.y = 0;
camera.rotation.z = 3.1;


//add plane to the scene on x coordinate
const geometry = new THREE.PlaneGeometry( 100, 100, 32 );
const material = new THREE.MeshBasicMaterial( {color: 0x0ff000, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
plane.x = 0;
plane.y = 0;
plane.z = 0;
plane.rotation.x = 1.5;
scene.add( plane );

const spotLight = new THREE.SpotLight(0xffffff, 10, 20, Math.PI / 4, 0.5);
spotLight.position.set(0, 0, 10);
spotLight.position.copy(camera.position);

 // Set up renderer
 const renderer = new THREE.WebGLRenderer();
 renderer.setSize(window.innerWidth, window.innerHeight);
 document.body.appendChild(renderer.domElement);




 // Add lighting
 const ambientLight = new THREE.AmbientLight(0x404040); // Ambient light
 const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
 directionalLight.position.set(5, 5, 5);

 scene.add(ambientLight);
 scene.add(directionalLight);

 // Create a coordinate system
 const axesHelper = new THREE.AxesHelper(5);
 scene.add(axesHelper);

var playerSpeed = 0;
//Add control by buttons wasd
document.addEventListener('keydown', (event) => {
    if (!animations) {
        return;  // If animations is not defined yet, exit the function
    }

    playerSpeed = 11;
    const action1 = mixer.clipAction(animations[15]);
    switch (event.key) {
        case 'w':
            action1.play();  // Use action1 here
            player.SetDirection(0, 0, playerSpeed);
            player.scene.rotation.y = 0;

            break;
        case 's':
            action1.play();  // Use action1 here
            player.SetDirection(0, 0, -playerSpeed);
            player.scene.rotation.y = Math.PI;
            break;
        case 'a':
            action1.play();  // Use action1 here
            player.SetDirection(-playerSpeed, 0, 0);
            player.scene.rotation.y = Math.PI / 2;
            break;
        case 'd':
            action1.play();  // Use action1 here

            player.SetDirection(playerSpeed, 0, 0);
            player.scene.rotation.y = -Math.PI / 2;
            break;
        case ' ':
            const action = mixer.clipAction(animations[6]);
            action.play();
            break;
    }
});

 // Render loop
 const animate = () => {
    requestAnimationFrame(animate);

    // Update the animation mixer on each frame
    if (mixer) {
        var delta = clock.getDelta();
        mixer.update(delta);
    }

    // Move the model
    if (player) {
        //rotate player if needed
        
    }

    // Make camera follow player
    if (player) {
        camera.position.x = player.scene.position.x;
        camera.position.y = player.scene.position.y + 10;
        camera.position.z = player.scene.position.z - 10;  // Adjust this value to set the distance between the camera and the player
    }

    spotLight.position.copy(camera.position);
    spotLight.target = camera;

    renderer.render(scene, camera);
};

animate();