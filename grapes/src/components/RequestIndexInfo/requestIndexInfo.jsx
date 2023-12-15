import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './requestIndexInfo.css';
import BackButton from '../Back Button/BackButton';
import RequestCardIndex from '../RequestCardIndex/RequestInfo';
import { allUsers, approvedRequests, fetchSubjects, pendingRequests } from '../../api/api';

const options = ['Option 1', 'Option 2'];

const QueryReview = () => {
  const [requests, setRequests] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(options[0]);


  async function getPendingRequest() {
    const obtainData = await pendingRequests();
    setRequests(obtainData);
    return obtainData
  };

// The 'getApprovedRequest' function is an asynchronous function that fetches the approved requests.
// It calls the 'approvedRequests' function.
// It sets the 'requests' state to the fetched requests.
// It returns the fetched requests.
  async function getAppeovedRequest() {
    const obtainData = await approvedRequests();
    setRequests(obtainData);
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

// The 'getAllUsers' function is an asynchronous function that fetches all users.
// It calls the 'allUsers' function.
// It sets the 'users' state to the fetched users.
// It returns the fetched users.
    async function getAllUsers() {
      const obtainData = await allUsers();
      setUsers(obtainData);
      return obtainData
  };


// The 'useEffect' hook is used to call the 'getSubjects' and 'getAllUsers' functions when the component mounts.
  useEffect(() => {
    getSubjects()
    getAllUsers();
  }, []);

// The 'handleSelect' function is an event handler for the select change event.
// It sets the 'selectedOption' state to the selected option.
// If the selected option is the first option, it calls the 'getPendingRequest' function.
  const handleSelect = (option) => {
    setSelectedOption(option);

    if (option === options[0]) {
      getPendingRequest();
    } else if (option === options[1]) {
      getAppeovedRequest();
    }
  };

  useEffect(() => {
    getPendingRequest();
  }, [subjects, users]);

  if (!requests.length || !users || !subjects.length) {
    return <div>
      <div className='backRequestsIndex'>
        <BackButton />
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
        <BackButton />
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