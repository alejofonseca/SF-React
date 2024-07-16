import React from "react";
import Breadcrumbs from "../Components/Breadcrumbs";

const Login = (props) => {
    return <>
    {/* Los breadcrumbs que aparecen en esta página vienen de bikes (parent component) */}
    Login <br />
    {props.data.title}
    </>
}

export default Login;