const getInput = require("../../lib/getInput");

const input = getInput.getInput(__dirname);

function solve() {
    let solution = 0;
    for (let line of input) {
        let [a, b] = line.split(",").map(
            assignment => assignment.split("-").map(
                str => parseInt(str)
            )
        );
        if (!(a[0] >= b[0] && a[0] > b[1] || b[0] >= a[0] && b[0] > a[1])) {
        // if ( (a[0] < b[0] || a[0] <= b[1]) && (b[0] < a[0] || b[0] <= a[1]) ) { // inversion test
            ++solution;
        }
    }
    return solution;
}

console.log(solve());