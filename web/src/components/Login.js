import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/Contexts';
import api from '../api';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Login = () => {
    const [ values, setValues ] = useState({ email: '', password: '' });
    const [ , setUser ] = useContext(UserContext);

    const navigate = useNavigate();

    const getUser = async () => {
        await api.post('login', { name: values.name, password: values.password })
          .then(({ data }) => {
            // data.exp = '';
            setUser(data);
            // console.log(data)
            // localStorage.setItem('login', JSON.stringify(data));
            api.defaults.headers.common = {'authorization': `Bearer ${data.token}`};
            navigate('/');
          })
          .catch(e => {
            if (e.response.status === 401) {
              alert('Usuário ou senha inválidos!');
              setUser([]);
            };
            console.log(e);
          });
        };
    
      return (
        <>
        <h3>Login</h3>

        <div className="gridLogin">

        <Grid gap={3}
              container
              direction="column"
              justifyContent="space-evenly"
              alignItems="stretch"
              className="gridCustomer">

            <TextField id="txtUser" label="Usuário" variant="outlined" value={values.name} onChange={e => setValues({...values, name: e.target.value})} />
            <TextField id="txtPassword" label="Senha" variant="outlined" type="password" value={values.password} onChange={e => setValues({...values, password: e.target.value})} onKeyDown={e => e.key === 'Enter' && getUser()} />
        
        </Grid>

        <Grid gap={3}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className="gridButton">

            <Button onClick={() => getUser()} variant="contained">Continuar</Button>
        </Grid>
        </div>
        </>
      );
};

export default Login;
