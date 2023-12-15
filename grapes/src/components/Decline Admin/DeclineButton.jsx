import React from 'react'
import { useNavigate } from 'react-router-dom';
import './styles.css'
import {rejectRequest} from '../../api/api'
const DeclineButton = ({idUserDelete}) => {
    const navigate = useNavigate();

    const submitRequest = async (event) => {
        event.preventDefault();
        rejectRequest(idUserDelete)
        navigate("/request_teacher")
    }
    return (
        <div>
            <button className="button-declinar" onClick={submitRequest} >Declinar</button>
        </div>
    );
    };

export default DeclineButton;
