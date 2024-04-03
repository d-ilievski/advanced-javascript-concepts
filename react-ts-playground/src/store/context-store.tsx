import { createContext, useState } from "react";

export interface GlobalState {
    pizza: {
        baked: string,
    }
}

export interface GlobalStore {
    state: GlobalState,
    setState: Function,
    togglePizza: Function,
}

export const AppContext = createContext<Partial<GlobalStore>>({});

const globalState: GlobalState = {
    pizza: {
        baked: 'da'
    }
}

export const useGlobalStore = () => {
    const [state, setState] = useState(globalState);

    const togglePizza = () => {
        const nextBaked = state.pizza.baked === 'da' ? 'ne' : 'da';

        setState(
            {
                ...state,
                pizza: {
                    ...state.pizza,
                    baked: nextBaked
                }
            }
        );
    }

    return {
        state,
        setState,
        togglePizza,
    }
}
