import React, { useState, useRef } from "react";

    const Signup = ({ setCurrUser, setShow }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const formRef = useRef();

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
        if (!response.ok) throw data.error;

        localStorage.setItem('token', response.headers.get("Authorization"));
        setCurrUser(data);
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

    const handleClick = (e) => {
        e.preventDefault();
        setShow(true);
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span>confirm password</span>
            </label>
            <br />

            <form ref={formRef} onSubmit={handleFormSubmit}>
            <button type="submit" className="fancy">
                <span className="top-key"></span>
                <span className="text">submit</span>
                <span className="bottom-key-1"></span>
                <span className="bottom-key-2"></span>
            </button>
            </form>

            <button type="button" className="fancy" onClick={handleClick}>
            <span className="top-key"></span>
            <span className="text">Show</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
            </button>
        </div>
        </div>
    );
    };

    export default Signup;
