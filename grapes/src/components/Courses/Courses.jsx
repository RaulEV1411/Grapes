import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import CourseCard from "../Courses Card/CourseCard";
import { useParams } from "react-router-dom";
import BackButton from "../Back Button/BackButton";
import "./course.css";
// import './Courses.css'
const Courses = ({ setCurrUser }) => {
    const [courses, setCourses] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        getCourses();
        console.log(id);
    }, [id]);

    const getCourses = async () => {
        try {
            const response = await fetch(
                `http://localhost:3001//api/v1/courses/${id}/courses_by_subject`,
                {
                    method: "get",
                    headers: {
                        "content-type": "application/json",
                        authorization: localStorage.getItem("token"),
                    },
                }
            );
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
            <div className="title-container">
            <h2 className="Course-title">Courses</h2>
            <BackButton />
            </div>
            <div>
                <ul className="List-Course">
                    {courses.map((course) => (
                        <li className="link" key={course.id}>
                            <Link to={`/course/info/${course.id}`}className="link">
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
    );
};

export default Courses;
