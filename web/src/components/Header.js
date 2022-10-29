import React, { useContext } from 'react';
import { UserContext } from '../contexts/Contexts';
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const [ user, setUser ] = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
      if (window.confirm('O usuário será desconectado!')) {
        setUser([]);
        navigate('/');
      };
    };

    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">

                {/* title */}
                <Link to={'/'}>
                    <div className="navbar-brand">Catálogo de Carros</div>
                </Link>

                </div>
                
                <div className="collapse navbar-collapse" id="myNavbar">

                {/* show menu if authenticated */}
                { user.auth && <>
                <ul className="nav navbar-nav">

                    <li class="dropdown"><Link to="">Cadastros</Link>
                        <div class="dropdown-content">
                            <li><Link to={'/car'}>Carros</Link></li>
                            <li><Link to={'/brand'}>Marcas</Link></li>
                            <li><Link to={'/store'}>Lojas</Link></li>
                            <li><Link to={'/user'}>Usuários</Link></li>
                        </div>
                    </li>

                    <li class="dropdown"><Link to="">Listas</Link>
                        <div class="dropdown-content">
                            <li><Link to={'/listCars'}>Carros</Link></li>
                            <li><Link to={'/listBrands'}>Marcas</Link></li>
                            <li><Link to={'/listStores'}>Lojas</Link></li>
                            <li><Link to={'/listUsers'}>Usuários</Link></li>
                        </div>
                    </li>
                    
                </ul>
                </>}

                <ul className="nav navbar-nav navbar-right">
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
