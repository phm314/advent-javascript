const getInput = require("../../lib/getInput");

const input = getInput.getInput(__dirname);

class Monkey {
    items = [];
    operation;
    test;
    target = [];
    count = 0;
    do(old) {
        ++this.count;
        let n = parseInt(this.operation[1]);
        if (isNaN(n)) {
            n = old;
        }
        if (this.operation[0] == "+") {
            return old + n;
        } else if (this.operation[0] == "*") {
            return old * n;
        }
    }
}

function monkeyParser(lines) {
    let monkeyArray = [];
    let monkeyIndex = 0;
    let lineIndex = 0;
    for (let line of lines) {
        switch (lineIndex++) {
            case 0:
                monkeyArray.push(new Monkey());
                break;
            case 1:
                monkeyArray[monkeyIndex].items = [...line.match(/\d+/g)].map(n => Number(n));
                break;
            case 2:
                monkeyArray[monkeyIndex].operation = line.slice(line.indexOf("old") + 4).split(" ");
                break;
            case 3:
                monkeyArray[monkeyIndex].test = Number(line.match(/\d+/g)[0]);
                break;
            case 4:
                monkeyArray[monkeyIndex].target[1] = Number(line.match(/\d+/g)[0]);
                break;
            case 5:
                monkeyArray[monkeyIndex].target[0] = Number(line.match(/\d+/g)[0]);
                break;
            case 6:
                monkeyIndex++;
                lineIndex = 0;
                break;
            default:
                console.log("error?");
                break;
        }
    }
    return monkeyArray;
}

function solve() {
    let monkeys = monkeyParser(input);
    for (let round = 0; round < 20; round++) {
        for (let monkey of monkeys) {
            for (let item of monkey.items) {
                let val = Math.floor(monkey.do(item) / 3);
                let index = monkey.target[+!(val % monkey.test)];
                monkeys[index].items.push(val);
            }
            monkey.items.length = 0;
        }
    }
    return [...monkeys.map(
        m => m.count
    )].sort(
        (a, b) => b - a
    ).slice(0, 2)
    .reduce(
        (p, c) => p * c,
        1
    );
}

console.log(solve());
