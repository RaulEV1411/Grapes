import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './requestIndexInfo.css';
import BackButton from '../Back Button/BackButton';
import RequestCardIndex from '../RequestCardIndex/RequestInfo';

const options = ['Option 1', 'Option 2'];

const QueryReview = () => {
  const [requests, setRequests] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(options[0]);


    const fetchRequests = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/requests/index_request_pending`, {
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
        // Puedes manejar el error de alguna manera, por ejemplo, mostrando un mensaje al usuario.
      }
    };

    const fetchApprovedRequests = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/requests/index_request_approved`, {
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
        // Puedes manejar el error de alguna manera, por ejemplo, mostrando un mensaje al usuario.
      }
  };

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

  const handleSelect = (option) => {
  setSelectedOption(option);

  if (option === options[0]) {
    fetchRequests();
  } else if (option === options[1]) {
    fetchApprovedRequests();
  }
};

useEffect(() => {
  fetchRequests();
}, []);

  if (!requests.length || !users || !subjects.length) {
    return <div>
          <div className='backRequestsIndex'>
        <BackButton/>
      </div>
      <div id="main4" className="flexbox-col">
        <h2>Request</h2>
        <div className="headerRequests">
          <button className={`button_state ${selectedOption === options[0] ? 'active' : ''}`} onClick={() => handleSelect(options[0])}>
            Pendientes
          </button>
          <div className="divider"></div>
          <button className={`button_state ${selectedOption === options[1] ? 'active' : ''}`} onClick={() => handleSelect(options[1])}>
            Approve
          </button>
        </div>
      </div>
      <div id="bodyCarga"> <div className='divCarga'></div> </div>
    </div>;
  }
  return (
    <div>
      <div className='backRequestsIndex'>
        <BackButton/>
      </div>
      <div id="main4" className="flexbox-col">
        <h2>Request</h2>
        <div className="headerRequests">
          <button className={`button_state ${selectedOption === options[0] ? 'active' : ''}`} onClick={() => handleSelect(options[0])}>
            Pendientes
          </button>
          <div className="divider"></div>
          <button className={`button_state ${selectedOption === options[1] ? 'active' : ''}`} onClick={() => handleSelect(options[1])}>
            Approve
          </button>
        </div>
      </div>
      <div id="body2" className="flexbox-col">
        <ul className="link1">
          {requests.map((request) => {
            const subject = subjects.find(subject => subject.id === request.subject_id);
            const user = users.find(user => user.id === request.user_id);
            return (
              <li className="link_request" key={request.id}>
                <Link to={`/request_teacher/${user ? user.id : 'Unknown'}`}>
                  <RequestCardIndex
                    subject_name={subject ? subject.name : 'Unknown'}
                    identification_number={request.identification_number}
                    user_name={user ? user.email : 'Unknown'}
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