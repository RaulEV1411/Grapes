import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
const NewContentForm = () => {
    const [teacherCourse, setTeacherCourse] = useState([]);
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const Id = decoded.sub;

    useEffect(() => {
        const fetchTeacherCourse = async () => {
            const response = await fetch(`http://localhost:3001/api/v1/courses/${Id}/courses_by_teacher`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.getItem("token"),
                },
            });
            const data = await response.json();
            setTeacherCourse(data);
        };

        fetchTeacherCourse();
    }, []);

    const submitContent = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target); // Obtén el token del almacenamiento local
        try {
            const response = await fetch("http://localhost:3001/api/v1/contents", {
                method: 'POST',
                headers: {
                    "authorization": localStorage.getItem("token"),// Incluye el token en los encabezados de la solicitud
                },
                body: formData,
            });

            const data = await response.json();
            if (!response.ok) { throw data.error };
            console.log(data, "si llega")
        } catch (error) {

            // Manejar el error y proporcionar retroalimentación al usuario
        };
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