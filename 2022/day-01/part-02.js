const getInput = require("../../lib/getInput");

const input = getInput.getInput(__dirname)

function solve() {
    let current = 0;
    let calCounts = [];
    for ( let i in input ) {
        num = parseInt( input[i] );
        if ( isNaN(num) ) {
            calCounts.push(current);
            current = 0;
        } else {
            current += num;
        }

    }
    return calCounts
        .sort((a, b) => (b - a))                 // descending sort
        .slice(0, 3)                             // first three numbers
        .reduce((partial, a) => partial + a, 0); // sum of range
}

console.log(solve());