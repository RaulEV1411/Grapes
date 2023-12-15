import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../Courses Card/CourseCard";
import { useParams } from "react-router-dom";
import BackButton from "../Back Button/BackButton";
import "./course.css";
import { jwtDecode } from "jwt-decode";
const Courses = ({ setCurrUser }) => {
    const [courses, setCourses] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isModerator, setIsModerator] = useState(false);
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const userId = decoded.sub;
    const { id } = useParams();
    useEffect(() => {
        getCourses();
        getUserDetails();
    }, [id]);

    const getUserDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/v1/users/${userId}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.getItem("token"),
                },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            setIsAdmin(data.roles.some(role => role.name === 'admin'));
            setIsModerator(data.roles.some(role => role.name === 'moderator'));
        } catch (error) {
            console.error('An error occurred while fetching user details:', error);
        }
    };

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
                                    user_id={course.user_id}
                                    id={userId}
                                    isAdmin={isAdmin}
                                    isModerator={isModerator}
                                    course_id={course.id}
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
