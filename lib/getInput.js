const path = require("path");
const fs = require("fs");

function getInput(dir) {
    return fs
        .readFileSync(path.join(dir, "input.txt"), "utf-8")
        .toString()
        .split("\n")
        .map(
            line => line.trim()
        );
}

module.exports = {
    getInput
};