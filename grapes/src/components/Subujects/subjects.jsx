    import React, { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import Navbar from '../NavBar/Navbar';
    import "./subject.css";
    const Subjects = ({ setCurrUser }) => {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        getSubjects();
    }, []);

    const getSubjects = async () => {
        try {
        const response = await fetch("http://localhost:3002/api/v1/subjects", {
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
        <div id="body" className='flexbox-col'>
            <ul>
            {subjects.map((subject) => (
                <li className='link' key={subject.id}>
                    < Link to = "/subject/course" className='link'>
                    {subject.name}
                    </Link>
                </li>
            ))}
            </ul>
        </div>
        </div>
    );
    };


    export default Subjects;
