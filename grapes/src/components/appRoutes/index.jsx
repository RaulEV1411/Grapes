import {React,useState} from "react";
import { Routes, Route } from "react-router-dom";
import Login from '../Login/login.jsx';
import User from "../User/user.jsx";
import Signup from "../SingUp/singup.jsx";
import Home from "../Home/home.jsx";

const AppRoutes = () => {
    const [currUser, setCurrUser]= useState({email:"barry1234@gmail.com"});
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home currUser={currUser} setCurrUser={setCurrUser}/>} />
                <Route path="/login" element={<Login currUser={currUser} setCurrUser={setCurrUser}/>} />
                <Route path='/signup' element={<Signup currUser={currUser} setCurrUser={setCurrUser}/>} />
                <Route path='/test' element={<User currUser={currUser} setCurrUser={setCurrUser}/>} />
            </Routes>
        </div>
        );
    };

    export default AppRoutes;