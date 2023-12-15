import React, { useRef, useState } from 'react';
import BackButton from '../Back Button/BackButton';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { newCourse } from '../../api/api';

const NewCourseForm = ({ setCurrUser }) => {
    const navigate = useNavigate();
    const formRef = useRef();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (name.trim() === '' || description.trim() === '') {
            alert('Por favor, completa todos los campos antes de enviar.');
            return;
        }
        const newCourseData = {
            name: name,
            description: description,
        };
        newCourse(newCourseData);
        navigate('/new_content');
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
