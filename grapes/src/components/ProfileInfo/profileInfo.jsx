import React, { useEffect, useState } from 'react';
import ProfileCard from '../ProfileCard/profileCard'
import { useParams } from 'react-router-dom';
import { userInfo } from '../../api/api';
import { fetchSubjects,  } from '../../api/api';
import { requestsByUser } from '../../api/api';
function ProfileInfo() {

    const [user, setUser] = useState({});
    const [showRequests, setShowRequests] = useState({});
    const [subjects, setSubjects] = useState([]);
    const { id } = useParams()

    async function getUserInfo(id) {
        const obtainData = await userInfo(id);
        setUser(obtainData);
        return obtainData
    };

    async function getSubjects() {
        const obtainData = await fetchSubjects();
        setSubjects(obtainData);
        return obtainData
    };

    async function getRequestInfo(id) {
    if (user && user.roles && user.roles[0].name === "admin") {
        const obtainData = await requestsByUser(id);
        setShowRequests(obtainData);
        return obtainData
        };
    };


    useEffect(() => {
        getRequestInfo(id);
    }, [user]);

    useEffect(() => {
        getSubjects();
        getUserInfo(id);
    }, [id]);

    if (!user.user) {
        return <div>
            <div id="bodyCarga"> <div className='divCarga'></div> </div>
        </div>;
    }
    const birthDate = new Date(user.user.birth_date);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    const subject = subjects.find(subject => subject.id === showRequests.subject_id);
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return (
        <div>
            <ProfileCard
                first_name={user.user.first_name}
                last_name={user.user.last_name}
                email={user.user.email}
                birth_date={user.user.birth_date}
                age={age}
                role={user.roles[0].name}
                roles={user.roles[0].name}
                subject={subject && subject.name}
                cv={showRequests.cv}
                title_photo={showRequests.title_photo}
            />
        </div>
    )
}

export default ProfileInfo