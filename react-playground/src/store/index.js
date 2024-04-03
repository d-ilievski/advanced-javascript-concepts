import { createContext, useState } from "react";

export const AppContext = createContext();

const globalState = {
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
        AppContext,
    }
}