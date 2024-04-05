/*
    Array.prototype.flat is a recent addition to the ECMAScript specification that
    creates a new array with all sub-array elements concatenated into it recursively
    up to the specified depth. Implement your own version of flat.

    Challenge: Consider edge cases such as sparse arrays and cyclical references.
*/

function customFlat(array, depth = 1, parents = new WeakSet()) {

    if (depth === 0) {
        return array;
    }

    parents.add(array);

    return array.reduce((acc, item) => {
        if (Array.isArray(item)) {

            // checks for cyclical reference
            if (parents.has(item)) {
                return acc;
            }

            return [...acc, ...customFlat(item, depth - 1, parents)];
        } else {
            return [...acc, item]
        }
    }, [])
}

const deepArray = [[1, 2], 3, [4, [5, 6, [[], [7], [[8], 9]]]]];
deepArray.push(deepArray);
console.log(customFlat(deepArray));
console.log(customFlat(deepArray, 2));
console.log(customFlat(deepArray, 3));
console.log(customFlat(deepArray, 4));
console.log(customFlat(deepArray, 5));