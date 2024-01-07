// Set up scene
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-5, -5, 5);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create maze
const mazeSize = 10;
const maze = [
    "**********",
    "*        *",
    "*  *  *  *",
    "*  *  *  *",
    "*  *  *  *",
    "*  *  *  *",
    "*  *  *  *",
    "*        *",
    "****+*****"
];

const wallGeometry = new THREE.BoxGeometry(1, 1, 1);
const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const finishMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });

const walls = [];
const finish = [];

// Loop to create walls and finish line
for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
        if (maze[i][j] === "*") {
            const wall = new THREE.Mesh(wallGeometry, wallMaterial);
            wall.position.set(j - mazeSize / 2, -i + mazeSize / 2, 0);
            scene.add(wall);
            walls.push(wall);
        }
        if (maze[i][j] === "+") {
            const wall = new THREE.Mesh(wallGeometry, finishMaterial);
            wall.position.set(j - mazeSize / 2, -i + mazeSize / 2, 0);
            scene.add(wall);
            finish.push(wall);
        }
    }
}

// Create player
const playerGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const playerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
const basicplayer_position = new THREE.Vector3(-mazeSize / 2 + 1, mazeSize / 2 - 1, 0);
player.position.set(-mazeSize / 2 + 0.5, mazeSize / 2 - 0.5, 0);
scene.add(player);
