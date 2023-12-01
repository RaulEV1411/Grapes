import Navbar from '../NavBar/Navbar';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './queryReview.css';
import RequestInfo from '../RequestInfo/RequestInfo';
const QueryReview = ({setCurrUser}) => {
    const [requests, setRequests] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchRequests = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/v1/requests', {
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

            console.log(data, "hola");
            setRequests(data);
        } catch (error) {
            console.error(error);
            // Puedes manejar el error de alguna manera, por ejemplo, mostrando un mensaje al usuario.
        }
        };

        fetchRequests();
    }, []);

    

    useEffect(() => {
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
      // Puedes manejar el error de alguna manera, por ejemplo, mostrando un mensaje al usuario.
    }
  };

  fetchSubjects();
}, []);


useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/users', {
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
      setUsers(data);
    } catch (error) {
      console.error(error);
      // Puedes manejar el error de alguna manera, por ejemplo, mostrando un mensaje al usuario.
    }
  };

  fetchUsers();
}, []);


    return (
    <div>
        <Navbar setCurrUser={setCurrUser} />
        <div id="main" className="flexbox-col">
        <h2>Request</h2>
        </div>
        <div id="body2" className="flexbox-col">
        <ul className="link1">
        {requests.map((request) => {
          console.log(requests, "requests");
  const subject = subjects.find(subject => subject.id === request.subject_id);
  const user = users.find(user => user.id === request.user_id);
    return (
    <li className="link_request" key={request.id}>
        <Link to={`/request_teacher/${user ? user.id : 'Unknown'}`}>
        <RequestInfo
          subject_name={subject ? subject.name : 'Unknown'}
          identification_number={request.identification_number}
          user_name={user ? user.birth_date : 'Unknown'}
          
        />
      </Link>
    </li>
  );
})}
        </ul>
        </div>
    </div>
    )
    };

export default QueryReview;