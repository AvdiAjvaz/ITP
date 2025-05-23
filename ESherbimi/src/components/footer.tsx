import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer>
      <div className="container">
        <p>&copy; {currentYear} E-Shërbimi Qytetar. Të gjitha të drejtat e rezervuara.</p>
        <div className="footer-links">
          <Link to="/kontakt">Kontakt</Link> | 
          <a href="#" target="_blank" rel="noopener noreferrer"> Privatësia </a> | 
          <a href="#" target="_blank" rel="noopener noreferrer"> Kushtet e përdorimit</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;