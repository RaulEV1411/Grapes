import React from 'react';
import './cardSubject.css';


const backgroundImageMap = {
  1: '/background_Spanish.png',
  2: '/background_Math.jpg',
  3: '/background_Social_Studies.png',
  4: '/background_Science.png',
  6: '/background_French.png',
  5: '/background_English.png',
  // Añade más IDs e imágenes de fondo según sea necesario.
};

const backgroundColorMap = {
  1: '#FFF890',
  2: '#FB0C43',
  3: '#3E7BAA',
  4: '#C3E3BE',
  6: '#796F92',
  5: '#ECA0C3',
}

const CardSubject = ({ id }) => {
  // Busca la imagen de fondo para el ID del tema proporcionado.
  // Si no se encuentra ninguna imagen, se utilizará una imagen de fondo predeterminada.
  const backgroundImage = backgroundImageMap[id];
  const backgroundColor = backgroundColorMap[id]; 

  return (
    <div className="card">
      <div className="card-header" style={{ backgroundImage: `url(${backgroundImage})` , backgroundColor: `${backgroundColor}` }}>
      </div>
    </div>
  );
};

export default CardSubject;
