import React from 'react';
import './profileCard.css';
import BackButton from '../Back Button/BackButton';
const ProfileCard = ({ first_name, last_name, email, birth_date, age, role, subject, profile_picture, phone_number, linkedin, residence, title_photo,roles }) => {
    return (
      <div className="profileContainer">
         <BackButton />
        <div className="profileHeader">
          <img src={profile_picture || "/_116ddce7-a1f7-40b1-878c-39b8823e884a.jpg" } alt="Profile" className="profilePicture" />
          <h2 className="profileName">{`${first_name} ${last_name}`}</h2>
        </div>
        <div className="profileInfo">
          <h3>Información de contacto:</h3>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Número de Teléfono:</strong> {phone_number}</p>
          <p><strong>LinkedIn:</strong> {linkedin}</p>
        </div>
        <div className="profileInfo">
          <h3>Información Personal:</h3>
          <p><strong>Edad:</strong> {age}</p>
          <p><strong>Fecha de Nacimiento:</strong> {new Date(birth_date).toLocaleDateString()}</p>
          <p><strong>Lugar de Residencia:</strong> {residence}</p>
          <p><strong>Tipo de Usuario:</strong> {roles === "admin" ? "Teacher" : roles}</p>
        </div>
        {role === 'admin' &&
          <div className="profileInfo">
            <h3>Formación Profesional:</h3>
            <p><strong>Materia:</strong> {subject}</p>
            {title_photo && <img src={title_photo} alt="Title" className="titlePhoto" />}
          </div>
        }
      </div>
    );
  };
  
  export default ProfileCard;
