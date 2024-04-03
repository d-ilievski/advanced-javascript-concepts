
const bake = () => {
    return {
        bake: () => console.log('Baking...')
    }
}

const toss = () => {
    return {
        toss: () => console.log('Tossing...')
    }
}

const serve = () => {
    return {
        serve: () => console.log('Served!')
    }
}

const Pizza = (style, type) => {
    return {
        style,
        type,
        toppings: [],
        ...bake(),
        ...serve(),
    }
}

const Salad = (size) => {
    return {
        size,
        ...bake(),
        ...serve(),
    }
}

const mySalad = Salad('side');
const myPizza = Pizza('classic', 'quatro formaggi');

console.log(mySalad);

const createObjectCopy = (fn) => {
    return (obj, ...args) => {
        return fn({ ...obj }, ...args);
    }
}

const addToppings =
    createObjectCopy(
        (pizza, toppings) => {
            pizza.toppings = [...pizza.toppings, ...toppings];
            return pizza;
        }
    )

const myToppedPizza = addToppings(myPizza, ['pepperoni', 'mushrooms'])

console.log(myPizza);
console.log(myToppedPizza);