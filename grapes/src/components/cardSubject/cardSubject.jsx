import React from 'react';
import './cardSubject.css';

const CardSubject = ({ title }) => {
    return (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">{title}</h2>
          </div>
        </div>
      );
    };

export default CardSubject;