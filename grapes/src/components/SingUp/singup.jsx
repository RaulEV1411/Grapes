import React, { useState, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom'
import "./singup.css"
    const Signup = ({ setCurrUser}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const formRef = useRef();
    const navigate = useNavigate()

    const signup = async (userInfo) => {
        const url = "http://localhost:3001/signup";
        try {
        const response = await fetch(url, {
            method: 'post',
            headers: {
            "Content-Type": 'application/json',
            "Accept": "application/json"
            },
            body: JSON.stringify(userInfo),
        });
        const data = await response.json();
        if (!response.ok) {throw data.error};
        localStorage.setItem('token', response.headers.get("Authorization"));
        setCurrUser(data);
        navigate("/login")
        console.log(data, "si llega")
    } catch (error) {
        console.error("Error:", error);
        // Manejar el error y proporcionar retroalimentación al usuario
    }
}; 

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userInfo = {user:{
        first_name: firstName,
        last_name: lastName,
        birth_date: birthDate,
        email,
        password,
        confirm_password: confirmPassword,
        }};
        signup(userInfo);
        e.target.reset();
    };

    
        return (
          <div className="signBody">
            <div className="form">
              <label className="contenedorLogo">
              <img className="logoApp" src="/Logo_Grapes-removebg-preview.png" alt="Logo de la App" />
              </label>
                <div className="namespace">             
                <input
                  className="input"
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  className="input"
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
        
              <label>
                <input
                  className="input"
                  type="date"
                  placeholder="Birth Day"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </label>
              <br />
        
              <label>
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <br />
        
              <label>
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <br />
        
              <label>
                <input
                  className="input"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>
              <br />
        
              <form ref={formRef} onSubmit={handleFormSubmit}>
                <button type="submit" className="submit">
                  <span className="text">submit</span>
                </button>
              </form>

              <div className="signup-link">
              Are you already registered?,<Link to = "/login" >Login</Link>
              </div>
            </div>
            </div>
          );
        };
        

    export default Signup;
