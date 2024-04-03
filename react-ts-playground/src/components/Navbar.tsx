import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/redux-store";

export const Navbar = () => {
    const userState = useSelector((state: any) => state.user);
    const dispatch = useDispatch();

    return (
        <div>
            <div>{userState.name}</div>
            <br></br>
            <Link to='/'>Home</Link>
            {' | '}
            <Link to='/login'>Login</Link>
            {' | '}
            <Link onClick={() => dispatch(logout())} to='/' >Logout</Link>
            <br></br>
            <br></br>
        </div>
    )
}