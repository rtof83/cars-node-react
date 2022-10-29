import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../contexts/Contexts';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import api from '../api';

const Brand = () => {
  const [ user ] = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [values, setValues] = useState({ id: '', name: '' });

  const insertBrand = async () => {
    if (!values.name) {
      alert('Atenção! Os campos obrigatórios devem ser preenchidos.')
    } else {
      const brand = { name: values.name };

      const query = id ? api.put(`brands/${id}`, brand) : api.post('brands', brand);

        // query.headers = { 'Authorization': `Bearer ${user.token}` };

        console.log(id)

      await query
        .then(() => navigate('/listBrands'))
        .catch(e => {
          if (e.response.status === 419)
            alert('Marca existente na base de dados!');
        });
    };
  };

  const getBrand = async () => {
    if (id) {
      await api.get(`brands/${id}`)
        .then(({ data }) => {
          setValues({ id: data.id,
                      name: data.name });
        })
        .catch(e => console.log(e));
    };
  };

  useEffect(() => {
    getBrand();
  }, []);
    
  return (
    <div className="gridCustomer">

      <h3>Cadastro de Marcas</h3>

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

        <Button onClick={() => insertBrand()} variant="contained">Salvar</Button>

        <Link to={'/'}>
          <Button variant="contained">Cancelar</Button>
        </Link>
      </Grid>
    </div>
  );
};

export default Brand;
