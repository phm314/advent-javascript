
const getInput = require("../../lib/getInput");

const input = getInput.getInput(__dirname);

function parseStart(position) {
    let start = Array.from(Array(10), () => new Array());
    for (let row of position.slice().reverse()) {
        for (let ind = 0; 4 * ind - 3 <= row.length; ind++) {
            let elem = row[4 * ind - 3];
            if (elem != " ") {
                start[ind].push(elem);
            }
        }
    }
    return start;
}

function parseMove(move) {
    return [...move.matchAll(/\d+/g)].map(
        i => parseInt(i[0])
    );
}

function solve() {
    let sep = input.findIndex((v) => v == "");
    let a = input.slice(0, sep - 1)
    let moves = input.slice(sep + 1);

    let position = parseStart(a);

    for (let line of moves) {
        let [amt, from, to] = [...parseMove(line)];
        from = position[from];
        let grab = from.splice(from.length - amt);
        position[to] = position[to].concat(grab)
    }
    return position.slice(1, position.length)
    .reduce(
        (prev, curr) => prev + curr[curr.length - 1],
        new String()
    );
}

console.log(solve());