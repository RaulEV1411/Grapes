import React, { useEffect, useState } from 'react';
import ProfileCard from '../ProfileCard/profileCard'
import { useParams } from 'react-router-dom';

function ProfileInfo({ setCurrUser }) {

    const [user, setUser] = useState({});
    const [showRequests, setShowRequests] = useState({});
    const [subjects, setSubjects] = useState([]);
    const { id } = useParams()

    const fetchUser = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/v1/users/${id}`, {
                method: 'GET',
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.getItem("token"),
                },
            });

            if (!response.ok) {
                throw new Error('Error fetching user');
            }

            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchSubjects = async () => {
    try {
    const response = await fetch('http://localhost:3001/api/v1/subjects', {
        method: 'GET',
        headers: {
        "content-type": "application/json",
        "authorization": localStorage.getItem("token"),
        },
    });

    if (!response.ok) {
        throw new Error('Error fetching subjects');
    }

    const data = await response.json();
    setSubjects(data);
    } catch (error) {
    console.error(error);
    }
};

    useEffect(() => {
    const fetchRequestsShow = async () => {
    try {
        if (user && user.roles && user.roles[0].name === "admin") {
            const response = await fetch(`http://localhost:3001//api/v1/requests/${id}/show_by_user`, {
                method: 'GET',
                headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token"),
                },
            });
            console.log(response)
            if (!response.ok) {
                throw new Error('Error fetching requests');
            }
        
            const data = await response.json();
            setShowRequests(data);
            console.log(data)
            };
    } catch (error) {
    console.error(error);
    }
};
fetchRequestsShow();
}, [user]);

    useEffect(() => {
        fetchSubjects();
        fetchUser();
    }, [id]);

    if (!user.user ) {
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