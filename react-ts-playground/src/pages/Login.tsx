import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/redux-store";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [username, setUsername] = useState<string>('');

    const submit = () => {
        dispatch(login(username));
        navigate('/');
    }

    return (
        <>
            <input
                value={username}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
            />

            <br></br>
            <br></br>

            <button onClick={submit}>Submit</button>
        </>
    )
}

export default Login