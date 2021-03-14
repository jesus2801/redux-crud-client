import React from 'react';
import {Link} from 'react-router-dom';
//styles
import '../styles/dist/app.min.css';

function Header() {
  return (
    <nav>
      <h1>
        <Link to="/">CRUD - React - Redux - REST API & Axios</Link>
      </h1>
      <Link to="/products/add" className="add-product">
        AGREGAR PRODCUTO
      </Link>
    </nav>
  );
}

export default Header;
