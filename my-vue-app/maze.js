// Set up scene
import * as THREE from 'three'; 

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 100);
camera.position.set(-5, -5, 5);  // Adjusted position to a corner
camera.lookAt(new THREE.Vector3(0, 0, 0));  // Look at the center of the scene

// Set up renderer
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;


renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

var light = new THREE.DirectionalLight(0xff9f, 10, 10);
light.position.set(0, 0, 10);
light.castShadow = true;
light.shadow.mapSize.width = window.innerWidth;
light.shadow.mapSize.height = window.innerHeight;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;
scene.add(light);
var lightpower = 20;
const spotLight = new THREE.SpotLight(0xffffff, lightpower, 20, Math.PI / 4, 0.5);
spotLight.position.set(0, 0, 0.1);
spotLight.position.copy(camera.position);

spotLight.target = camera;  
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = window.innerWidth;
spotLight.shadow.mapSize.height = window.innerHeight;
spotLight.shadow.camera.near = 0.5;
spotLight.shadow.camera.far = 500;
scene.add(spotLight);


//write feedback to terminal in vite    
console.log("Hello World");

// Set up ambient light
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);





// Create maze
const mazeSize = 10;
let maze = [[
    "**********",
    "*        *",
    "*  *  *  *",
    "*  *  *  *",
    "*  *  *  *",
    "*  *  *  *",
    "*  *  *  *",
    "*        *",
    "****+*****"
],
[
    "**********",
    "*        *",
    "*  *  *  *", 
    "*  **   **",
    "*  *     *",
    "*  *  *  *",
    "*  *  *  **********",
    "*                 +",
    "*******************"],
    [
    "**********",
    "*        *",
    "*  *******",
    "*       **",
    "****  *  *",
    "*  *  *  *",
    "*  *  *  *",
    "*  *  *  *",
    "*        *",
    "*+********",
]

];


let newmaze = createmazess(5,5);
newmaze = printmazes(addFrameAround(newmaze));
maze.push(newmaze);



// Add new maze to the maze array
//maze.push(printMaze(addFrameAround(newmaze)));


    function maze_map_generator(){

    }
    let height_of_geometry = 1;
    var light_reflection = 0.12;
    let wallGeometry = new THREE.BoxGeometry(1, 1, height_of_geometry);
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, roughness: 1, metalness: light_reflection });

    const finishMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const teleportMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    let startlevel = 0;
    var level = startlevel;
    // Create arrays of walls and their x and y positions
    let walls = [];
    let finish = [];

    function createMaze() {
        // Clear existing walls and finishes from the scene
        for (let i = 0; i < walls.length; i++) {
            scene.remove(walls[i]);
        }
        for (let i = 0; i < finish.length; i++) {
            scene.remove(finish[i]);
        }
    
        // Reset the walls and finish arrays
        walls = [];
        finish = [];
    
        const currentMaze = maze[level];
        for (let i = 0; i < currentMaze.length; i++) {
            for (let j = 0; j < currentMaze[i].length; j++) {
                if (currentMaze[i][j] === "*") {
                    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
                    wall.position.set(j - mazeSize / 2, -i + mazeSize / 2, 0);
                    scene.add(wall);
                    walls.push(wall);
                } else if (currentMaze[i][j] === "+") {
                    const finishBlock = new THREE.Mesh(wallGeometry, finishMaterial);
                    finishBlock.position.set(j - mazeSize / 2, -i + mazeSize / 2, 0);
                    scene.add(finishBlock);
                    finish.push(finishBlock);
                }
            }
        }
    
        // Update the scene
        renderer.render(scene, camera);
    }
    
    
    if (startlevel === 0) {
        createMaze();
    }

// Create player
const playerGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const playerMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8, metalness: 0.2 });

const player = new THREE.Mesh(playerGeometry, playerMaterial);
var basicplayer_posion = new THREE.Vector3(-mazeSize / 2 + 1, mazeSize / 2 - 1, 0);
player.position.set(-mazeSize / 2 + 0.5, mazeSize / 2 - 0.5, 0);
scene.add(player);

// Set up camera
const cameraOffset = new THREE.Vector3(0, 1, 5);  // Offset from player position

camera.position.copy(player.position).add(cameraOffset);

// Handle window resize

let start = false;
let playerSpeed = 0.3;
const playerDirection = new THREE.Vector3();
document.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
        start = !start;
    }
}); 
let godmode = false;
document.addEventListener('keydown', (event) => {
    playerSpeed = 0.3;
    switch (event.key) {
        case 'w':
            playerDirection.set(0, playerSpeed, 0);
            break;
        case 's':
            playerDirection.set(0, -playerSpeed, 0);
            break;
        case 'a':
            playerDirection.set(-playerSpeed, 0, 0);
            break;
        case 'd':
            playerDirection.set(playerSpeed, 0, 0);
            break;
        case 'g':
            godmode = !godmode;
            break;
    }
});
var scorefield = document.getElementById("collisionText");
//make scorefield color red
scorefield.style.color = "red";
//make scorefield font size 30px
scorefield.style.fontSize = "30px";
//make scorefield font family to something good looking for games, relly good looking
scorefield.style.fontFamily = "Comic Sans MS";
scorefield.innerHTML = "Level: " + 0;
// move scoore to left top corner
scorefield.style.position = "absolute";
// make it preatier and work with different screen sizes
scorefield.style.top = "0px";
scorefield.style.left = "0px";
scorefield.style.zIndex = "1";

scorefield.style.padding = "10px";
scorefield.style.borderRadius = "10px";
scorefield.style.border = "2px solid black";  

