import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">Portfolio</Link>
      <div className="navbar-nav">
        <Link className="nav-link" to="/projects">Projects</Link>
        <Link className="nav-link" to="/contact">Contact</Link>
      </div>
    </nav>
  );
}

export default Header;