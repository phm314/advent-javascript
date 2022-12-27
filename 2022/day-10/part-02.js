const getInput = require("../../lib/getInput");

const input = getInput.getInput(__dirname).map(
    i => i.split(" ")
);

function solve() {
    let CRT = {
        cycle : 0,
        row : 0,
        solution : ["#", "", "", "", "", "", ""],
        increment() {
            this.cycle++;
            if (this.cycle == 40) {
                this.row++;
                this.cycle = 0;
            }
        },
        draw(register) {
            if (register - 1 == this.cycle || register == this.cycle || register + 1 == this.cycle) {
                this.solution[this.row] += "#";
            } else {
                this.solution[this.row] += ".";
            }
        }
    };
    let sprite = 1;
    for (const instr of input) {
        if (instr[0] == "addx") {
            CRT.increment();
            CRT.draw(sprite);
            let amt = Number(instr[1]);
            sprite += amt;
            CRT.increment();
            CRT.draw(sprite);
        } else if (instr[0] == "noop") {
            CRT.increment();
            CRT.draw(sprite);
        }
    }
    for (const str of CRT.solution) {
        console.log(str);
    }
}

solve();