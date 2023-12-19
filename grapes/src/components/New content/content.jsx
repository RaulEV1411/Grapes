import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { obtainCourseByTeacher } from '../../api/api';
import { Link } from 'react-router-dom';
import { newContent } from '../../api/api';
import "./content.css"
const options = ['Option 1', 'Option 2'];
const NewContentForm = () => {
    const navigate = useNavigate();
    const [teacherCourse, setTeacherCourse] = useState([]);
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const Id = decoded.sub;
    const [selectedOption, setSelectedOption] = useState(options[1]);

    useEffect(() => {
        getUserInfo();
    }, [Id]);


    // The 'getUserInfo' function is an asynchronous function that fetches the course information for a specific teacher.
    // It calls the 'obtainCourseByTeacher' function, passing in the 'Id'.
    // It sets the 'teacherCourse' state to the fetched course information.
    // It returns the fetched course information.
    async function getUserInfo() {
        const obtainData = await obtainCourseByTeacher(Id);
        setTeacherCourse(obtainData);
        return obtainData
    };


    // The 'submitContent' function is an event handler for the form submit event.
    // It prevents the default action of the event.
    // It creates a new FormData object from the form element.
    // It calls the 'newContent' function, passing in the 'formData'.
    // It navigates to the '/subject' route.
    const submitContent = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        newContent(formData)
        navigate('/subject');
    };

    const handleSelect = (option) => {
        setSelectedOption(option);

        if (option === options[0]) {
            navigate('/new_course');
        } else if (option === options[1]) {
            navigate('/new_content');
        }
    };


    return (
        <div className='PrincipalContent'>
            <div className='backContent'>
                    <Link to="/home">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="38" fill="white" className="bi bi-house-door" viewBox="0 0 16 16">
                        <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
                </svg>
                <p className="backHomeText">Back Home</p>
                    </Link>
            </div>
                <div className="headerOptions">
                    <button className={`button_state ${selectedOption === options[0] ? 'active' : ''}`} onClick={() => handleSelect(options[0])}>
                        New Course
                    </button>
                    <div className="divider"></div>
                    <button className={`button_state ${selectedOption === options[1] ? 'active' : ''}`} onClick={() => handleSelect(options[1])}>
                        Add Content
                    </button>
                </div>
            <div className="addContentContainer">
                <form className="contentForm" onSubmit={submitContent}>
                    <div className="formSection">
                        <div className="formField">
                            <p>name</p>
                            <label htmlFor="content[name]"></label>
                            <input className="inputField styled-input" type="text" id="content[name]" name="content[name]" required />
                        </div>

                        <div className="formField">
                            <p>description</p>
                            <label htmlFor="content[description]"></label>
                            <input className="inputField styled-input" type="text" id="content[description]" name="content[description]" required />
                        </div>

                        <div className="formField regular">
                            <label htmlFor="content[course_id]">Course:</label>
                            <select className="inputField styled-input special" id="content[course_id]" name="content[course_id]" required>
                                {teacherCourse.map((course) => (
                                    <option key={course.id} value={course.id}>
                                        {course.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="formSection">
                        <div className="formField">
                            <img src="/agregar.png" alt="Descripción de la imagen" className="fileImage" />
                            <p>images</p>
                            <label htmlFor="content[img]"></label>
                            <input className="inputField" type="file" id="content[img]" name="content[img]" required />
                        </div>

                        <div className="formField">
                            <img src="/video.png" alt="Descripción de la imagen" className="fileImage" />
                            <p>Videos</p>
                            <label htmlFor="content[video]"></label>
                            <input className="inputField" type="file" id="content[video]" name="content[video]" required />
                        </div>

                        <div className="formField">
                            <img src="/archivo-nuevo.png" alt="Descripción de la imagen" className="fileImage" />
                            <p>pdf</p>
                            <label htmlFor="content[pdf]"></label>
                            <input className="inputField" type="file" id="content[pdf]" name="content[pdf]" required />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="submitButton">
                            <span className="buttonText">Submit</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default NewContentForm;