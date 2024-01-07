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
