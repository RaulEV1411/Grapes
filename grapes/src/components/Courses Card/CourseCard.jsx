import React, { useState } from 'react';
import './CourseCard.css';  // Asegúrate de tener un archivo CSS correspondiente
import { editCourse } from '../../api/api';
function CourseCard({ imagenFondo, imagenProfesor, name, description, isAdmin, isModerator,user_id,id,course_id }) {
  const [ editMode, setEditMode ] = useState(false);
  const [ courseData, setCourseData ] = useState({name: name, description: description});  

  const editar = (event) => {
    event.preventDefault();
    setEditMode(true);
  }

  const guardar = (event) => {
    event.preventDefault();
    setEditMode(false);
    editCourse(courseData,course_id);
  }

  const defaultImage = "/_c303bb14-d24a-4107-8fe4-e1ffffbfd094.jpg"; // URL de la imagen por defecto
  return (
    <div className="course-card" style={{ backgroundImage: `url(${imagenFondo || defaultImage })` }}>
      <div className="course-card-header">
        <img className="course-professor-image" src={imagenProfesor || "/_116ddce7-a1f7-40b1-878c-39b8823e884a.jpg"} alt="Imagen del Profesor" />
        {editMode === true ? (
        <input className='inputEditar' onChange={(event)=>{setCourseData({name:event.target.value,...courseData})}} value={courseData.name} type="text" placeholder='test' onClick={(event) => event.preventDefault()} />
        ) : (
          <h2 className="course-title">{name}</h2>
        )}
      </div>
      <div className="course-card-body">
        <p className="course-description">{description}</p>
        {isAdmin === true &&  user_id === id || isModerator && editMode === false ? (
          <button onClick={editar}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
          </svg>
          </button>): <></>};
        {editMode === true ? (
        <button onClick={guardar}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy" viewBox="0 0 16 16">
            <path d="M11 2H9v3h2z"/>
            <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"/>
          </svg>
        </button>): <></>};
      </div>
    </div>
  );
}

export default CourseCard;


