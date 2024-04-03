type FunctionType<TObject, TArgs extends any[], TReturn> = (obj: TObject, ...args: TArgs[]) => TReturn;

const shallowCopy = <TObject, TArgs extends any[], TReturn>(fn: FunctionType<TObject, TArgs, TReturn>) => {
    return (obj: TObject, ...args: TArgs[]) => {
        const objectCopy = { ...obj };
        return fn(objectCopy, ...args);
    }
}


type Topping = string;
interface Pizza {
    toppings: Topping[]
}


const addToppings: FunctionType<Pizza, Topping[], Pizza> = (pizza, toppings) => {
    pizza.toppings = [...pizza.toppings, ...toppings]
    return pizza;
}

const pureAddToppings = shallowCopy(addToppings);

const pizza: Pizza = {
    toppings: [],
}

const newPizza = pureAddToppings(pizza, ['cheese', 'pepperoni'])

console.log(pizza, newPizza);