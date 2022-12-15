const getInput = require("../../lib/getInput");

const input = getInput.getInput(__dirname)[0];

function solve() {
    for (let i = 0; i <= input.length - 4; ++i ) {
        if ((new Set(input.slice(i, i + 4))).size == 4) {
            return i + 4;
        }
    }
}

console.log(solve());