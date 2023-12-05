
import React from 'react'

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
        console.log(data);
    }

    return (
        <div>
            <button onClick={submitRequest}>Approve</button>
        </div>
    );
};

export default ApproveButton;