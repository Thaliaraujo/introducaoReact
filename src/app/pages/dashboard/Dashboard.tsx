import { useRef } from "react";
import { Link } from "react-router-dom";

import { useLoggedUser } from "../../shared/hooks/UseLoggedUser";

export const Dashboard = () => {
    const counterRef = useRef({ counter: 0});

    const {userName} = useLoggedUser();

    return(
        <div>
            <p>Dashboard</p>

            <p>{userName}</p>

            <p>Contador: {counterRef.current.counter} </p>

            <button onClick={() => counterRef.current.counter++}>Somar</button>
            
            <Link to="/login">login</Link>
        </div>
    );
};