class MyArray<T> extends Array<T> {

    constructor(...args: T[]) {
        super(...args)
    }

    myMap<TReturn>(fn: (item: T, index: number) => TReturn) : TReturn[] {
        const result = [];

        for (let i = 0; i < this.length; i++) {
            const out = fn(this[i], i);
            result.push(out);
        }

        return result;
    }
}

const myArr = new MyArray('a', 'b', 'c');
const myMap = myArr.myMap((item, index) => (item + index))

console.log(myArr);
console.log(myMap);
