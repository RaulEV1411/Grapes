import React, { useRef, useState } from 'react';
import BackButton from '../Back Button/BackButton';
import './styles.css';
import { useNavigate, Link } from 'react-router-dom';
import { newCourse } from '../../api/api';

const NewCourseForm = ({ setCurrUser }) => {
    const navigate = useNavigate();
    const formRef = useRef();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [flashMessage, setFlashMessage] = useState(null);


// The 'handleFormSubmit' function is an event handler for the form submit event.
// It prevents the default action of the event.
// If the 'name' or 'description' state is empty, it sets the 'flashMessage' state to an error message and returns.
// It creates a 'newCourseData' object from the 'name' and 'description' states.
// It calls the 'newCourse' function, passing in the 'newCourseData' object.
// It navigates to the '/new_content' route.
// It resets the form.
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (name.trim() === '' || description.trim() === '') {
            setFlashMessage('Please complete all fields before submitting.');
            setTimeout(() => {
                setFlashMessage(false)
            }, 3000);
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
            {flashMessage && <div className="flash-signup">{flashMessage}</div>}
            <div>
                <BackButton setCurrUser={setCurrUser} />
            </div>
                    <Link to="/new_content">
                        <button>¿have course?</button>
                    </Link>

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
