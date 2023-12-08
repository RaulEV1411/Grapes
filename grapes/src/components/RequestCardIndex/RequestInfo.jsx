
import React from 'react';
import './Request.css';
const RequestCardIndex = ({ subject_name, identification_number, user_name, id_person, person_photo, title_photo, cv }) => {

    return (
        
        <div className="requestContainer">
            <h2 className="infoTitle">Información de las Solicitudes</h2>
            <div className="requestInfo">
                <p><strong>Número de Identificación:</strong> {identification_number}</p>
                <p><strong>Postulante:</strong> {user_name}</p>
                <p><strong>Materia:</strong> {subject_name}</p>
            </div>
        </div>
    );
};

export default RequestCardIndex;