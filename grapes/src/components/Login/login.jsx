import {  useRef } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/api";
const Login = ({ setCurrUser }) => {
    const navigate = useNavigate()
    const formRef = useRef();

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
