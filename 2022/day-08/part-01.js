const getInput = require("../../lib/getInput");
const rotateRight = require("../../lib/rotateRight")

const input = getInput.getInput(__dirname);

function scan(arr) {
    // returns vis array
    let vis = Array.from(arr).fill(0);
    let m = 0;
    arr.forEach((v, i) => {
        if (m == 9) return vis;
        if (i == 0 || v > m) {
            vis[i] = 1;
            m = v;
        }
    });
    return vis;
}

function solve() {
    let grid = [...input.map(
        strRow => strRow.split("").map(
            char => parseInt(char)
        )
    )];
    let vis = Array.from(grid, i => new Array(i.length).fill(0));

    for (let i = 0; i < 4; ++i) {
        grid.forEach((v, i) =>
            scan(v).forEach((w, j) =>
                vis[i][j] = w || vis[i][j]
            )
        );
        grid = rotateRight.rotateRight(grid);
        vis = rotateRight.rotateRight(vis);
    }

    return vis.reduce(
        (pRow, cRow) => cRow.reduce(
            (p, c) => p + c, 0
        ) + pRow, 0
    );
}

console.log(solve());