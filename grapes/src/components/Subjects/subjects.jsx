import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../NavBar/Navbar';
import "./subject.css";
import CardSubject from '../cardSubject/cardSubject';
import { fetchSubjects } from '../../api/api';

const Subjects = ({ setCurrUser }) => {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        getSubjects();
    }, []);

    async function getSubjects (){
        const obtainData = await fetchSubjects();
        setSubjects(obtainData);
        return obtainData
    };

    
    if (!subjects.length) {
        return <div>
            <Navbar setCurrUser={setCurrUser} />
            <div id="bodyCarga"> <div className='divCarga'></div> </div>
        </div>;
    }
    return (
        <div>
            <Navbar setCurrUser={setCurrUser} />
            <div id="main" className="flexbox-col">
                <div className='subjects-tittle'>
                <h2 className='subjects_h2'>Subjects</h2>
                </div>
            </div>
            <div id="body1" className='flexbox-col'>
                <ul className='link'>
                    {subjects.map((subject) => (
                        <li className="li_subject" key={subject.id}>
                            <Link to={`/course/${subject.id}`} className='link'>
                                <CardSubject id={subject.id}></CardSubject>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};


export default Subjects;
