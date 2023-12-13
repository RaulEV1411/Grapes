import React, { useState, useReducer } from "react";
import Modal from "react-modal";
import "./requestCardShow.css";
import ApproveButton from "../Approve Admin/ApproveButton";
import BackButton from "../Back Button/BackButton";
import DeclineButton from "../Decline Admin/DeclineButton";

const PhotoModal = ({ src, alt }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <img src={src} alt={alt} onClick={() => setModalIsOpen(true)} />
      <Modal
  className="photo-modal"
  overlayClassName="overlay"
  isOpen={modalIsOpen}
  onRequestClose={() => setModalIsOpen(false)}
  contentLabel="Image Modal"
>
  <img className="modal-image" src={src} alt={alt} />
</Modal>

    </div>
  );
};

export { PhotoModal };

const RequestCardShow = ({
  first_name,
  last_name,
  email,
  birth_date,
  creation_date,
  subject_name,
  identification_number,
  user_name,
  id_person,
  person_photo,
  title_photo,
  cv,
  idUser,
  idUserDelete,
  role
}) => {
  return (
    <div className="showContainer">
      <BackButton />
      <h2 className="showTitle">Detalles del Show</h2>
      <div className="showInfo">
        <div className="personalInfo">
          <p>
            <strong>Nombre Completo:</strong> {[first_name, " ", last_name]}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Fecha de Nacimiento:</strong>{" "}
            {new Date(birth_date).toLocaleDateString()}
          </p>
          <p>
            <strong>Día de Creación:</strong>{" "}
            {new Date(creation_date).toLocaleDateString()}
          </p>
        </div>
        <div className="cvSection">
          <h3>Información del CV</h3>
          <ul>
            <li>
              <strong>Número de Identificación:</strong> {identification_number}
            </li>
            <li>
              <strong>Participante:</strong> {user_name}
            </li>
            <li>
              <strong>Materia:</strong> {subject_name}
            </li>
          </ul>
        </div>
        <div className="photos ">
          <div>
            <PhotoModal src={id_person} alt="ID Person" />
            <p className="photoTitle">ID Person</p>
          </div>
          <div>
            <PhotoModal src={person_photo} alt="Person" />
            <p className="photoTitle">Person Photo</p>
          </div>
          <div>
            <PhotoModal src={title_photo} alt="Title" />
            <p className="photoTitle">Title Photo</p>
          </div>
          <div>
            <a href={cv} target="_blank" rel="noopener noreferrer">
            <iframe src={cv} width="100%" height="240px">
              <p>Your browser does not support iframes.</p>
            </iframe>
            <p className="photoTitle">CV</p>
          </a>
          </div>
        </div>
      </div>
      <div className="request-button-container">
        <DeclineButton idUserDelete={idUserDelete} />
        {role === "pending_request" ? (
          <ApproveButton idUser={idUser} />
        ) : ( null )}
      </div>
    </div>
  );
};

export default RequestCardShow;
