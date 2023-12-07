import {React, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../NavBar/Navbar';
import CourseCard from '../Courses Card/CourseCard';
import { useParams } from 'react-router-dom';
import './course.css';
// import './Courses.css'
const Courses = ({ setCurrUser }) => {
    const [courses, setCourses] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        getCourses();
        console.log(id);
    }, [id]);



    // useEffect(() => {
    //     fetch(`http://localhost:3001/api/courses?subject_id=${subjectId}`)
    //         .then(response => response.json())
    //         .then(data => setCourses(data));
    // }, [subjectId]);

    const getCourses = async () => {
        try {
        const response = await fetch(`http://localhost:3001//api/v1/courses/${id}/courses_by_subject`, {
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
        console.log(data);
        setCourses(data);
        } catch (error) {
        console.log("error", error);
        setCourses([]);
        }
    };

    
    return (
        <div>
                <Navbar setCurrUser={setCurrUser}/>
                <main id="main" className="flexbox-col">
                <h2>Courses</h2>
            </main>
        <div id="body" >
            <ul className='List-Course'>
                {courses.map((course) => (
                <li className='link' key={course.id}>
                    < Link to = "/Course/info" className='link'>
                    <CourseCard 
                    name={course.name} 
                    description={course.description} 
                    ></CourseCard>
                    </Link>
                </li>
            ))}
            </ul>
        </div>
        </div>
)
}

export default Courses;