import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RequestCardShow from '../RequestCardShow/RequestCardShow';
import Navbar from '../NavBar/Navbar';
import './requestShowInfo.css';

function RequestShoeInfo({ setCurrUser }) {
const [requests, setRequests] = useState([]);
const [showRequests, setShowRequests] = useState({});
const [subjects, setSubjects] = useState([]);
const [user, setUser] = useState({});
const { id } = useParams();



console.log("HOLAAAAAAAAAAAAAAAA",requests)

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
    console.log(data);
    } catch (error) {
    console.error(error);
    }
};

const fetchRequestsShow = async () => {
    try {

        const requestid = localStorage.getItem("requestid");

        console.log("SOY EL LLMADO DEL LOCAL",requestid)
    const response = await fetch(`http://localhost:3001/api/v1/requests/${requestid}`, {
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

    setShowRequests(data);
    console.log(data);
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

if (!requests || !user.user || !subjects.length || !showRequests.id_person) {
    return <div>
            <Navbar setCurrUser={setCurrUser} />
            <div id="bodyCarga"> <div className='divCarga'></div> </div>
        </div>;
}
    const request = requests.find((request) => request.user_id === (user && user.user.id));
    const requestid = request.id
    const subject = subjects.find((subject) => subject.id_subject === (requests && requests.id_subject));
    localStorage.setItem("requestid", requestid);
return (
    <div>
    <Navbar setCurrUser={setCurrUser} />
    <div id="body3">
        <RequestCardShow
        email={user.user.email}
        first_name={user.user.first_name}
        last_name={user.user.last_name}
        birth_date={user.user.birth_date}
        subject_name={subject && subject.name}
        identification_number={showRequests && showRequests.identification_number}
        user_name={user && user.user.email}
        id_person={showRequests && showRequests.id_person}
        person_photo={showRequests && showRequests.person_photo}
        title_photo={showRequests && showRequests.title_photo}
        cv={showRequests && showRequests.cv}
        />
    </div>
    </div>
);
}

export default RequestShoeInfo;