const getInput = require("../../lib/getInput");

const input = getInput.getInput(__dirname)

function solve() {
    let solution = 0;
    let current =  0;
    for ( let i in input ) {
        num = parseInt( input[i] );
        if ( isNaN(num) ) {
            if ( current > solution ) {
                solution = current;
            } 
            current = 0;
        } else {
            current += num;
        }
    }
    return solution;
}

console.log(solve());