/*
  Create a function named memoize(fn) that accepts a function as its argument.
  The purpose of the memoize function is to cache the results of the provided
  function fn. When the memoized function is called with the same arguments in
  the future, it should return the cached result instead of recalculating it.
  This will optimize performance by avoiding redundant calculations.
*/

const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {

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

const times2 = (x) => {
    console.log(`Function called for ${x}`);

    return x * 2;
};

const memoedTimes2 = memoize(times2);

console.log(
    memoedTimes2(2),
    memoedTimes2(3),
    memoedTimes2(3),
    memoedTimes2(2),
    memoedTimes2(4),
    memoedTimes2(4))