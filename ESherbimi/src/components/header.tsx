import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <div className="container">
        <Link to="/" className="logo">E-Shërbimi</Link>
        
        <div className="menu-toggle" onClick={toggleMenu}>
          ☰
        </div>

        <ul className={`menu ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/">Ballina</Link></li>
          <li><Link to="/sherbimi-dokumente">Dokumentet</Link></li>
          <li><Link to="/pagesa-online">Pagesat</Link></li>
          <li><Link to="/rezervim-takimi">Rezervo</Link></li>
          <li><Link to="/raportim-probleme">Raporto</Link></li>
          <li><Link to="/kontakt">Kontakt</Link></li>
          <li><a href="#" className="logout-btn" onClick={handleLogout}>Dilni</a></li>
        </ul>
      </div>
    </header>
  );
};

export default Header;