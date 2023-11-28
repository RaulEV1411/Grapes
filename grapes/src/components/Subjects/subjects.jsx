    import React, { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import Navbar from '../NavBar/Navbar';
    import "./subject.css";
import CardSubject from '../cardSubject/cardSubject';
    const Subjects = ({ setCurrUser }) => {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        getSubjects();
    }, []);

    const getSubjects = async () => {
        try {
        const response = await fetch("http://localhost:3001/api/v1/subjects", {
            method: "get",
            headers: {
            "content-type": "application/json",
            "authorization": localStorage.getItem("token"),
            },
        });
        if (!response.ok) {
            throw Error;
        }
        const data = await response.json();
        setSubjects(data);
        } catch (error) {
        console.log("error", error);
        setSubjects([]);
        }
    };

    return (
            <div>
                <Navbar setCurrUser={setCurrUser}/>
                <div id="main" className="flexbox-col">
                <h2>Subjects</h2>
            </div>
        <div id="body1" className='flexbox-col'>
            <ul className='link'>
                
            {subjects.map((subject) => (
                <li  key={subject.id}>
                    < Link to = "/subject/course" className='link'>
                    <CardSubject title={subject.name}></CardSubject>
                    </Link>
                </li>
            ))}
            </ul>
        </div>
        </div>
    );
    };


    export default Subjects;
