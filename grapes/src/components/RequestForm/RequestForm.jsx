import React, { useEffect, useState } from 'react';
import './RequestForm.css';
import { useNavigate } from 'react-router-dom';
import BackButton from '../Back Button/BackButton';
import { jwtDecode } from 'jwt-decode';


const RequestForm = ({ setSuccessMessage }) => {
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await fetch('http://localhost:3001/api/v1/subjects', {
        headers: {
          "content-type": "application/json",
          "authorization": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setSubjects(data);
    };

    fetchSubjects();
  }, []);


  const submitRequest = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.target);
    try {
      const response = await fetch('http://localhost:3001/api/v1/requests', {
        method: 'POST',
        headers: {
          "authorization": localStorage.getItem("token"),
        },
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error submitting request');
      }
      setFlashMessage('Solicitud exitosa!');
      setFormularioEnviado(true);
      setTimeout(() => {
        navigate(-1);
      }, 4000);
    } catch (error) {
      console.error(error);
      setFlashMessage('Error al enviar la solicitud');
    } finally {
      setIsSubmitting(false); // Habilita el botón de envío
    }
  };

  const fechRequestAdmin = async () => {
    const decoded = jwtDecode(token);
    const userId = decoded.sub;
    try {
      const response = await fetch(`http://localhost:3001/api/v1/users/${userId}/request_admin`, {
        method: 'POST',
        headers: {
          "content-type": "application/json",
          "authorization": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          id: userId,
        }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error submitting request');
      }
  
      // Aquí puedes manejar la respuesta exitosa
      console.log('Request sent successfully');
  
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
  if (formularioEnviado === true) {
    fechRequestAdmin();
  }
}, [formularioEnviado]);
  
  
  return (
  <div>
      {flashMessage && <div className="flash-success">{flashMessage}</div>}
    <form className="formularioUvas" onSubmit={submitRequest}>
      <BackButton />
      <h2 className="tituloFormulario">Solicitud</h2>
      <div className="campo">
        <label htmlFor="request[identification_number]">Número de Identificación:</label>
        <input className="campoTexto" type="text" id="request[identification_number]" name="request[identification_number]" required />
      </div>
      <div className="campo">
        <label htmlFor="request[subject_id]">Materia:</label>
        <select className="campoTexto" id="request[subject_id]" name="request[subject_id]" required>
          {subjects.map(subject => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>
      <div className="campo">
        <label htmlFor="request[id_person]">Fotografía de la Persona:</label>
        <input className="campoTexto" type="file" id="request[id_person]" name="request[id_person]" required />
      </div>
      <div className="campo">
        <label htmlFor="request[person_photo]">Fotografía de la Persona:</label>
        <input className="campoTexto" type="file" id="request[person_photo]" name="request[person_photo]" required />
      </div>
      <div className="campo">
        <label htmlFor="request[title_photo]">Fotografía del Título:</label>
        <input className="campoTexto" type="file" id="request[title_photo]" name="request[title_photo]" required />
      </div>
      <div className="campo">
        <label htmlFor="request[cv]">CV:</label>
        <input className="campoTexto" type="file" id="request[cv]" name="request[cv]" required />
      </div>
      <button className="botonSubmit" type="submit" disabled={isSubmitting}>Enviar</button>
    </form>
  </div>
  );
};

export default RequestForm;