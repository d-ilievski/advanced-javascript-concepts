/*
    Create a simple Observable class that allows subscribers to listen to data changes.
    The Observable should have subscribe, unsubscribe, and notify methods.

    Use Case: Could be used for a basic state management system or data binding implementation.

    Observable will register callbacks to be called with the arguments provided by
    calling the notify method of the class.
    
    - 'subscribe' will store a callback function inside the instance of the Observable class
    - 'unsubscribe' will remove the callback. (Has to be the same reference)
    - 'notify' will make sure that all registered callbacks will be called with the arguments provided
    at the time of calling the method.

    Then, we will use this observable for state management. We will have a global state and from inside
    of a scoped context, we will modify the state and notify all registered observers from different contexts
*/

class Observable {

    #observers

    constructor() {
        this.#observers = []
    }

    notify(...args) {
        this.#observers.forEach(ob => ob(...args))
    }

    subscribe(callback) {
        this.#observers.push(callback)
    }

    unsubscribe(callback) {
        this.#observers = this.#observers.filter(ob => ob !== callback)
    }
}

class ObservableState {
    #state
    #observable

    constructor(state) {
        this.#state = state
        this.#observable = new Observable()
    }

    get state() {
        return this.#state
    }

    setState(updater) {
        this.#state = updater(this.#state)
        this.#observable.notify(this.#state)
    }

    subscribe(callback) {
        this.#observable.subscribe(callback)
    }

    unsubscribe(callback) {
        this.#observable.unsubscribe(callback)
    }
}

const observableState = new ObservableState({
    x: 1,
    y: 1
})

function contextA() {
    function reportChange(state) {
        console.log("Reporting change: ")
        console.log(state)
    }

    observableState.subscribe(reportChange)
}

function contextB() {
    observableState.setState((state) => ({
        ...state,
        x: 2
    }))
}

contextA()
contextB()