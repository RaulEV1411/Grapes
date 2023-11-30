
import React from 'react';
import './Request.css';
const RequestInfo = ({subject_name, identification_number}) => {

    return (
    <div className="requestContainer">
        <h2 class="infoTitle">Información de las Solicitudes</h2>
        <div class="requestInfo">
            <p><strong>Número de Identificación:</strong> {identification_number}</p>
            <p><strong>Materia:</strong> {subject_name}</p>
    </div>
    </div>
    );
    };

export default RequestInfo;