import React, { useEffect, useState } from "react";
import "./RequestForm.css";
import { useNavigate } from "react-router-dom";
import BackButton from "../Back Button/BackButton";
import { jwtDecode } from "jwt-decode";
import { addPendingRole, fetchSubjects } from "../../api/api";
import { newRequest } from "../../api/api";
const RequestForm = () => {
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function getSubjects() {
    const obtainData = await fetchSubjects();
    setSubjects(obtainData);
    return obtainData;
  }

  useEffect(() => {
    getSubjects();
  }, []);

  useEffect(() => {
    if (formularioEnviado === true) {
      fechRequestAdmin();
    }
  }, [formularioEnviado]);

  const submitRequest = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.target);
    const obtainData = await newRequest(formData);
    try {
      setFlashMessage("Solicitud exitosa!");
      setFormularioEnviado(true);
      setTimeout(() => {
        navigate(-1);
      }, 4000);
    } catch (error) {
      console.error(error);
      setFlashMessage("Error al enviar la solicitud");
    } finally {
      setIsSubmitting(false);
      return obtainData
    };
  };

  const fechRequestAdmin = async () => {
    const decoded = jwtDecode(token);
    const userId = decoded.sub;
    addPendingRole(userId)
  };

  return (
    <div>
      {flashMessage && <div className="flash-success">{flashMessage}</div>}
      <form className="formularioUvas" onSubmit={submitRequest}>
        <BackButton />
        <h2 className="tituloFormulario">Solicitud</h2>
        <div className="campo">
          <label htmlFor="request[identification_number]">
            Número de Identificación:
          </label>
          <input
            className="campoTexto"
            type="text"
            id="request[identification_number]"
            name="request[identification_number]"
            required
          />
        </div>
        <div className="campo">
          <label htmlFor="request[subject_id]">Materia:</label>
          <select
            className="campoTexto"
            id="request[subject_id]"
            name="request[subject_id]"
            required
          >
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
        <div className="campo">
          <label htmlFor="request[id_person]">Fotografía de la Persona:</label>
          <input
            className="campoTexto"
            type="file"
            id="request[id_person]"
            name="request[id_person]"
            required
          />
        </div>
        <div className="campo">
          <label htmlFor="request[person_photo]">
            Fotografía de la Persona:
          </label>
          <input
            className="campoTexto"
            type="file"
            id="request[person_photo]"
            name="request[person_photo]"
            required
          />
        </div>
        <div className="campo">
          <label htmlFor="request[title_photo]">Fotografía del Título:</label>
          <input
            className="campoTexto"
            type="file"
            id="request[title_photo]"
            name="request[title_photo]"
            required
          />
        </div>
        <div className="campo">
          <label htmlFor="request[cv]">CV:</label>
          <input
            className="campoTexto"
            type="file"
            id="request[cv]"
            name="request[cv]"
            required
          />
        </div>
        <button className="botonSubmit" type="submit" disabled={isSubmitting}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default RequestForm;
