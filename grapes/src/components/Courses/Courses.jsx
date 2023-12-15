import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../Courses Card/CourseCard";
import { useParams } from "react-router-dom";
import BackButton from "../Back Button/BackButton";
import "./course.css";
import { jwtDecode } from "jwt-decode";
import { getCourses, userInfo } from "../../api/api";

const Courses = ({ setCurrUser }) => {
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

    async function getUserInfo() {
        const obtainData = await userInfo(userId);
        setIsAdmin(obtainData.roles.some(role => role.name === 'admin'));
        setIsModerator(obtainData.roles.some(role => role.name === 'moderator'));
        return obtainData
    };


    async function getCourseBySubject() {
        const obtainCourse = await getCourses(id);
        setCourses(obtainCourse);
        return obtainCourse;
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
                            <Link to={`/course/info/${course.id}`} className="link">
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
