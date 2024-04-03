/*
    Implement a custom version of the Function.prototype.bind method called bindFunction.
    Your implementation should allow a function to be bound with a specific context (this value) and any number of prepended arguments.

    Challenge: Ensure your bindFunction supports partial application.
*/

function bindFunction(fn, context, ...boundArgs) {

    const uniqueKey = Symbol('__tempFn');

    const ctx = { ...context }

    return function (...args) {
        ctx[uniqueKey] = fn;

        const result = ctx[uniqueKey](...boundArgs, ...args);

        delete ctx[uniqueKey];

        return result;
    }

    // Cheater's way
    // return function (...args) {
    //     return fn.apply(context, [...boundArgs, ...args])
    // }
}

const person = {
    firstName: "Daniel"
}

function sayName(isExcited, isTired) {
    console.log(this.firstName + (isExcited ? '!' : ""));
    if (isTired) {
        console.log(this.firstName + ' is tired!');
    }
}

const boundPerson = bindFunction(sayName, person, true);

boundPerson(true);