const getInput = require("../../lib/getInput");

const input = getInput.getInput(__dirname);

function solve() {
    let grid = [...input.map(
        strRow => strRow.split("").map(Number)
    )];
    let maxScore = 1;
    grid.forEach((row, i) => // for each row in grid
        row.forEach((num, j) => { // for each num in row
            let score = 1; // scenic score for each tree (num)
            [[0, 1], [0, -1], [1, 0], [-1, 0]].forEach((direction) => { // iterate all four directions
                let treeCount = 0; // trees seen in direction

                let x = 1; // iter var
                let nextIndex = (direction[0] == 0) ? x * direction[1] + j : x * direction[0] + i;
                while (nextIndex < row.length && nextIndex >= 0) {
                    let nextNum = (direction[0] == 0) ? row[nextIndex]: grid[nextIndex][j];
                    if (nextNum >= num) { treeCount++; break; } 
                    if (nextNum < num) { treeCount++; }
                    nextIndex = (direction[0] == 0) ? ++x * direction[1] + j : ++x * direction[0] + i;
                }
                score *= treeCount;
            })
            maxScore = (maxScore > score) ? maxScore : score;
        })
    );
    return maxScore;
}

console.log(solve());