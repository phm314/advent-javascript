const getInput = require("../../lib/getInput");

const input = getInput.getInput(__dirname);

class Graph {
    nodes = [];
    adj = [];
    djikstra(start) {
        let queue = [start];
        let distance = {};
        for (let [i, _] of this.nodes.entries()) {
            distance[i] = Infinity;
        }
        distance[start] = 0;

        while (queue.length > 0) {
            let elem = queue.shift();
            for (const neighbor of this.adj[elem]) {
                let d = distance[elem] + 1;
                // unvisited neighbor
                if (!(isFinite(distance[neighbor]))) {
                    queue.push(neighbor)
                }
                if (d < distance[neighbor]) {
                    distance[neighbor] = d;
                }
            }
        }
        return distance;
    };
}

function solve() {
    let graph = new Graph();
    let grid = [];
    let start;
    let end;
    // convert str input & capture start + end
    for (let [y, line] of input.entries()) {
        grid.push(line.split("").map((v, x) => {
            if (v == "S") {
                start = y * line.length + x;
                return 0
            } else if (v == "E") {
                end = y * line.length + x;
                return 25
            } else {
                return v.charCodeAt(0) - 97;
            }
        }));
    }
    // convert to 1D array + calculate valid neighbors (equal or +1 height)
    for (const [i, row] of grid.entries()) {
        for (const [j, num] of row.entries()) {
            let ns = [[i, j + 1], [i, j - 1], [i + 1, j], [i - 1, j]].map(([v, w]) => {
                if (v >= 0 && v < grid.length && w >= 0 && w < row.length && num + 1 >= grid[v][w]) {
                    return v * row.length + w;
                }
            }).filter(n => n !== undefined);
            graph.nodes.push(num);
            graph.adj.push(ns);
        }
    }
    return graph.djikstra(start)[end];
}

console.log(solve());