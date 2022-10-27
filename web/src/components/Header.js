import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">

                <Link to={'/'}>
                    <div className="navbar-brand">Catálogo de Carros</div>
                </Link>

                </div>
                <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="nav navbar-nav">
                    <li><Link to={'/car'}>Carros</Link></li>
                    <li><Link to={'/brand'}>Marcas</Link></li>
                    <li><Link to={'/store'}>Lojas</Link></li>
                    <li><Link to={'/listCars'}>Lista Carros</Link></li>
                    <li><Link to={'/listBrands'}>Lista Marcas</Link></li>
                    <li><Link to={'/listStores'}>Lista Lojas</Link></li>
                </ul>

                <ul className="nav navbar-nav navbar-right">
                    {/* <li><Link to={'/cart'}><span className="glyphicon glyphicon-shopping-cart"></span></Link></li> */}
                    <li><Link to={'/login'}><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
                </div>
            </div>
        </nav>
    )
};

export default Header;
