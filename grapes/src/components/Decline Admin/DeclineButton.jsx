import React from 'react'
import { useNavigate } from 'react-router-dom';
import './styles.css'

const DeclineButton = ({idUserDelete}) => {
    const navigate = useNavigate()
    const submitRequest = async (event) => {
        event.preventDefault();
        try {
            
        const response = await fetch(`http://localhost:3001/api/v1/users/${idUserDelete}/decline_request`, {
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: idUserDelete })
        });
        navigate("/request_teacher") 
    }catch(error){
        console.log(error);
    }
};

    return (
        <div>
            <button className="button-declinar" onClick={submitRequest} >Declinar</button>
        </div>
    );
};

export default DeclineButton;
