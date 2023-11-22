import {React,useState} from "react";
import { Routes, Route } from "react-router-dom";
import Login from '../Login/login.jsx';
import User from "../User/user.jsx";
import Signup from "../SingUp/singup.jsx";
import Home from "../Home/home.jsx";
import PrivateText from "../PrivateText/PrivateText.jsx";
import ProtectedComponent from "../ProctectedComponent/ProctectedComponent.jsx";

const AppRoutes = () => {
    const [currUser, setCurrUser]= useState(null);
    return (
        <div>
            <Routes>
                <Route path="/home" element={
                    <ProtectedComponent currUser={currUser} setCurrUser={setCurrUser}>
                        <Home currUser={currUser} setCurrUser={setCurrUser}/>
                    </ProtectedComponent>
                } />
                <Route path="/user" element={<User currUser={currUser} setCurrUser={setCurrUser}/>} />
                <Route path='/login' element={<Login currUser={currUser} setCurrUser={setCurrUser}/>} />
                <Route path='/private' element={<PrivateText currUser={currUser} setCurrUser={setCurrUser}/>} />
                <Route path='/signup' element={<Signup currUser={currUser} setCurrUser={setCurrUser}/>} />
            </Routes>
        </div>
        );
    };

    export default AppRoutes;