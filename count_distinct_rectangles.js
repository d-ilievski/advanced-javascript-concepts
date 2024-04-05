/*
    Counting Distinct Rectangles

    Problem Statement
    Given an array of rectangles, where each rectangle is represented as an object with two properties:
    x (the x-coordinate of the left edge) and width (the width of the rectangle),
    write a function to count the number of distinct, non-overlapping rectangles.
    Rectangles are considered distinct if they do not share any common area.
    The x property indicates the starting point of the rectangle on the x-axis, while the width determines
    how far it extends to the right. The rectangles may initially overlap or be contained within one another.
    Your task is to calculate how many non-overlapping rectangles can be identified within this set.

    Input
    rectangles: An array of objects. Each object has two properties: 
    x (an integer representing the x-coordinate of the rectangle's left edge) 
    and width (an integer representing the rectangle's width). The array represents a 
    list of rectangles to be considered.
    
    Output
    Return an integer representing the number of distinct, non-overlapping rectangles that can be identified 
    from the given list.

    Examples


    Example 1:
    Input: rectangles = [ { x: 0, width: 4 }, { x: 11, width: 8 }, { x: 3, width: 5 }, { x: 13, width: 4 }, { x: 19, width: 3 } ]
    Output: 3
    Explanation: The first two overlap forming one, and the rest are distinct rectangles.
    
    Example 2:
    Input: rectangles = [ { x: 0, width: 4 }, { x: 5, width: 3 } ]
    Output: 2
    Explanation: Since there are two rectangles and they do not overlap, the output is 2.

    Example 3:
    Input: rectangles = [ { x: 0, width: 4 }, { x: 2, width: 2 }, { x: 3, width: 3 } ]
    Output: 1
    Explanation: All rectangles overlap with each other, forming one distinct rectangle. Thus, the output is 1.
    
    Constraints

    0 <= rectangles.length <= 10^4
    0 <= x, width <= 10^6
    All rectangle widths are positive integers.
    
    Note
    Focus on optimizing the function to handle a large number of rectangles efficiently, considering the constraints.
*/

function countRectangles(rectangles) {

    if (rectangles.length === 0) {
        return 0;
    }

    const sortedRectangles = rectangles.sort((a, b) => a.x - b.x);

    const tempRectangle = {
        x1: sortedRectangles[0].x,
        x2: sortedRectangles[0].x + sortedRectangles[0].width
    }

    let count = 1;

    for (let i = 1; i < sortedRectangles.length; i++) {
        const currentEndPosition = sortedRectangles[i].x + sortedRectangles[i].width
        if (sortedRectangles[i].x > tempRectangle.x2) {
            count++;
            tempRectangle.x1 = sortedRectangles[i].x
            tempRectangle.x2 = currentEndPosition
        } else {
            tempRectangle.x2 = currentEndPosition
        }
    }

    return count;
}

const example1 = [
    { x: 0, width: 4 },
    { x: 11, width: 8 },
    { x: 3, width: 5 },
    { x: 13, width: 4 },
    { x: 19, width: 3 },
]

console.log(countRectangles(example1)) // 3