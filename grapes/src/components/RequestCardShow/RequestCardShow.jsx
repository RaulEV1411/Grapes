// Show.js

import React from 'react';
import './requestCardShow.css';

const RequestCardShow = ({ first_name,last_name, email, birth_date, dia_de_creacion, subject_name, identification_number, user_name, id_person, person_photo, title_photo, cv }) => {
  return (
    <div className="showContainer">
      <h2 className="showTitle">Detalles del Show</h2>
      <div className="showInfo">
        <div className="personalInfo">
          <p><strong>Nombre Completo:</strong> {[first_name," ",last_name]}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Fecha de Nacimiento:</strong> {birth_date}</p>
          <p><strong>Día de Creación:</strong> {dia_de_creacion}</p>
        </div>
        <div className="cvSection">
          <h3>Información del CV</h3>
          <ul>
            <li><strong>Número de Identificación:</strong> {identification_number}</li>
            <li><strong>Participante:</strong> {user_name}</li>
            <li><strong>Materia:</strong> {subject_name}</li>
          </ul>
        </div>
        <div className="photos">
          <div className="photoContainer">
            <img src={id_person} alt="ID Person" />
            <p className="photoTitle">ID Person</p>
          </div>
          <div className="photoContainer">
            <img src={person_photo} alt="Person" />
            <p className="photoTitle">Person Photo</p>
          </div>
          <div className="photoContainer">
            <img src={title_photo} alt="Title" />
            <p className="photoTitle">Title Photo</p>
          </div>
          <div className="photoContainer">
            <img src={cv} alt="CV" />
            <p className="photoTitle">CV</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default RequestCardShow;

