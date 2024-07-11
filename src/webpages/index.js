import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from './home';
import Bike from './bike';
import User from './user';
import Login from "./Login";
import Bikes from "./Bikes";
import FirstSpirit from "./FirstSpirit";
import OrderProduct from "./OrderProduct";
import Dynamic from "./Dynamic";

const Webpages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/bike/:id" element={<Bike />} />
                <Route path="/user/:id" element={<User />} />
                <Route path="/firstspirit" element={<FirstSpirit />} />
                <Route path="/orderproduct" element={<OrderProduct />} />
                <Route path="/bikes" element={<Bikes />} >
                    <Route path=":bikeId" element={<Login />} />
                </Route>
                <Route path="/dynamic" element={<Dynamic />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Webpages;