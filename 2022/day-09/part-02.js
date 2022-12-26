const getInput = require("../../lib/getInput");

const input = getInput.getInput(__dirname).map(
    i => i.split(" ")
    ).map(
        j => [j[0], parseInt(j[1])]
);

function solve() {
    let knots = Array(10).fill().map(() => Array(2).fill(0));
    visited = new Set();
    visited.add([0, 0].toString());
    for (const [direction, steps] of input) {
        for (let step = 0; step < steps; ++step) {
            // increment head
            let head = knots[0];
            if (direction == "R") head[0]++;
            if (direction == "L") head[0]--;
            if (direction == "U") head[1]++;
            if (direction == "D") head[1]--;

            // calculate each knot position
            for (let [i, [cX, cY]] of Object.entries(knots).slice(1)) {
                let [dX, dY] = [knots[i - 1][0] - cX, knots[i - 1][1] - cY];
 
                if (Math.abs(dX) >= 2 || Math.abs(dY) >= 2) {
                    knots[i][0] += dX >= 1 ? 1 : dX <= -1 ? -1 : 0;
                    knots[i][1] += dY >= 1 ? 1 : dY <= -1 ? -1 : 0;
                    if (i == 9) {
                        visited.add([knots[i][0], knots[i][1]].toString());
                    }
                }
            }
        }
    }
    return visited.size;
}

console.log(solve());