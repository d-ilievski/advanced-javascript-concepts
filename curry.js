
/*
function(a, b, c) => function(a)(b)(c)
*/



const curry = (fn) => {
    return curriedFunction = (...args) => {

        if (args.length >= fn.length) {
            return fn(...args);
        }

        return (...next) => curriedFunction(...args, ...next)
    }
}

const sum = (a, b, c) => {
    return a + b + c;
}

const curriedSum = curry(sum);


console.log(curriedSum(1)(2, 3)) // should be 6

// const curry: ((fn: Function) => Function) = (fn) => {
//     const curriedFn = (...args: any[]) : Function | any => {
//         if (args.length >= fn.length) {
//             return fn(...args)
//         }

//         return (...next: any[]) => curriedFn(...args, ...next);
//     }

//     return curriedFn;
// }

// const fn: (a: any, b: any, c: any) => void
//     = (a, b, c) => {
//         console.log(a, b, c);
//     }

// const fnCurry = curry(fn);

// fnCurry(1)(2)(3)
// fnCurry(1, 2)(3)
// fnCurry(1)(2, 3)
// fnCurry(1, 2, 3)
// fnCurry(1)(2)(3)