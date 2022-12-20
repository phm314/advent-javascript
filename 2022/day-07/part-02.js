const getInput = require("../../lib/getInput");

const input = getInput.getInput(__dirname);

class Leaf {
    constructor(name, size) {
        this.name = name;
        this.size = size;
    }
}

class Node {
    constructor(name, parent) {
        this.name = name;
        this.parent = parent;
        this.children = {};
        this.size = 0;
    }
}

class Tree {
    constructor() {
        this.root = new Node("/", null);
        this.current = this.root;

        this.usedSpace = 0;
        this.nodeSizes = [];
    }
    readLine(line) {
        let args = line.split(" ");
        if (args[0] == "$") {
            let cmd = args[1];
            if (cmd == "cd") {
                if (args[2] == ".." && this.current.parent !== null) {
                    this.current = this.current.parent;
                } else {
                    this.current = this.current.children[args[2]];
                }
            }
        } else {
            if (args[0] == "dir") {
                this.current.children[args[1]] = new Node(args[1], this.current);
            } else {
                this.current.children[args[1]] = new Leaf(args[1], parseInt(args[0]));
            }
        }
    }
    traverse(node = this.root) {
        // get + set size for all nodes
        for (const child in node.children) {
            if (node.children[child] instanceof Leaf) {
                node.size += node.children[child].size;
            } else {
                node.size += this.traverse(node.children[child]);
            }
        }
        this.nodeSizes.push(node.size);
        return node.size;
    }
}

function solve() {
    let tree = new Tree();
    for (let line of input.slice(1)) {
        tree.readLine(line);
    }
    tree.traverse();
    tree.usedSpace = 70000000 - tree.root.size;
    tree.nodeSizes.sort(
        (a, b) => a - b
    );
    for (const sz of tree.nodeSizes) {
        if (sz + tree.usedSpace >= 30000000) {
            return sz;
        }
    }
}

console.log(solve());