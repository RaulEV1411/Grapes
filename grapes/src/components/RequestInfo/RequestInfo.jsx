
import React from 'react';
import './Request.css';
const RequestInfo = ({subject_name, identification_number, user_name, image}) => {

    return (
    <div className="requestContainer">
        <h2 class="infoTitle">Información de las Solicitudes</h2>
        <div class="requestInfo">
            <p><strong>Número de Identificación:</strong> {identification_number}</p>
            <p><strong>Postulante:</strong> {user_name}</p>
            <p><strong>Materia:</strong> {subject_name}</p>
            <img src={image} alt="" />
        </div>
    </div>
    );
    };

export default RequestInfo;