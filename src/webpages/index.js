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
import OrderTable from "./OrderTable";
import BikeList from "./BikeList";
import Complaint from "./Complaint";
import QrCode from "./QrCode";

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
                <Route path="/table" element={<OrderTable />} />
                <Route path="/bikelist" element={<BikeList />} />
                <Route path="/complaint" element={<Complaint />} />
                <Route path="/qrcode" element={<QrCode />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Webpages;