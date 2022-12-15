const path = require("path");
const fs = require("fs");

function getInput(dir) {
    return fs
        .readFileSync(path.join(dir, "input.txt"), "utf-8")
        .trimEnd() // remove last line
        .split("\n")
        .map(
            line => line.trimEnd()
        );
}

module.exports = {
    getInput
};