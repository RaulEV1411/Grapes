import React, { useState } from 'react';
import Modal from 'react-modal';
import './CardContentCourse.css';

const CardContentCourse = ({ videoURL, imageUrls, documentURL, name, description }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="course-page">
      <div className="course-header">
        <h1 className="course-title">{name}</h1>
        <p className="course-subtitle">{description}</p>
      </div>

      <div className="content-section">
        <div className="section-container">
          <h2 className="section-title">Video</h2>
          <div className="video-container">
            <video controls className="course-video">
              <source src={videoURL} type="video/mp4" />
              Tu navegador no soporta el tag de video.
            </video>
          </div>
        </div>

        <div className="section-container document-container">
          <h2 className="section-title">Document</h2>
          <a href={documentURL} target="_blank" rel="noopener noreferrer">
            <iframe src={documentURL} className="course-iframe" title="Documento" />
            <p className="pdf-link">View PDF</p>
          </a>
        </div>
      </div>

      <div className="content-section">
        <div className="course-img-container">
          <h2 className="section-title">Images</h2>
          <div className="image-container">
            {imageUrls.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Imagen ${index + 1}`}
                className="course-image"
                onClick={() => setModalIsOpen(true)}
              />
            ))}
          </div>
        </div>
      </div>

      <Modal
        className="mi-modal-unico"
        overlayClassName="mi-overlay-unico"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Image Modal"
      >
        <img className="mi-imagen-modal-unico" src={imageUrls[0]} alt="Imagen" />
      </Modal>
    </div>
  );
};

export default CardContentCourse;

