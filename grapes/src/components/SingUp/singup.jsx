// The 'setFlashMessage' function is used to display a flash message.
// The 'setTimeout' function is used to hide the flash message after 2 seconds.

// The 'emailRegex' is a regular expression that matches valid email addresses.

// If the 'email' does not match the 'emailRegex', a flash message is displayed saying 'Please enter a valid email.'.

// The 'userInfo' object is created with the user's information.

// The 'registerUser' function is called with the 'userInfo' object to register the user.

// If the registration is successful, the 'currUser' state is set to the 'userInfo' object and a flash message is displayed saying 'Solicitud exitosa!'.
import React, { useState, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom'
import "./singup.css"
import { registerUser } from "../../api/api";

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Esta expresión regular coincide con cualquier carácter que no sea una letra de la a a la z (mayúsculas o minúsculas).
    const nonLetterRegex = /[^a-zA-Z]/;

    if (nonLetterRegex.test(firstName)) {
      setFlashMessage('First name can only contain letters');
      setTimeout(() => {
        setFlashMessage(false)
      }, 2000);
      return;
    }

    if (nonLetterRegex.test(lastName)) {
      setFlashMessage('Last name can only contain letters');
      setTimeout(() => {
        setFlashMessage(false)
      }, 2000);
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
      setFlashMessage('You must be at least 10 years old to register.');
      setTimeout(() => {
        setFlashMessage(false)
      }, 2000);
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      setFlashMessage('Please enter a valid email.');
      setTimeout(() => {
        setFlashMessage(false)
      }, 2000);
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
    const obtainData = await registerUser(userInfo);
    try {
      setCurrUser(userInfo);
      setFlashMessage('Solicitud exitosa!');
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      if (!obtainData.ok) {
        throw new Error('Error fetching requests');
      }
    } catch (error) {
      console.error("Error:", error);
      // Manejar el error y proporcionar retroalimentación al usuario
      // return obtainData
    };
    e.target.reset();
  };

  return (
    <div className="signBody">
      <div className="form-container">
        <div className="form-signup">
          {flashMessage && <div className="flash-signup">{flashMessage}</div>}
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
              <span className="text">Sign Up</span>
            </button>
          </form>

          <div className="signup-link">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>

        <div className="image-container">
            <img src="/Logo_Grapes-removebg-preview.png" alt="Logo de la App" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
