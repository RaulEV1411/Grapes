import React from 'react'
import "./styles.css";
import { useNavigate } from 'react-router-dom';
import { approveAdmin } from '../../api/api';
const ApproveButton = ({idUser}) => {
    const navigate = useNavigate();
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