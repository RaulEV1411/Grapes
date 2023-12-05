import { useEffect, useRef } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
const Login = ({ setCurrUser }) => {
    
    const navigate = useNavigate()
    const formRef = useRef();
        const login = async (userInfo, setCurrUser) => {

            const url = "http://localhost:3001/login";
            try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                "content-type": "application/json",
                "accept": "application/json",
                },
                body: JSON.stringify(userInfo),
            });
            const data = await response.json();
        
            if (!response.ok) {
                throw new Error(data.error || "Authentication failed");
            }
            localStorage.setItem("token", response.headers.get("Authorization"));
            setCurrUser(data);
            navigate("/home")
            } catch (error) {
            console.error("Error:", error.message);
            // Puedes manejar el error de otra manera, por ejemplo, mostrando un mensaje al usuario
            }
        };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData);
        const userInfo = {
            user: { email: data.email, password: data.password },
        };
        login(userInfo, setCurrUser);
        e.target.reset();
    };
    return (
        <div className="LoginBody">
            <div className="login-container">
                <label className="contenedorLogo">
                    <img
                        className="logoApp"
                        src="/Logo_Grapes-removebg-preview.png"
                        alt="Logo de la App"
                    />
                </label>
                <form className="formLogin" ref={formRef} onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input
                        className="inputLogin"
                        type="email"
                        name="email"
                        placeholder="email"
                    />
                    <br />
                    <label>Password:</label>
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
                    Not registered yet,<Link to = "/signup">Signup</Link>
                </div>
            </div>
        </div>
    );
};
export default Login;
