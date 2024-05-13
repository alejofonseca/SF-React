import React from "react";
import { useLocation } from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const Breadcrumbs = () => {
    const location = useLocation();
    const { pathname } = location;
    //console.log(pathname);
    
    const splitted = pathname.split("/");
    //console.log(splitted);

    return <>
    <Breadcrumb>
        {splitted.map(element => {
            if(element === '') {
                return <Breadcrumb.Item href="/" key={element}>Home</Breadcrumb.Item>
            } else {
                return <Breadcrumb.Item href={"/"+element} active={element === splitted.slice(-1)[0]} key={element}>{element}</Breadcrumb.Item>
            }
        })}
    </Breadcrumb>
    </>
}

export default Breadcrumbs;