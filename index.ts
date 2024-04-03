class GraphNode {
    id: string;
    char: string;

    constructor(id: string, char: string) {
        this.id = id;
        this.char = char;
    }
}

class Graph {
    nodes: GraphNode[];
    edges: [GraphNode, GraphNode][];

    constructor(nodes: GraphNode[] = [], edges: [] = []) {
        this.nodes = nodes;
        this.edges = edges;
    }

    addNode(node: GraphNode) {
        if (!this.getNode(node.id)) {
            this.nodes.push(node);
        }
    }

    getNode(id: string) {
        return this.nodes.find(node => node.id === id);
    }

    addEdge(left: GraphNode, right: GraphNode) {
        if (!this.edges.some(edge => edge[0] === left && edge[1] === right)) {
            this.edges.push([left, right])
        }
    }

    findAdjacentNodes(char: string, startingNode: GraphNode) {
        return this.edges.filter((edge) => edge[0] === startingNode && edge[1].char === char).map((edge) => edge[1]);
    }

    findStartingNodes(char: string) {
        return this.nodes.filter((node) => node.char === char);
    }
}

const idMaker = (board: string[][]) => {
    return (i: number, j: number) => `${board[i][j]}[${i}][${j}]`;
}


/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
const findWords = function (board: string[][], words: string[]) {

    const getId = idMaker(board);

    const graph = new Graph();

    const foundWords: string[] = [];


    // Create nodes
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {

            const currentNode = new GraphNode(getId(i, j), board[i][j]);
            graph.addNode(currentNode);
        }
    }

    // Create edges
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {

            const currentNode = graph.getNode(getId(i, j));
            if (!currentNode)
                return

            if (i > 0) {
                const upNode = graph.getNode(getId(i - 1, j));
                if (upNode) {
                    graph.addEdge(currentNode, upNode);
                }
            }
            if (i < board.length - 1) {
                const downNode = graph.getNode(getId(i + 1, j));
                if (downNode) {
                    graph.addEdge(currentNode, downNode);
                }
            }
            if (j > 0) {
                const leftNode = graph.getNode(getId(i, j - 1));
                if (leftNode) {
                    graph.addEdge(currentNode, leftNode);
                }
            }
            if (j < board[i].length - 1) {
                const rightNode = graph.getNode(getId(i, j + 1));
                if (rightNode) {
                    graph.addEdge(currentNode, rightNode);
                }
            }
        }
    }

    words.forEach(word => {

        if (foundWords.includes(word)) {
            return;
        }

        const wordParts = word.split('');
        const startingLetter = wordParts.shift();
        if (!startingLetter) {
            return;
        }
        const startingNodes = graph.findStartingNodes(startingLetter);

        const found = startingNodes.some((startingNode) => {

            const wordRest = [...wordParts];
            let partsFound = 1;

            const stack: GraphNode[] = [];
            const visited = new Set<GraphNode>();

            stack.push(startingNode);

            while (stack.length && wordRest.length) {
                const node = stack.pop();
                if (!node) {
                    return;
                }

                if (!visited.has(node)) {
                    visited.add(node);

                    const neighbors = graph.findAdjacentNodes(wordRest[0], node).filter(node => !visited.has(node));

                    if (neighbors.length) {
                        wordRest.shift();
                        partsFound++;
                    }

                    for (const neighbor of neighbors) {
                        stack.push(neighbor);
                    }
                }
            }

            if (!wordRest.length && partsFound === word.length) {
                return true;
            }

            return false;

        });

        if (found) {
            foundWords.push(word)
        }
    })

    return foundWords
};

// findWords([["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]], ["oath", "pea", "eat", "rain"]);

// Helper function to print test results
function printTestResult(foundWords: any, expectedWords: any) {
    const foundWordsSet = new Set(foundWords);
    const expectedWordsSet = new Set(expectedWords);
    const result = [...expectedWordsSet].every(word => foundWordsSet.has(word)) && foundWordsSet.size === expectedWordsSet.size;

    console.log(result ? "✅ Test Passed" : "❌ Test Failed", "Found:", foundWords, "Expected:", expectedWords);
}

// Test Cases
function runTestCases() {
    // Test Case 1: Basic Functionality
    printTestResult(findWords([["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]], ["oath", "pea", "eat", "rain"]), ["oath", "eat"]);

    // Test Case 2: Words Not Present
    printTestResult(findWords([["o", "a", "b", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]], ["peach", "xyz", "sand"]), []);

    // Test Case 4: Edge Case with Overlapping Words
    printTestResult(findWords([["o", "a", "e", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]], ["oath", "tea", "eat", "rain", "neat"]), ["oath", "tea", "eat", "neat"]);

    // Test Case 5: Single Letter Words
    printTestResult(findWords([["a", "b"], ["c", "d"]], ["a", "b", "c", "d", "ab", "cd", "ad"]), ["a", "b", "c", "d", "ab", "cd", "ad"]);

    // Test Case 6: Diagonal Words (Expected to Fail)
    // Diagonal words should not be found as valid based on the rules provided.
    printTestResult(findWords([["a", "b", "c"], ["d", "e", "f"], ["g", "h", "i"]], ["aei", "beh", "cfi"]), []);

    // Test Case 7: Reusing Letter Cells
    // Ensuring a letter cell is not reused within a single word.
    printTestResult(findWords([["a", "b"], ["a", "c"]], ["aba", "abc"]), []);

    // Test Case 8: Large Board and Complex Words
    // This test case is to ensure the function can handle large inputs and complex scenarios.
    // The expected output should be adjusted based on the specific board and words you choose.
    // printTestResult(findWords(largeBoard, complexWords), [expectedWords]);
}

// Run the test cases
runTestCases();