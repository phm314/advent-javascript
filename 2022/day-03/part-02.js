const getInput = require("../../lib/getInput");

const input = getInput.getInput(__dirname);

function intersect(a, b) {
    return new Set(
        [...a].filter(
            i => b.has(i)
        )
    );
}

function solve() {
    let solution = 0;
    for (let i = 0; i < input.length;) {
        let common = [...input.slice(i, i + 3)] // get three rows of input
        .map(
            str => new Set(str) // turn them into Set objects
        ).reduce(
            (prev, curr) => intersect(prev, curr) // cumulatively find their intersection
        );
        let code = [...common][0].charCodeAt(0);
        if (code >= 97) {
            solution += (code % 96);
        } else {
            solution += (code % 64) + 26;
        }
        i += 3;
    }
    return solution;
}

console.log(solve());