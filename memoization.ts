const memoize = (fn: Function) => {
    const cache = new Map();
    return (...args: any[]) => {

        const argsKey = args.toString();
        const memoValue = cache.get(argsKey);

        if (memoValue) {
            return memoValue
        }

        const value = fn(...args);
        cache.set(argsKey, value);
        return value;
    }
}

const times2 = (x: number) => {
    console.log('Function called');

    return x * 2;
};

const memoedTimes2 = memoize(times2);

console.log(memoedTimes2(2),
    memoedTimes2(3),
    memoedTimes2(3),
    memoedTimes2(2),
    memoedTimes2(4))