import React, { useContext } from 'react';
import { UserContext } from '../contexts/Contexts';
import { Link, useNavigate } from "react-router-dom";
import CountDown from './CountDown';

const Header = () => {
    const [ user, setUser ] = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
      if (window.confirm('O usuário será desconectado!')) {
        setUser([]);
        localStorage.clear();
        navigate('/');
      };
    };

    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">

                {/* title */}
                <Link to={'/'}>
                    <div className="navbar-brand">Catálogo de Veículos</div>
                </Link>

                </div>
                
                <div className="collapse navbar-collapse" id="myNavbar">

                {/* show menu if authenticated */}
                { user.auth && <>
                <ul className="nav navbar-nav">

                    { user.access === 'admin' && <>
                        <li><Link to={'/car'}>Veículos</Link></li>
                        <li><Link to={'/brand'}>Marcas</Link></li>
                        <li><Link to={'/store'}>Lojas</Link></li>
                        <li><Link to={'/user'}>Usuários</Link></li>
                    </>}


                    <li><Link to={'/listCars'}>Lista Veículos</Link></li>
                    <li><Link to={'/listBrands'}>Lista Marcas</Link></li>
                    <li><Link to={'/listStores'}>Lista Lojas</Link></li>
                    <li><Link to={'/listUsers'}>Lista Usuários</Link></li>
                    
                </ul>
                </>}

                <ul className="nav navbar-nav navbar-right">
                    { user.auth && <li><a><CountDown /></a></li> }
                    
                    <li>
                        { !user.auth ?
                        <Link to={'/login'}><span className="glyphicon glyphicon-log-in"></span> Login</Link>
                        :
                        <a onClick={() => logout()}><span className="glyphicon glyphicon-log-in"></span> Logout</a>
                        }
                    </li>
                </ul>

                </div>
            </div>
        </nav>
    )
};

export default Header;
