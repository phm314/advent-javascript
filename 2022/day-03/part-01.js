const { validateHeaderName, validateHeaderValue } = require("http");
const getInput = require("../../lib/getInput");

const input = getInput.getInput(__dirname);

function solve() {
    let solution = 0;
    for (let line of input) {
        let a = line.slice(0, line.length/2);
        let b = line.slice(line.length/2, line.length);
        for (let i in a) {
            if (b.indexOf(a[i]) != -1) {
                let code = a.charCodeAt(i);
                if (code >= 97) {
                    solution += (code % 96);
                } else {
                    solution += (code % 64) + 26;
                }
                break;
            }
        }
    }
    return solution;
}

console.log(solve());