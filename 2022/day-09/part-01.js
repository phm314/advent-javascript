const getInput = require("../../lib/getInput");

const input = getInput.getInput(__dirname).map(
    i => i.split(" ")
    ).map(
        j => [j[0], parseInt(j[1])]
);

function solve() {
    let [hX, hY] = [0, 0];
    let [tX, tY] = [0, 0];
    let visited = new Set();
    visited.add([0, 0].toString());
    for (const [direction, steps] of input) {
        for (let step = 0; step < steps; ++step) {
            // move head
            if (direction == "R") hX++;
            if (direction == "L") hX--;
            if (direction == "U") hY++;
            if (direction == "D") hY--;

            // check tail
            let [dX, dY] = [hX - tX, hY - tY];
            if (Math.abs(dX) >= 2 || Math.abs(dY) >= 2) {
                tX += dX >= 1 ? 1 : dX <= -1 ? -1 : 0;
                tY += dY >= 1 ? 1 : dY <= -1 ? -1 : 0;
                visited.add([tX, tY].toString());
            }
        }
    }
    return visited.size;
}

console.log(solve());