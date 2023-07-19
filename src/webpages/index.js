import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from './home';
import Bike from './bike';
import User from './user';

const Webpages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/bike/:id" element={<Bike />} />
                <Route path="/user/:id" element={<User />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Webpages;