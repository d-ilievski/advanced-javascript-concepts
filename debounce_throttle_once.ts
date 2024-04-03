/**
 * Used when calling of a function should be prevented from happening unless N seconds are passed
 * 
 * @param fn 
 * @param interval 
 * @returns 
 */

const throttle = (fn: Function, interval: number): Function => {

    let timer: NodeJS.Timeout | null = null;

    return (...args: any[]) => {
        if (timer === null) {
            fn(...args);
            timer = setTimeout(() => {
                if (timer !== null) {
                    clearTimeout(timer)
                    timer = null;
                }
            }, interval)
        }
    }

}

/**
 * Throttle but the last function call always executes
 * 
 * @param fn 
 * @param interval 
 * @returns 
 */
const throttleWithPreserveLast = (fn: Function, interval: number): Function => {

    let timer: NodeJS.Timeout | null = null;
    let lastFn: Function | null = null;

    return (...args: any[]) => {
        if (timer === null) {
            fn(...args);
            timer = setTimeout(() => {
                if (timer !== null) {
                    clearTimeout(timer)
                    timer = null;

                    if (lastFn) {
                        lastFn(...args);
                        lastFn = null;
                    }
                }
            }, interval)

        } else {
            lastFn = fn;
        }

    }

}


/**
 * Used when you need to call the debounced function only after N milliseconds have passed since the last call to the debounced function
 * 
 * @param fn 
 * @param interval 
 */
const debounce = (fn: Function, interval: number): Function => {
    let timer: NodeJS.Timeout | null = null;
    return (...args: any[]) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, interval);
    }
}

const throttledConsoleLog = throttle(console.log, 1000);

setInterval(() => {
    const timer = setInterval(() => {
        console.log('Attempt (Throttled)');

        throttledConsoleLog('Hey! (Throttled)');
    }, 200)

    setTimeout(() => {
        console.log('Stop (Throttled)');
        clearInterval(timer);
    }, 1000)
}, 2500)

const throttledPreseveConsoleLog = throttleWithPreserveLast(console.log, 1000);

setInterval(() => {
    const timer = setInterval(() => {
        console.log('Attempt (Throttled - Preserve)');

        throttledPreseveConsoleLog('Hey! (Throttled - Preserve)');
    }, 200)

    setTimeout(() => {
        console.log('Stop (Throttled - Preserve)');
        clearInterval(timer);
    }, 1000)
}, 2500)

const debouncedConsoleLog = debounce(console.log, 1000);

setInterval(() => {
    const timer = setInterval(() => {
        console.log('Attempt (Debounced)');

        debouncedConsoleLog('Hey! (Debounced)');
    }, 200)

    setTimeout(() => {
        console.log('Stop (Debounced)');
        clearInterval(timer);
    }, 1000)
}, 2500)


function once(fn: Function) {
    let called = false;
    return (...args: any[]) => {
        if (called)
            return;

        called = true;
        return fn(...args)
    }
}

const onceCalledFunction = once(() => console.log('hi'));

onceCalledFunction();
onceCalledFunction();
onceCalledFunction();