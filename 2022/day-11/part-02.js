const getInput = require("../../lib/getInput");

const input = getInput.getInput(__dirname);

class Monkey {
    items = [];
    operation;
    test;
    target = [];
    count = 0;
    opNum;
    useOldFlag = false;
    do(old) {
        ++this.count;
        let n;
        if (this.useOldFlag) {
            n = old;
        } else {
            n = this.opNum;
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
                if (monkeyArray[monkeyIndex].operation[1] == "old") {
                    monkeyArray[monkeyIndex].useOldFlag = true;
                } else {
                    monkeyArray[monkeyIndex].opNum = Number(monkeyArray[monkeyIndex].operation[1]);
                }
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
    // with help from https://github.com/silentw0lf/advent_of_code_2022/blob/0ce2215dad1b5e1c1e08a1cc095114df504ebba4/11/solve.py
    let monkeys = monkeyParser(input);
    let mod_all = monkeys.map(m => m.test).reduce((p, c) => 
        p * c,
        1
    );

    for (let round = 0; round < 10000; round++) {
        for (let monkey of monkeys) {
            for (let item of monkey.items) {
                let val = monkey.do(item) % mod_all;
                let index = monkey.target[+!(val % monkey.test)];
                monkeys[index].items.push(val);
            }
            monkey.items.length = 0;
        }
    }
    return [...monkeys.map(
        m => m.count
    )]
    .sort((a, b) =>
        b - a
    ).slice(0, 2).reduce((p, c) =>
        p * c
        , 1
    );
}

console.log(solve());
