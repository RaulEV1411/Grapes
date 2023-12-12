import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RequestCardShow from '../RequestCardShow/RequestCardShow';
import './requestShowInfo.css';

function RequestShoeInfo({ setCurrUser }) {
const [requests, setRequests] = useState([]);
const [showRequests, setShowRequests] = useState({});
const [subjects, setSubjects] = useState([]);
const [user, setUser] = useState({});
const { id } = useParams();





const fetchRequests = async () => {
    try {
    const response = await fetch(`http://localhost:3001/api/v1/requests`, {
        method: 'GET',
        headers: {
        "content-type": "application/json",
        "authorization": localStorage.getItem("token"),
        },
    });

    if (!response.ok) {
        throw new Error('Error fetching requests');
    }

    const data = await response.json();

    setRequests(data);
    } catch (error) {
    console.error(error);
    }
};

const fetchRequestsShow = async () => {
    try {
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

useEffect(() => {
    fetchRequests();
    fetchSubjects();
    fetchUser();
    fetchRequestsShow();
}, [id]);

if (!requests.length || !user.user || !subjects.length || !showRequests.id_person) {
    return <div>
            <div id="bodyCarga"> <div className='divCarga'></div> </div>
        </div>;
}
    const request = requests.find((request) => request.user_id === (user && user.user.id));
    const subject = subjects.find(subject => subject.id === request.subject_id);
    
return (
    <div>
    <div id="body3">
        <RequestCardShow
        email={user.user.email}
        first_name={user.user.first_name}
        last_name={user.user.last_name}
        birth_date={user.user.birth_date}
        creation_date={request && request.created_at}
        subject_name={subject && subject.name}
        identification_number={showRequests && showRequests.identification_number}
        user_name={user && user.user.email}
        id_person={showRequests && showRequests.id_person}
        person_photo={showRequests && showRequests.person_photo}
        title_photo={showRequests && showRequests.title_photo}
        cv={showRequests && showRequests.cv}
        idUser={id}
        idUserDelete={id}
        />
    </div>
    </div>
);
}

export default RequestShoeInfo;