var hs = document.getElementById("hs");
hs.style.color = "green";
hs.style.fontSize = "30px";
hs.style.fontFamily = "Comic Sans MS";
hs.innerHTML = "Highest Level: " + 0;
hs.style.position = "absolute";
hs.style.top = "10px";
hs.style.right = "100px";
hs.style.zIndex = "1";

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
});
function checkCollision() {
    const playerBoundingBox = new THREE.Box3().setFromObject(player);
    if (!godmode) {
    for (let i = 0; i < walls.length; i++) {
        const wallBoundingBox = new THREE.Box3().setFromObject(walls[i]);

        if (playerBoundingBox.intersectsBox(wallBoundingBox)) {
            // Collision detected with a wall, reset player position and level to 0
            player.position.copy(basicplayer_posion); // Reset player position
            playerDirection.set(0, 0, 0); // Stop player movement
            for (let i = 0; i < walls.length; i++) {
                scene.remove(walls[i]);
            }
            for (let i = 0; i < finish.length; i++) {
                scene.remove(finish[i]);
            }
            wallGeometry = new THREE.BoxGeometry(1, 1, 1);
            walls = [];
            finish = [];
            level = 0;
            //add plane with text of your hs element
            //add text to the screen you lose
            
            hs.innerHTML = "Highest Level: " + highest_sccore;
            createMaze(level);
            //add text to the screen you lose

            return; // Exit the function after resetting the position and level
            }
        }
    }

    for (let i = 0; i < finish.length; i++) {
        const finishBoundingBox = new THREE.Box3().setFromObject(finish[i]);

        if (playerBoundingBox.intersectsBox(finishBoundingBox)) {
            // Collision detected with finish block, reset player position and move to the next level
            player.position.copy(basicplayer_posion); // Reset player position
            for (let i = 0; i < walls.length; i++) {
                scene.remove(walls[i]);
            }
            for (let i = 0; i < finish.length; i++) {
                scene.remove(finish[i]);
            }
            //height need to be random from 1 to 2.5
           wallGeometry = new THREE.BoxGeometry(1, 1, Math.random() * (2.5 - 0.5) + 0.5);
            
            walls = [];
            finish = [];
            //chnge div text to level 2 <p id="collisionText" ></p> 
            var scorefield = document.getElementById("collisionText");
            
            

            if (level > 2){
                level += 1;
                
                let sizeofmaze = Math.floor(Math.random() * (10 - 5) + 5);
                let mazes1 = createmazess(sizeofmaze, sizeofmaze);
                mazes1 = printmazes(addFrameAround(mazes1));
                maze.push(mazes1);

            }
            else{
                level += 1;
            }
                        //add text to the screen you lose
                playerDirection.set(0, 0, 0); // Stop player movement
            playerDirection.set(0.1,0, 0); // Stop player movement
            createMaze(level);
            return; // Exit the function after resetting the position and moving to the next level
        }
    }
}
var highest_sccore = 0;
// Render loop
// Render loop
const animate = () => {
    requestAnimationFrame(animate);

    // Update player position
    player.position.add(playerDirection.clone().multiplyScalar(playerSpeed));

    // Check for collision
    checkCollision();

    // Update camera position to follow from the back
    camera.position.copy(player.position).add(cameraOffset);
    
    if(currentlevel != level){
        scorefield.innerHTML = "Level: " + level;
        if (level > highest_sccore){
            highest_sccore = level;
        }
    }
    light.position.copy(player.position).add(cameraOffset);
    light.position.z = 0.0001;
    spotLight.position.copy(camera.position);
    spotLight.target = player;
    // Turn camera to 80 degrees
    camera.lookAt(player.position);
    var currentlevel = level;
    // Render the scene
    renderer.render(scene, camera);
};



animate();



function createmazess(width, height) {
    // Initialize mazes with walls
    let mazes = Array(height).fill().map(() => Array(width).fill('#'));
    let start = [0, 0];
    mazes[start[1]][start[0]] = '*';
    let stack = [start];
    let directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    while (stack.length > 0) {
        let [x, y] = stack[stack.length - 1];
        mazes[y][x] = ' ';

        // Get all unvisited neighbors
        let neighbors = directions
            .map(([dx, dy]) => [x + dx * 2, y + dy * 2])
            .filter(([nx, ny]) => nx >= 0 && nx < width && ny >= 0 && ny < height && mazes[ny][nx] === '#');

        if (neighbors.length > 0) {
            // Choose a random neighbor
            let [nx, ny] = neighbors[Math.floor(Math.random() * neighbors.length)];

            // Remove wall between current cell and chosen neighbor
            mazes[y + (ny - y) / 2][x + (nx - x) / 2] = ' ';

            // Push the neighbor to the stack
            stack.push([nx, ny]);
        } else {
            // If the current cell has no unvisited neighbors pop it from the stack
            stack.pop();
        }
    }

    mazes[0][0] = '*';

    // Choose a random location for the end point
    while (true) {
        let end = [Math.floor(Math.random() * width), Math.floor(Math.random() * height)];
        if (mazes[end[1]][end[0]] === ' ') {
            mazes[end[1]][end[0]] = '0';
            break;
        }
    }

    return mazes;
}


function addFrameAround(mazess) {
    let height = mazess.length;
    let width = mazess[0].length;
    mazess = [Array(width+2).fill('*')].concat(mazess.map(row => ['*', ...row, '*']), [Array(width+2).fill('*')]);
    return mazess;
}

function printmazes(mazess) {
    let result = [];
    mazess.forEach(row => {
        let newRow = row.map(cell => {
            if (cell === '0') {
                return '+';
            } else if (cell === '#') {
                return '*';
            } else {
                return cell;
            }
        });
        mazess[1][1] = '/';
        mazess[1][2] = '/';
        result.push(newRow.join(''));
    });
    return result;
}
