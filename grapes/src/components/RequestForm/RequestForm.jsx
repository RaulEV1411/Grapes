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

  // The 'handleSubmit' function is an event handler for the form submit event.
  // It prevents the default action of the event.
  // It sets 'isSubmitting' to true.
  // It creates a new FormData object from the form element.
  // It calls the 'newRequest' function, passing in the 'formData'.
  // It sets a success flash message and navigates back to the previous page after 4 seconds.
  // If an error occurs, it sets an error flash message.
  // Finally, it sets 'isSubmitting' to false and returns the response from the 'newRequest' function.
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
      return obtainData;
    }
  };

  // The 'fechRequestAdmin' function is an asynchronous function that adds a pending role to the user.
  // It decodes the 'token' to get the 'userId'.
  // It calls the 'addPendingRole' function, passing in the 'userId'.
  const fechRequestAdmin = async () => {
    const decoded = jwtDecode(token);
    const userId = decoded.sub;
    addPendingRole(userId);
  };
  return (
    <div className="pricipalNewRequest">
      {flashMessage && <div className="flash-success">{flashMessage}</div>}
      <form className="formularioUvas" onSubmit={submitRequest}>
        <BackButton />
        <h2 className="tituloFormulario">Request</h2>
        <div className="campo-group">
          <div className="campo">
            <label htmlFor="request[identification_number]">
              Identification Number:
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
            <label htmlFor="request[subject_id]">Subject:</label>
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
        </div>

        <div className="campo-group">
          <div className="campo">
            <label htmlFor="request[id_person]">ID photo:</label>
            <div className="campoImagen">
              <img src="/tarjeta-de-identificacion.png" alt="Imagen 1" />
              <input
                className="campoTexto"
                type="file"
                id="request[id_person]"
                name="request[id_person]"
                required
              />
            </div>
          </div>

          <div className="campo">
            <label htmlFor="request[person_photo]">Person photo:</label>
            <div className="campoImagen">
              <img src="/id-facial.png" alt="Imagen 2" />
              <input
                className="campoTexto"
                type="file"
                id="request[person_photo]"
                name="request[person_photo]"
                required
              />
            </div>
          </div>

          <div className="campo">
            <label htmlFor="request[title_photo]">Fotografía del Título:</label>
            <div className="campoImagen">
              <img src="/certificado.png" alt="Imagen 3" />
              <input
                className="campoTexto"
                type="file"
                id="request[title_photo]"
                name="request[title_photo]"
                required
              />
            </div>
          </div>

          <div className="campo">
            <label htmlFor="request[cv]">CV:</label>
            <div className="campoImagen">
              <img src="/cv.png" alt="Imagen 4" />
              <input
                className="campoTexto"
                type="file"
                id="request[cv]"
                name="request[cv]"
                required
              />
            </div>
          </div>
        </div>

        <button className="botonSubmit" type="submit" disabled={isSubmitting}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default RequestForm;
