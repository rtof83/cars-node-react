import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import api from '../api';

const Store = () => {
    const [values, setValues] = useState({ id: '',
                                           name: '' });

    const navigate = useNavigate();
    const { id } = useParams();
   
    const insertStore = async () => {
      if (!values.name) {
        alert('Atenção! Os campos obrigatórios devem ser preenchidos.')
      } else {
        const store = { name: values.name };

        const query = id ? api.put(`stores/${id}`, store) : api.post('stores', store);
        await query
          .then(() => navigate('/listStores'))
          .catch(e => {
            if (e.response.status === 419)
              alert('Loja existente na base de dados!');
          });
      };
    };

    const getStore = async () => {
      if (id) {
        await api.get(`stores/${id}`)
          .then(({ data }) => {
            setValues({ id: data.id,
                        name: data.name });
          })
          .catch(e => console.log(e));
      };
    };

    useEffect(() => {
      getStore();
    }, []);
    
      return (
        <div className="gridCustomer">

          <h3>Cadastro de Lojas</h3>

          <Grid gap={3}
                container
                direction="column"
                justifyContent="space-evenly"
                alignItems="stretch"
                className="gridCustomer">

              { id && <TextField id="txtId" label="ID" variant="outlined" value={values.id} disabled /> }
              <TextField id="txtName" label="Nome" variant="outlined" value={values.name} onChange={e => setValues({...values, name: e.target.value})} />

          </Grid>

          <Grid gap={3}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                className="gridButton">

            <Button onClick={() => insertStore()} variant="contained">Salvar</Button>

            <Link to={'/'}>
              <Button variant="contained">Cancelar</Button>
            </Link>
          </Grid>
        </div>
      );
};

export default Store;
