import React from 'react'
import { useNavigate } from 'react-router-dom';
import './styles.css'
import {rejectRequest} from '../../api/api'
const DeclineButton = ({idUserDelete}) => {
    const navigate = useNavigate();

// The 'submitRequest' function is an event handler for the button click event.
// It prevents the default action of the event.
// Then, it calls the 'rejectRequest' function, passing in the 'idUserDelete'.
// The 'rejectRequest' function is presumably responsible for rejecting the user request.
// Finally, it navigates to the "/request_teacher" route.
    const submitRequest = async (event) => {
        event.preventDefault();
        rejectRequest(idUserDelete)
        navigate("/request_teacher")
    }
    return (
        <div>
            <button className="button-declinar" onClick={submitRequest} >Decline</button>
        </div>
    );
    };

export default DeclineButton;
