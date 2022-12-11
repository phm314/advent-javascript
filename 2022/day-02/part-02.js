const getInput = require("../../lib/getInput");

const input = getInput.getInput(__dirname);

function solve() {
    let solution = 0;

    const shapeScores = {
        r: 1,
        p: 2,
        s: 3
    };
    const translate = {
        A: "r",
        B: "p",
        C: "s"
    };
    const winningMove = {
        r: "p",
        p: "s",
        s: "r"
    };
    const losingMove = {
        r: "s",
        p: "r",
        s: "p"
    };

    for (let i in input) {
        let round = input[i].split(" ");
        let oppShape = translate[round[0]];
        let outcome = round[1];
        let myShape;

        if (outcome == "Y") {
            myShape = oppShape;
            solution += 3;
        } else if (outcome == "Z") {
            myShape = winningMove[oppShape];
            solution += 6;
        } else {
            myShape = losingMove[oppShape];
        }
        solution += shapeScores[myShape];
    }
    return solution;
}

console.log(solve());