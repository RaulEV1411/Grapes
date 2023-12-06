import React, { useRef, useState } from 'react';
import BackButton from '../Back Button/BackButton';
import { jwtDecode } from 'jwt-decode';

const NewCourseForm =  ({ setCurrUser }) => {
    // const navigate = useNavigate();
    const formRef = useRef();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [publicationDate, setPublicationDate] = useState('');
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const userId = decoded.sub;
    

    const courseFech = async (newCourse) => {
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
            const data = await response.json();
            if (!response.ok) {throw data.error};
            console.log(data, "si llega")
        } catch (error) {
            
            // Manejar el error y proporcionar retroalimentación al usuario
        };
    }

        const handleFormSubmit = (e) => {
        e.preventDefault();
        const newCourse = {
        name: name,
        description: description,
        publicationDate: publicationDate,
        user_id: userId
        };
        courseFech(newCourse);
        e.target.reset();
    };
    
    return(
        <div>
    
        <div>
            <BackButton setCurrUser={setCurrUser} />
        </div>
        <label>
            <input
                className="input"
                type="text"
                placeholder="Course name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </label>
        <label>
            <input
                className="input"
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
        </label>
        <label>
            <input
                className="input"
                type="date"
                placeholder="Course name"
                value={publicationDate}
                onChange={(e) => setPublicationDate(e.target.value)}
            />
        </label>
        <form ref={formRef} onSubmit={handleFormSubmit}>
            <button type="submit" className="submit">
                <span className="text">submit</span>
            </button>
        </form>
    </div>
    );
    };


export default NewCourseForm;
