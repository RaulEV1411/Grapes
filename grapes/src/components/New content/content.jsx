import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { obtainCourseByTeacher } from '../../api/api';
import { newContent } from '../../api/api';
const NewContentForm = () => {
    const navigate = useNavigate();
    const [teacherCourse, setTeacherCourse] = useState([]);
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const Id = decoded.sub;

    useEffect(() => {
        getUserInfo();
    }, [Id]);

    async function getUserInfo (){
        const obtainData = await obtainCourseByTeacher(Id);
        setTeacherCourse(obtainData);
        return obtainData
    };

    const submitContent = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target); 
        newContent(formData)
        navigate('/subject');
    };



    return (
        <div>
            <form className="formularioUvas" onSubmit={submitContent}>
                <div className="campo">
                    <p>nombre</p>
                    <label htmlFor="content[name]"></label>
                    <input className="campoTexto" type="text" id="content[name]" name="content[name]" required />
                </div>

                <div className="campo">
                    <p>descricion</p>
                    <label htmlFor="content[description]"></label>
                    <input className="campoTexto" type="text" id="content[description]" name="content[description]" required />
                </div>
                <div className="campo">
                    <label htmlFor="content[course_id]">Materia:</label>
                    <select className="campoTexto" id="content[course_id]" name="content[course_id]" required>
                        {teacherCourse.map(subject => (
                            <option key={subject.id} value={subject.id}>
                                {subject.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="campo">
                    <p>images</p>
                    <label htmlFor="content[img]"></label>
                    <input className="campoTexto" type="file" id="content[img]" name="content[img]" required />
                </div>

                <div className="campo">
                    <p>Videos</p>
                    <label htmlFor="content[video]"></label>
                    <input className="campoTexto" type="file" id="content[video]" name="content[video]" required />
                </div>

                <div className="campo">
                    <p>pdf</p>
                    <label htmlFor="content[pdf]"></label>
                    <input className="campoTexto" type="file" id="content[pdf]" name="content[pdf]" required />
                </div>

                <div>
                    <button type="submit" className="submit">
                        <span className="text">Submit</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewContentForm;