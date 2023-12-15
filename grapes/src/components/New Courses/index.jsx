import React, { useRef, useState } from 'react';
import BackButton from '../Back Button/BackButton';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const NewCourseForm = ({ setCurrUser }) => {
    const navigate = useNavigate();
    const formRef = useRef();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const courseFech = async (newCourse) => {
        debugger
        const url = "http://localhost:3001/api/v1/courses"; // Obtén el token del almacenamiento local
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": "application/json",
                    "authorization": localStorage.getItem("token"),// Incluye el token en los encabezados de la solicitud
                },
                body: JSON.stringify(newCourse),
            });
            navigate('/new_content');
            const data = await response.json();
            if (!response.ok) { throw data.error };
        } catch (error) {

            // Manejar el error y proporcionar retroalimentación al usuario
        };
    }

//     function goToNewContent() {
// navigate (/new_content)
// }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (name.trim() === '' || description.trim() === '') {
            alert('Por favor, completa todos los campos antes de enviar.');
            return;
        }
        const newCourse = {
            name: name,
            description: description,
        };
        courseFech(newCourse);
        e.target.reset();
    };

    return (

        <div className="form-container-newC">
            <div>
                <BackButton setCurrUser={setCurrUser} />
            </div>

            <div>
                <label className="input-label">
                    <input
                        className="styled-input"
                        type="text"
                        placeholder=" "
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <span className='input-title'> Course Name: </span>
                </label>
            </div>

            <div>
                <label className="input-label">
                    <input
                        className="styled-input"
                        type="text"
                        placeholder=" "
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <span className='input-title'> Course Description: </span>
                </label>
            </div>

            <div>
                <form ref={formRef} onSubmit={handleFormSubmit}>
                    <button type="submit" className="submit">
                        <span className="text">Submit</span>
                    </button>
                </form>
            </div>
        </div>
    );
};


export default NewCourseForm;
