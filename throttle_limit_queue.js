/*
  Design a function rateLimit(fn, limit, interval) that
  limits calls to fn such that it can only be called limit
  times per interval milliseconds. If the function is called
  more often, the additional calls should be queued and
  executed at the correct rate.
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

    const execute = () => {
        if (!queue.length) {
            clearTimer();
            return;
        }

        if (calls < limit) {
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
            const res = fn(...a);
            return res;
        }
    }

    return (...args) => {
        queue.push(args);
        return execute();
    }
}

const sum = (a, b) => {
    const result = a + b;
    console.log(result);
    return result;
}

const limitedSum = rateLimit(sum, 2, 3000);

limitedSum(1, 0);
limitedSum(1, 1);
limitedSum(1, 2);
limitedSum(1, 3);
limitedSum(1, 4);
limitedSum(1, 5);
limitedSum(1, 6);
limitedSum(1, 7);
limitedSum(1, 8);
limitedSum(1, 9);