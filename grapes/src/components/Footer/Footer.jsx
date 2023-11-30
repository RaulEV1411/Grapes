import React from 'react';
import './Footer.css'; // Asegúrate de importar tu archivo de estilos

const Footer = () => {
    return (
        <footer className="footer-container">
        <div className="footer-content flexbox-col">
            <p className="footer-text">
            &copy; 2023 Tu Empresa. Todos los derechos reservados. | 
            <a href="mailto:info@tuempresa.com" className="footer-link"> Contacto</a>
            </p>
        </div>
        </footer>
    );
};

export default Footer;