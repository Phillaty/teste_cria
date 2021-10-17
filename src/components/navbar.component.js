import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/nav.css';
import '../css/corpo.css';

export default class Navbar extends Component {

    render() {
        return (

            <div className="css-navbar">

                <Link to="/" className="css-navbar-item">
                    <i class="fas fa-palette"></i>
                    <p>Ver materiais</p>
                </Link>

                <Link to="/materiais" className="css-navbar-item">
                    <i class="fas fa-user-cog"></i>
                    <p>Administrar materiais</p>
                </Link>

                <Link to="/brand" className="css-navbar-item">
                    <i class="fas fa-copyright"></i>
                    <p>Administrar marcas</p>
                </Link>

                <Link to="/create" className="css-navbar-item">
                    <i class="fas fa-plus"></i>
                    <p>Cadastrar materiais</p>
                </Link>

            </div>

        );
    }
}