// The 'ApproveButton' component is a React component that renders a button.
// When clicked, this button approves a user as an admin.
import React from 'react'
import "./styles.css";
import { useNavigate } from 'react-router-dom';
import { approveAdmin } from '../../api/api';
const ApproveButton = ({idUser}) => {
    const navigate = useNavigate();
    

    // The 'submitRequest' function is an event handler for the button click event.
    // It prevents the default action of the event.
    // Then, it calls the 'approveAdmin' function, passing in the 'idUser'.
    // The 'approveAdmin' function is presumably responsible for approving the user as an admin.
    // Finally, it navigates back to the previous page.
    const submitRequest = async (event) => {
        event.preventDefault();
        approveAdmin(idUser);
        navigate(-1)
    }

    return (
        <div>
            <button className="button-aceptar" onClick={submitRequest}>Approve</button>
        </div>
    );
};

export default ApproveButton;