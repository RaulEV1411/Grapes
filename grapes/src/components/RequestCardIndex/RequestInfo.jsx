
import React from 'react';
import './Request.css';
const RequestCardIndex = ({ subject_name, identification_number, user_name, id_person, person_photo, title_photo, cv }) => {

    return (
        
        <div className="requestContainer">
            <h2 className="infoTitle">Request Information</h2>
            <div className="requestInfo">
                <p><strong>Identification number:</strong> {identification_number}</p>
                <p><strong>Postulant:</strong> {user_name}</p>
                <p><strong>Materia:</strong> {subject_name}</p>
            </div>
        </div>
    );
};

export default RequestCardIndex;