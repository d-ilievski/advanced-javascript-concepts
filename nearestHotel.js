function generateTestCases() {
    const testCases = [];

    // Corrected test cases
    testCases.push({
        world: [[0, 0, 101], [0, 0, 0], [102, 0, 0]],
        x: 0,
        y: 2,
        expectedOutput: 101
    });

    testCases.push({
        world: [[0, 0, 101], [0, 0, 0], [102, 0, 0]],
        x: 2,
        y: 0,
        expectedOutput: 102
    });

    testCases.push({
        world: [[103, 0, 101], [0, 0, 0], [102, 0, 104]],
        x: 0,
        y: 0,
        expectedOutput: 103
    });

    // Additional test cases
    // Test case with bigger data set
    testCases.push({
        world: Array(100).fill().map(() => Array(100).fill(0)),
        x: 50,
        y: 50,
        expectedOutput: 0
    });

    // Test case with empty world
    testCases.push({
        world: [],
        x: 0,
        y: 0,
        expectedOutput: 0
    });

    // Test case with hotel at the same position
    testCases.push({
        world: [[0, 0, 0], [0, 105, 0], [0, 0, 0]],
        x: 1,
        y: 1,
        expectedOutput: 105
    });

    // Test case with multiple hotels at the same distance
    testCases.push({
        world: [[0, 106, 0], [107, 0, 108], [0, 109, 0]],
        x: 1,
        y: 1,
        expectedOutput: 106 // The function should return the first hotel it encounters
    });

    return testCases;
}

function runTestCases() {
    const testCases = generateTestCases();

    // Run each test case and print results
    testCases.forEach((testCase, index) => {
        const { world, x, y, expectedOutput } = testCase;
        const output = findNearestHotel(world, x, y);
        console.log(`Test Case ${index + 1}:`);
        // console.log("Input:");
        // console.log("World:", world);
        // console.log("User Position:", `(${x}, ${y})`);
        console.log("Expected Output:", expectedOutput);
        console.log("Actual Output:", output);
        if (output === expectedOutput) {
            console.log("✅", "Test Passed\n");
        } else {
            console.log("❌", "Test Failed\n");
        }
    });
}

// Function to find nearest hotel
function findNearestHotel(world, x, y) {
    if (world.length === 0) {
        return 0;
    }

    const userHotel = world[x][y];
    if (userHotel !== 0) {
        return userHotel;
    }

    let nearestDistanceSquared = Infinity;
    let nearestHotel = 0;

    for (let i = 0; i < world.length; i++) {
        for (let j = 0; j < world[i].length; j++) {
            const cell = world[i][j];
            if (cell !== 0) {
                const dx = j - y;
                const dy = i - x;
                const distanceSquared = dx * dx + dy * dy;
                if (distanceSquared < nearestDistanceSquared) {
                    nearestDistanceSquared = distanceSquared;
                    nearestHotel = cell;
                }
            }
        }
    }

    return nearestHotel;
}

// Run test cases
runTestCases();