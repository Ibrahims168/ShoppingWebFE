import React from "react";
import Register from "./components/registration/Register";
import Login from "./components/registration/Login";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/navBar/Navbar";
import FavoriteList from "./components/favoriteList/FavoriteList"
import OrderList from "./components/orderList/OrderList";
import Profile from "./components/profile/Profile"
import {AuthProvider} from "./components/context/AuthProvider";
import TempOrder from "./components/orderList/tempOrder/TempOrder";
import ClosedOrder from "./components/orderList/closedOrder/ClosedOrder";

function App(){
    return(
        <>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />}/>
                    <Route path="/signUp" element={<Register />} />
                    <Route path="/favoriteList" element={<FavoriteList />}/>
                    <Route path="/orderList" element={<OrderList />}/>
                    <Route path="/tempOrder" element={<TempOrder/>}/>
                    <Route path="/closedOrder" element={<ClosedOrder/>}/>
                    <Route path="/profile" element={<Profile />}/>
                </Routes>
            </AuthProvider>
        </>
    )
}

export default App;