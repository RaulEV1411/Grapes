import React, { useState } from 'react';
import './register.css';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');

  const Register_URL = 'http://localhost:3001/signup';

  const handleFormSubmit = async () => {
    try {
      const response = await fetch(Register_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user:{
          first_name: firstName,
          last_name: lastName,
          birth_date: birthDate,
          email: email,
          password: password,
          confirm_password: confirm_password,
        }}),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Registro exitoso:', result);
    } catch (error) {
      console.error('Error durante el registro:', error.message);
    }
  };

  return (
    <div>
      <div className="form">
        <div className="flex">
          <label>
            <input
              className="input"
              type="text"
              placeholder=""
              required=""
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <span>first name</span>
          </label>

          <label>
            <input
              className="input"
              type="text"
              placeholder=""
              required=""
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <span>last name</span>
          </label>
        </div>
        <br />

        <label>
          <input
            className="input"
            type="date"
            placeholder=""
            required=""
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <span>Birth Date</span>
        </label>
        <br />

        <label>
          <input
            className="input"
            type="email"
            placeholder=""
            required=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>email</span>
        </label>
        <br />

        <label>
          <input
            className="input"
            type="password"
            placeholder=""
            required=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>password</span>
        </label>
        <br />

        <label>
          <input
            className="input"
            type="password"
            placeholder=""
            required=""
            value={confirm_password}
            onChange={(e) => setConfirm_password(e.target.value)}
          />
          <span>confirm password</span>
        </label>
        <br />

        {/* Utiliza un botón sin formulario y maneja el envío directamente */}
        <button type="button" className="fancy" onClick={handleFormSubmit}>
          <span className="top-key"></span>
          <span className="text">submit</span>
          <span className="bottom-key-1"></span>
          <span className="bottom-key-2"></span>
        </button>
      </div>
    </div>
  );
};

export default Register;
