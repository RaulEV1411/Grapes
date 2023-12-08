
import React from 'react'
import "./styles.css";
const ApproveButton = ({idUser}) => {
    const submitRequest = async (event) => {
        event.preventDefault();

        const response = await fetch(`http://localhost:3001/api/v1/users/${idUser}/approve_admin`, {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: idUser })
        });

        const data = await response.json();
        
    }

    return (
        <div>
            <button className="button-aceptar" onClick={submitRequest}>Approve</button>
        </div>
    );
};

export default ApproveButton;