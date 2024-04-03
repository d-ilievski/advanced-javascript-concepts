/*
Design a function rateLimit(fn, limit, interval) that limits calls to fn such that it can only be called limit times per interval milliseconds.
If the function is called more often, the additional calls should be queued and executed at the correct rate.
*/

const rateLimit = (fn, limit, interval) => {

    const queue = [];
    let calls = 0;
    let timer = null;

    const clearTimer = () => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }

    const execute = async () => {
        if (!queue.length) {
            clearTimer();
            return;
        }

        if (calls < limit) {
            try {
                if (!timer) {
                    timer = setTimeout(() => {
                        calls = 0;
                        clearTimer();
                        for (let i = 0; i < limit; i++) {
                            execute();
                        }
                    }, interval);
                }
                const a = queue.shift();
                calls += 1;
                const res = await fn(...a);
                console.log(res);
            } catch (error) {
                console.error("Error executing function:", error);
            }

        }
    }

    return (...args) => {
        queue.push(args);
        execute();
    }
}

// const sum = (a, b) => {
//     const result = a + b;
//     console.log(result);
//     return result;
// }

// const limitedSum = rateLimit(sum, 5, 3000);

// limitedSum(0, 1);
// limitedSum(0, 2);
// limitedSum(0, 3);
// limitedSum(0, 4);
// limitedSum(0, 5);
// limitedSum(0, 6);
// limitedSum(0, 7);
// limitedSum(0, 8);
// limitedSum(0, 9);
// limitedSum(1, 9);

const asyncFn = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.49 ? resolve('Resolved') : reject('Oops');
        }, 500)
    })
}

const limitedAsyncFn = rateLimit(asyncFn, 2, 3000);

limitedAsyncFn();
limitedAsyncFn();
limitedAsyncFn();
limitedAsyncFn();
limitedAsyncFn();
limitedAsyncFn();
limitedAsyncFn();
limitedAsyncFn();

