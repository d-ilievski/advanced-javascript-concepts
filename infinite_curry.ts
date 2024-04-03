type CurriedFunction = (...args: number[]) => any;

const sumFn: CurriedFunction = (sum: number): CurriedFunction => (...args) => {

    const summed = sum + args.reduce((prev, curr) => prev + curr, 0);

    if (!args.length) {
        return summed;
    }

    return sumFn(summed);
}

console.log(sumFn(1)(3)(1, 1, 3)())