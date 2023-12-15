import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../Courses Card/CourseCard";
import { useParams } from "react-router-dom";
import BackButton from "../Back Button/BackButton";
import "./course.css";
import { jwtDecode } from "jwt-decode";
import { getCourses, userInfo } from "../../api/api";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isModerator, setIsModerator] = useState(false);
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const userId = decoded.sub;
    const { id } = useParams();

    useEffect(() => {
        getCourseBySubject();
        getUserInfo()
    }, [id]);

// The 'getUserInfo' function is an asynchronous function that fetches the user's information.
// It calls the 'userInfo' function, passing in the 'userId'.
// It sets the 'isAdmin' state to true if the user has the 'admin' role, and the 'isModerator' state to true if the user has the 'moderator' role.
// It returns the user's information.
    async function getUserInfo() {
        const obtainData = await userInfo(userId);
        setIsAdmin(obtainData.roles.some(role => role.name === 'admin'));
        setIsModerator(obtainData.roles.some(role => role.name === 'moderator'));
        return obtainData
    };

// The 'getCourseBySubject' function is an asynchronous function that fetches the courses for a specific subject.
// It calls the 'getCourses' function, passing in the 'id'.
// It sets the 'courses' state to the fetched courses.
// It returns the fetched courses.
    async function getCourseBySubject() {
        const obtainCourse = await getCourses(id);
        setCourses(obtainCourse);
        return obtainCourse;
    };

console.log();
    return (
        <div>
            <div className="title-container">
                <h2 className="Course-title">Courses</h2>
                <BackButton />
            </div>
            <div>
                <ul className="List-Course">
                    {courses.map((course) => (
                        <Link to={`/course/info/${course.id}`} className="link-course">
                            <li className="link-courses" key={course.id}>
                                <CourseCard
                                    name={course.name}
                                    description={course.description}
                                    user_id={course.user_id}
                                    id={userId}
                                    isAdmin={isAdmin}
                                    isModerator={isModerator}
                                    course_id={course.id}
                                ></CourseCard>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Courses;
