import {React,useState} from "react";
import { Routes, Route } from "react-router-dom";
import Login from '../Login/login.jsx';
import Signup from "../SingUp/singup.jsx";
import Home from "../Home/home.jsx";
import PrivateText from "../PrivateText/PrivateText.jsx";
import ProtectedComponent from "../ProctectedComponent/ProctectedComponent.jsx";
import Subjects from '../Subujects/subjects.jsx'


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
                <Route path="/subject" element={
                    <ProtectedComponent currUser={currUser} setCurrUser={setCurrUser}>
                        <Subjects currUser={currUser} setCurrUser={setCurrUser}/>
                    </ProtectedComponent>
                } />
                <Route path='/login' element={<Login currUser={currUser} setCurrUser={setCurrUser}/>} />
                <Route path='/private' element={<PrivateText currUser={currUser} setCurrUser={setCurrUser}/>} /> 
                <Route path='/signup' element={<Signup currUser={currUser} setCurrUser={setCurrUser}/>} />
            </Routes>
        </div>
        );
    };

    export default AppRoutes;