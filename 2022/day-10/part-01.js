const getInput = require("../../lib/getInput");

const input = getInput.getInput(__dirname).map(
    i => i.split(" ")
);

function solve() {
    let register = 1;
    let cycle = 1;
    let amt = 0;
    const cycles = [20, 60, 100, 140, 180, 220];
    let solution = 0;
    for (const instr of input) {
        if (cycles.includes(cycle)) {
            solution += cycle * register;
        }
        if (instr[0] == "addx") {
            amt = Number(instr[1]);
            cycle++;
            if (cycles.includes(cycle)) {
                solution += cycle * register;
            }
            register += amt;
            cycle++;
        } else if (instr[0] == "noop") {
            cycle++;
        }
    }
    return solution;
}

console.log(solve());