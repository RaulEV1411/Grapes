import React, { useState, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom'
import "./singup.css"
const Signup = ({ setCurrUser }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [flashMessage, setFlashMessage] = useState(null);
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
      if (!response.ok) { throw data.error };
      localStorage.setItem('token', response.headers.get("Authorization"));
      setCurrUser(data);
      setFlashMessage('Solicitud exitosa!');
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      console.log(data, "si llega")
    } catch (error) {
      console.error("Error:", error);
      // Manejar el error y proporcionar retroalimentación al usuario
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Esta expresión regular coincide con cualquier carácter que no sea una letra de la a a la z (mayúsculas o minúsculas).
    const nonLetterRegex = /[^a-zA-Z]/;

    if (nonLetterRegex.test(firstName)) {
      alert('First name can only contain letters');
      return;
    }

    if (nonLetterRegex.test(lastName)) {
      alert('Last name can only contain letters');
      return;
    }

    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();


    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    if (age < 10) {
      alert('Debes tener al menos 10 años para registrarte.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      alert('Por favor, introduce un correo electrónico válido.');
      return;
    }
    
    const userInfo = {
      user: {
        first_name: firstName,
        last_name: lastName,
        birth_date: birthDate,
        email,
        password,
        confirm_password: confirmPassword,
      }
    };
    signup(userInfo);
    e.target.reset();
  };


  return (
    <div className="signBody">
      {flashMessage && <div className="flash-success">{flashMessage}</div>}
      <div className="form-signup">
        <label className="contenedorLogo">
          <img className="logoApp" src="/Logo_Grapes-removebg-preview.png" alt="Logo de la App" />
        </label>
        <div className="namespace">
          <input
            className="input-signup"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="input-signup"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <label>
          <p>Birthday</p>
          <input
            className="input-signup"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </label>
        <br />

        <label>
          <input
            className="input-signup"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />

        <label>
          <input
            className="input-signup"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />

        <label>
          <input
            className="input-signup"
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
          Are you already registered?,<Link to="/login" >Login</Link>
        </div>
      </div>
    </div>
  );
};


export default Signup;
