import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RequestCardShow from '../RequestCardShow/RequestCardShow';
import './requestShowInfo.css';
import { fetchRequests, fetchSubjects, requestsInformationByUser, userInfo } from '../../api/api';

function RequestShoeInfo() {
const [requests, setRequests] = useState([]);
const [showRequests, setShowRequests] = useState({});
const [subjects, setSubjects] = useState([]);
const [user, setUser] = useState({});
const { id } = useParams();



// The 'getRequests' function is an asynchronous function that fetches the requests.
// It calls the 'fetchRequests' function.
// It sets the 'requests' state to the fetched requests.
// It returns the fetched requests.
    async function getRequests (){
        const obtainData = await fetchRequests();
        setRequests(obtainData);
        return obtainData
    };


// The 'getInformationUser' function is an asynchronous function that fetches the requests made by a specific user.
// It calls the 'requestsInformationByUser' function, passing in the 'id'.
// It sets the 'showRequests' state to the fetched requests.
// It returns the fetched requests.
    async function getInformationUser (id){
        const obtainData = await requestsInformationByUser(id);
        setShowRequests(obtainData);
        return obtainData
    };
    

// The 'getSubjects' function is an asynchronous function that fetches the subjects.
// It calls the 'fetchSubjects' function.
// It sets the 'subjects' state to the fetched subjects.
// It returns the fetched subjects.
    async function getSubjects (){
        const obtainData = await fetchSubjects();
        setSubjects(obtainData);
        return obtainData
    };

    async function getUserInfo(id) {
        const obtainData = await userInfo(id);
        setUser(obtainData);
        return obtainData
    };

useEffect(() => {
    getRequests();
    getSubjects();
    getUserInfo(id);
    getInformationUser(id);
}, [id]);

if (!requests.length || !user.user || !subjects.length || !showRequests.id_person) {
    return <div>
            <div id="bodyCarga"> <div className='divCarga'></div> </div>
        </div>;
}
    const request = requests.find((request) => request.user_id === (user && user.user.id));
    const subject = subjects.find(subject => subject.id === request.subject_id);
    console.log(showRequests.cv, "request");
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
        role={user.roles[0].name}
        />
    </div>
    </div>
);
}

export default RequestShoeInfo;