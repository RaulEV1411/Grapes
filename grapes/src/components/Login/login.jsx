import {  useRef } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/api";
const Login = ({ setCurrUser }) => {
    const navigate = useNavigate()
    const formRef = useRef();



// The 'handleSubmit' function is an event handler for the form submit event.
// It prevents the default action of the event.
// It creates a new FormData object from the form element.
// It converts the FormData object to a plain object.
// It creates a 'userInfo' object from the form data.
// It calls the 'getSessionUser' function, passing in the 'userInfo' object.
// It resets the form.
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData);
        const userInfo = {
            user: { email: data.email, password: data.password },
        };
        getSessionUser(userInfo)
        e.target.reset();

    };
    
// The 'getSessionUser' function is an asynchronous function that logs the user in.
// It calls the 'login' function, passing in the 'userInfo' object and the 'setCurrUser' function.
// It sets the current user to the response from the 'login' function.
// It navigates to the "/home" route.
        async function getSessionUser (userInfo) {
        const response = await login(userInfo, setCurrUser)
        setCurrUser(response);
        navigate("/home")
    }

    return (
        <div className="LoginBody">
            <div className="login-container">
                <label className="label-login ">
                    <img
                        className="logoApp"
                        src="/Logo_Grapes-removebg-preview.png"
                        alt="Logo de la App"
                    />
                </label>
                <form className="formLogin" ref={formRef} onSubmit={handleSubmit}>
                    <label className="label-login">Email:</label>
                    <input
                        className="inputLogin"
                        type="email"
                        name="email"
                        placeholder="email"
                    />
                    <br />
                    <label className="label-login" >Password:</label>
                    <input
                        className="inputLogin"
                        type="password"
                        name="password"
                        placeholder="password"
                    />
                    <br />
                    <input type="submit" value="Login" className="inputLogin" />
                </form>
                <br />
                <div className="signup-link">
                    Not registered yet,<Link to="/signup">Signup</Link>
                </div>
            </div>
        </div>
    );
};
export default Login;
