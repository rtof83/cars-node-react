import React, { useContext, useEffect, useState } from 'react';
import api from '../api';
import Card from '../components/Card';
import CountPage from '../components/CountPage';
import { UserContext } from '../contexts/Contexts';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { StyledTableCell } from '../components/StyledTable';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const Home = () => {
  const [ data, setData ] = useState([]);
  const [ user, setUser ] = useContext(UserContext);

  const [ loading, setLoading ] = useState(false);
  const [ page, setPage ] = useState(1);
  const [ brand, setBrand ] = useState([]);
  const [ store, setStore ] = useState([]);
  const [ values, setValues ] = useState({ brandId: '', storeId: ''});

  let userStorage = JSON.parse(localStorage.getItem('login'));

  const getCountDown = async () => {
    await api.post('validate')
      .then(() => {
        if (!userStorage) {
          setUser(user);
          localStorage.setItem('login', JSON.stringify(user));
        };
      })
      .catch(e => {
        if (e.response.status === 401)
          localStorage.clear();
              
        console.log(e);
      });
  };

  const checkUser = () => {
    if (userStorage) {
      api.defaults.headers.common = {'authorization': `Bearer ${userStorage.token}`};
      setUser(userStorage);

      getCountDown();
    };
  };

  const getCars = async () => {
    setLoading(true);

    const query = 'search/cars?page=' + page + (values.brandId ? `&brandId=${values.brandId}` : (values.storeId ? `&storeId=${values.storeId}` : ''));
    await api.get(query)
      .then(({ data }) => {
        data.length === undefined ? setData([data]) : setData(data);
      })
      .catch(e => console.log(e));

    setLoading(false);
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
    getCars();
    getStore();
    getBrand();
    checkUser();
  }, []);

  useEffect(() => {
    getCars();
  }, [page, values]);

  return (
    <> 
      <div className="container text-center">
        { user.name && <><h3>Olá {user.name}</h3></> }

        { loading ? <h3><CircularProgress /></h3> : <>

        <FormControl sx={{ mx: 2, display: 'inline' }}>
          <FormControl sx={{ width: 200, mx: 2, my: 3 }}>
            <InputLabel id="lblBrand">Filtrar por Marca</InputLabel>
            <Select
              labelId="lblBrand"
              id="sltBrand"
              value={values.brandId}
              label="Marca"
              onChange={e => {
                setValues({...values, brandId: e.target.value});
                setPage(1);
              }}
            >            
              { brand.map(item => 
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>) }
            </Select>
          </FormControl>

          <FormControl sx={{ width: 200, mx: 2, my: 3 }}>
            <InputLabel id="lblStore">Filtrar por Loja</InputLabel>
            <Select
              labelId="lblStore"
              id="sltStore"
              value={values.storeId}
              label="Loja"
              onChange={e => {
                setPage(1);
                setValues({...values, storeId: e.target.value});
              }}
            >            
              { store.map(item => 
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>) }
            </Select>
          </FormControl>

          <FormControl sx={{ mx: 3, my: 3 }}>
            <Button variant='contained' onClick={() => {
              setPage(1);
              setValues({...values, brandId: '', storeId: ''});
            }}>Todos os registros</Button>
          </FormControl>
        </FormControl>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            { data.map((item, index) => (
            !item.page &&
            <Grid item xs={2} sm={4} md={4} key={index}>
                <Card id={item.id}
                      image={item.image}
                      name={item.name}
                      desc={item.desc}
                      price={item.price} />
            </Grid>
            ))}
          </Grid>
        </Box>


        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700, mt: 3 }} aria-label="customized table">
            <TableBody>

              {data && data.map((item) => (
                item.page &&
              <StyledTableCell colSpan={7} align="center">
                    <Button sx={{ mr: 1.5 }} variant="outlined" onClick={() => CountPage('decrease', page, data, setPage)}>{'<'}</Button>Página {item.page} de {item.from}
                    <Button sx={{ ml: 1.5 }} variant="outlined" onClick={() => CountPage('increase', page, data, setPage)}>{'>'}</Button>
                  </StyledTableCell>
              ))}

            </TableBody>
          </Table>
        </TableContainer>
          </> }
      </div>
    </>
  );
};

export default Home;
