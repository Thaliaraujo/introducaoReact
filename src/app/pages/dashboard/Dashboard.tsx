import { Link } from "react-router-dom";

export const Dashboard = () => {
    return(
        <>
            <p>Dashboard</p>
            <Link to="/login">login</Link>
        </>
    );
};