import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const Login = () => {
    const location = useLocation();
    const id = location.state?.id;
    console.log(id);
    return <Navigate to="/bikes" />;
    //return <>Login</>
}

export default Login;