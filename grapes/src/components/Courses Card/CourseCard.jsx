import React from 'react';
import './CourseCard.css';  // Asegúrate de tener un archivo CSS correspondiente

function CourseCard({ imagenFondo, imagenProfesor, name, description }) {
  const defaultImage = "/_c303bb14-d24a-4107-8fe4-e1ffffbfd094.jpg"; // URL de la imagen por defecto
  return (
    <div className="course-card" style={{ backgroundImage: `url(${imagenFondo || defaultImage })` }}>
      <div className="course-card-header">
        <img className="course-professor-image" src={imagenProfesor || "/_116ddce7-a1f7-40b1-878c-39b8823e884a.jpg"} alt="Imagen del Profesor" />
        <h2 className="course-title">{name}</h2>
      </div>
      <div className="course-card-body">
        <p className="course-description">{description}</p>
      </div>
    </div>
  );
}

export default CourseCard;


