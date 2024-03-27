import React from "react";
import { useLocation } from "react-router-dom";

const Bikes = () => {
    const location = useLocation();
    const id = location.state?.id;
    console.log(id);
    return <>Bikes</>
}

export default Bikes;