import {React, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../NavBar/Navbar';

const Courses = ({ setCurrUser }) => {
    const [Courses, setCourses] = useState([]);

    useEffect(() => {
        getCourses();
    }, []);

    const getCourses = async () => {
        try {
        const response = await fetch("http://localhost:3002/api/v1/courses", {
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
        <div id="body" className='flexbox-col'>
            <ul>
            {Courses.map((course) => (
                <li className='link' key={course.id} >
                    < Link to ="/subject/course" className='link'>
                    {course.name},
                    {course.description},
                    {course.publication_date}
                    </Link>
                </li>
            ))}
            </ul>
        </div>
        </div>
)
}

export default Courses;