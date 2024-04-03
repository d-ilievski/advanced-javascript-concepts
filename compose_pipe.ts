const addOne = (x: number): number => {
    return x += 1;
}

const multiplyByTwo = (x: number): number => {
    return x *= 2;
}

const divideBy = (y: number): ((x: number) => number) => {
    return (x) => x /= y;
}

const compose = (...fns: Function[]): ((val: any) => any) => (val) => fns.reduceRight((prev, fn): any => fn(prev), val)

const pipe = (...fns: Function[]): ((val: any) => any) => (val) => fns.reduce((prev, fn): any => fn(prev), val);


console.log(compose(divideBy(3), multiplyByTwo, addOne)(4))
console.log(pipe(divideBy(3), multiplyByTwo, addOne)(6))
