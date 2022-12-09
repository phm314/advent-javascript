const getInput = require("../../lib/getInput");

const input = getInput.getInput(__dirname);

function solve() {
    let solution = 0;
    const shapeScores = {
        "X": 1,
        "Y": 2,
        "Z": 3
    }
   function getOutcome(a, b) {
        // draw
        if ( a == "A" && b == "X" || a == "B" && b == "Y" || a == "C" && b == "Z" ) {
            return 3;
        }
        // win
        if ( a == "A" && b == "Y" || a == "B" && b == "Z" || a == "C" && b == "X" ) {
            return 6;
        }
        // loss
        return 0;
    }
    for (let i in input) {
        let round = input[i].split(" ")
        solution += getOutcome(...round) + shapeScores[round[1]];
    }
    return solution;
}

console.log(solve());