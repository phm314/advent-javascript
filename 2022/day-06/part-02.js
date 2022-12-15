const getInput = require("../../lib/getInput");

const input = getInput.getInput(__dirname)[0];

function solve() {
    for (let i = 0; i <= input.length - 14; ++i ) {
        if ((new Set(input.slice(i, i + 14))).size == 14) {
            return i + 14;
        }
    }
}

console.log(solve());