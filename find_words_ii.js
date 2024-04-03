/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */

var findWords = function (board, words) {

    const arrMap = new Map();
    const foundWords = [];

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {

            const tile = {
                char: board[i][j],
                pos: { i, j },
                neighbors: []
            }

            // u
            if (i > 0) {
                tile.neighbors.push({ char: board[i - 1][j], pos: { i: i - 1, j } })
            }
            // b
            if (i < board.length - 1) {
                tile.neighbors.push({ char: board[i + 1][j], pos: { i: i + 1, j } })
            }
            // l
            if (j > 0) {
                tile.neighbors.push({ char: board[i][j - 1], pos: { i, j: j - 1 } })
            }
            // r
            if (j < board[i].length - 1) {
                tile.neighbors.push({ char: board[i][j + 1], pos: { i, j: j + 1 } })
            }

            const entry = arrMap.get(board[i][j]);
            if (entry) {
                entry.push(tile);
            } else {
                arrMap.set(board[i][j], [tile]);
            }
        }
    }

    words.forEach(word => {

        if (foundWords.includes(word))
            return;

        const parts = word.split('');
        const startingLetter = parts[0];
        const bucket = arrMap.get(startingLetter);

        if (bucket && parts.length === 1) {
            foundWords.push(word);
            return;
        }

        let found = false;
        for (let i = 0; i < bucket?.length; i++) {
            let tile = bucket[i];
            let prevTile = bucket[i];
            const prevPos = [{ ...tile.pos }];

            for (let j = 1; j < parts.length; j++) {

                // console.log('Tile', tile)
                // console.log('PrevTile', prevTile)
                // console.log('PrevPos', prevPos)

                const letter = parts[j];
                const nb = tile.neighbors.filter((nb) => nb.char === letter && !prevPos.some(pos => nb.pos.i === pos.i && nb.pos.j === pos.j));
                // console.log('Next Letter', letter)
                // console.log('Neighbors', nb)

                // console.log('----------------')

                if (nb[0]) {
                    if (j === parts.length - 1) {
                        found = true;
                    } else {
                        prevTile = tile;
                        tile = arrMap.get(letter)?.find((b) => b.pos.i === nb[0].pos.i && b.pos.j === nb[0].pos.j)
                        prevPos.push({ ...tile.pos })
                    }
                } else {

                    tile = prevTile;
                    // j -= 2;

                    const prevLetter = parts[j];
                    const prevNbs = tile.neighbors.filter((nb) => nb.char === prevLetter && !prevPos.some(pos => nb.pos.i === pos.i && nb.pos.j === pos.j));

                    if (!prevNbs.length) {
                        // console.log("\nBREAK!\n")
                        break
                    }
                }
            }

            if (found) {
                break;
            }

        }

        if (found) {
            foundWords.push(word);
        }
    })

    return foundWords
};

// Helper function to print test results
function printTestResult(foundWords, expectedWords) {
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