import {React,useState} from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Login/login.jsx";
import Signup from "../SingUp/singup.jsx";
import HomePage from "../../Pages/Home/index.jsx";
import ProtectedComponent from "../ProctectedComponent/ProctectedComponent.jsx";
import SubjectsPage from "../../Pages/Subjects/index.jsx";
import CoursesPage from "../../Pages/Courses/index.jsx";
import RequestForm from "../RequestForm/RequestForm.jsx";
import Requesindex from "../../Pages/Request/requesindex.jsx";
import RequestShow from "../../Pages/Request/requestShow.jsx";
import ProfileInfo from "../ProfileInfo/profileInfo.jsx";
import NewCourseForm from "../New Courses/index.jsx";
const AppRoutes = () => {
    const [currUser, setCurrUser]= useState(null);
    return (
        <div>
            <Routes>
            
                <Route path="/" element={
                    <ProtectedComponent currUser={currUser} setCurrUser={setCurrUser}>
                        <HomePage currUser={currUser}/>
                    </ProtectedComponent>
                } />
                <Route path="/home" element={
                    <ProtectedComponent currUser={currUser} setCurrUser={setCurrUser}>
                        <HomePage currUser={currUser}/>
                    </ProtectedComponent>
                } />
                <Route path="/subject" element={
                    <ProtectedComponent currUser={currUser} setCurrUser={setCurrUser}>
                        <SubjectsPage currUser={currUser} setCurrUser={setCurrUser}/>
                    </ProtectedComponent>
                } />

                <Route path="/course" element={
                    <ProtectedComponent currUser={currUser} setCurrUser={setCurrUser}>
                        <CoursesPage currUser={currUser} setCurrUser={setCurrUser}/>
                    </ProtectedComponent>
                } />

                <Route path="/new_request" element={
                    <ProtectedComponent currUser={currUser} setCurrUser={setCurrUser}>
                        <RequestForm currUser={currUser} setCurrUser={setCurrUser}/>
                    </ProtectedComponent>
                } />

                <Route path="/new_course" element={
                    <ProtectedComponent currUser={currUser} setCurrUser={setCurrUser}>
                        <NewCourseForm currUser={currUser} setCurrUser={setCurrUser}/>
                    </ProtectedComponent>
                } />

                <Route path="/request_teacher" element={
                    <ProtectedComponent currUser={currUser} setCurrUser={setCurrUser}>
                        <Requesindex currUser={currUser} setCurrUser={setCurrUser}/>
                    </ProtectedComponent>
                } />

                <Route path="/request_teacher/:id" element={
                    <ProtectedComponent currUser={currUser} setCurrUser={setCurrUser}>
                        <RequestShow currUser={currUser} setCurrUser={setCurrUser}/>
                    </ProtectedComponent>
                } />

                <Route path="/profile/:id" element={
                    <ProtectedComponent currUser={currUser} setCurrUser={setCurrUser}>
                        <ProfileInfo currUser={currUser} setCurrUser={setCurrUser}/>
                    </ProtectedComponent>
                } />

                <Route path='/login' element={<Login currUser={currUser} setCurrUser={setCurrUser}/>} />
                <Route path='/signup' element={<Signup currUser={currUser} setCurrUser={setCurrUser}/>} />
            </Routes>
        </div>
        );
    };

    export default AppRoutes;