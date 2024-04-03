import { useContext, useEffect, useState } from "react";
import { AppContext } from "../store/context-store";
import { useQuery } from "@tanstack/react-query";

const fetchCatFact = async () => {
    const response = await fetch('https://catfact.ninja/fact');
    return await response.json();
}

const Home = () => {

    const [counter, setCounter] = useState(1);
    const { state, togglePizza } = useContext(AppContext);

    const { data, refetch } = useQuery({
        queryKey: ['catFact'],
        queryFn: fetchCatFact
    })

    useEffect(() => {
        const fetchInterval = setInterval(refetch, 10000);
        const counterInterval = setInterval(() => {
            setCounter((prevCounter) => prevCounter === 10 ? 1 : prevCounter + 1);
        }, 1000);

        return () => {
            clearInterval(fetchInterval);
            clearInterval(counterInterval);
        }
    }, [])

    return (
        <>
            <div>{counter}</div>
            <br></br>
            <div>{data && data.fact}</div>
            <br></br>
            <div>{state?.pizza.baked}</div>
            <button onClick={() => togglePizza && togglePizza()}>
                {state?.pizza.baked === 'da' ? 'Unbake' : 'Bake'}
            </button>
        </>
    )
}

export default Home