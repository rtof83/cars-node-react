import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import CheckCPF from '../components/CheckCPF';
import InputMask from 'react-input-mask';

import api from '../api';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Car = () => {
    const [ values, setValues ] = useState({ name: '',
                                             model: '',
                                             price: '',
                                             km: '',
                                             desc: '',
                                             image: '',
                                             brandId: '',
                                             storeId: '' });

    const navigate = useNavigate();
    const { id } = useParams();

    // const [ payment, setPayment ] = useState('');
    const [ brand, setBrand ] = useState([]);
    const [ store, setStore ] = useState([]);

    const insertCar = async () => {
      // const cpf = values.cpf.replace(/[^\w\s]/gi, '');
      // if (!CheckCPF(cpf))
      //   return alert('CPF inválido!');

      if (!values.name || !values.model || !values.price) {
        alert('Atenção! Os campos obrigatórios devem ser preenchidos.');
      } else {
        const car = { name: values.name,
                      model: values.model,
                      price: values.price,
                      km: values.km,
                      image: values.image,
                      desc: values.desc,
                      brandId: values.brandId,
                      storeId: values.storeId };

        const query = id ? api.put(`cars/${id}`, car) : api.post('cars', car);
        console.log(query);
        await query
          .then(() => navigate('/listCars'))
          .catch(e => {
            if (e.response.status === 419)
              alert('Carro existente na base de dados!');
          });
      };
    };

    const getCustomer = async () => {
      if (id) {
        await api.get(`cars/${id}`)
          .then(({ data }) => {
            setValues({ name: data.name,
                        model: data.model,
                        price: data.price,
                        km: data.km,
                        image: data.image,
                        desc: data.desc,
                        brandId: data.brandId,
                        storeId: data.storeId });
          })
          .catch(e => console.log(e));
      };
    };

    const getBrand = async () => {
      await api.get(`brands`)
        .then(({ data }) => {
          setBrand(data);
        })
        .catch(e => console.log(e));
    };

    const getStore = async () => {
      await api.get(`stores`)
        .then(({ data }) => {
          setStore(data);
        })
        .catch(e => console.log(e));
    };

    useEffect(() => {
      getBrand();
      getStore();
      getCustomer();
    }, []);
    
    return (
      <>
      <h3>Cadastro de Carros</h3>

      <div className="gridCustomer">

      <Grid gap={3}
            container
            direction="column"
            justifyContent="space-evenly"
            alignItems="stretch"
            className="gridCustomer">

          <FormControl sx={{ mx: 7, display: 'inline' }}>
            <FormControl sx={{ width: 300, mx: 3 }}>
              <InputLabel id="lblBrand">Marca</InputLabel>
              <Select
                labelId="lblBrand"
                id="sltBrand"
                value={values.brandId}
                label="Marca"
                onChange={e => setValues({...values, brandId: e.target.value})}
              >            
                { brand.map(item => 
                  <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>) }
              </Select>
            </FormControl>

            <FormControl sx={{ width: 300, mx: 3 }}>
              <InputLabel id="lblStore">Loja</InputLabel>
              <Select
                labelId="lblStore"
                id="sltStore"
                value={values.storeId}
                label="Loja"
                onChange={e => setValues({...values, storeId: e.target.value})}
              >            
                { store.map(item => 
                  <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>) }
              </Select>
            </FormControl>
          </FormControl>

          { id && <TextField id="txtId" label="Id" variant="outlined" value={id} disabled /> }
          <TextField required id="txtName" label="Nome" variant="outlined" value={values.name} onChange={e => setValues({...values, name: e.target.value})} />           

          <InputMask value={values.model} onChange={e => setValues({...values, model: e.target.value})} mask="9999" maskChar=" ">
            {() => <TextField required id="txtModel" label="Modelo (Ano)" variant="outlined" />}
          </InputMask>

          <TextField required type="number" id="txtPrice" label="Preço" variant="outlined" value={values.price} onChange={e => setValues({...values, price: e.target.value})} />
          <TextField id="txtKM" type="number" label="KM" variant="outlined" value={values.km} onChange={e => setValues({...values, km: e.target.value})} />
          <TextField id="txtDesc" label="Descrição" variant="outlined" value={values.desc} onChange={e => setValues({...values, desc: e.target.value})} />
          <TextField id="txtImage" label="Imagem" variant="outlined" value={values.image} onChange={e => setValues({...values, image: e.target.value})} />
      
      </Grid>

      <Grid gap={3}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            className="gridButton">

        <Button onClick={() => insertCar()} variant="contained">Salvar</Button>

        <Link to={'/'}>
          <Button variant="contained">Cancelar</Button>
        </Link>
      </Grid>
      </div>
      </>
    );
};

export default Car;
