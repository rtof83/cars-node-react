import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../contexts/Contexts';

import api from '../api';
import TableList from '../components/TableList';

const ListCars = () => {
  const navigate = useNavigate();
  const [ , setSearchContext ] = useContext(SearchContext);
  
  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ search, setSearch ] = useState('');
  const [ searchById, setSearchById ] = useState('');
  const [ searchByName, setSearchByName ] = useState('');
  const [ page, setPage ] = useState(1);

  const getData = async () => {
    setLoading(true);

    const query = !searchById ? '/search/cars?page=' + page + (searchByName ? '&name=' + searchByName : '') : 'search/cars?id=' + searchById;
    await api.get(query)
      .then(({ data }) => {
        data.length === undefined ? setData([data]) : setData(data);
      })
      .catch(e => {
        console.log(e);
        if (e.response.status === 400 || e.response.status === 422) setData([]);
      });

    setLoading(false);
  };

  useEffect(() => {
    setSearchContext({ id: 'ID', name: 'Nome do Veículo' });
  }, []);

  useEffect(() => {
    getData();
  }, [page, search]);

  const getDefault = () => {
    setSearchByName('');
    setSearchById('');
    setPage(1);
    setSearch('');
  };

  return (
    <>
      { TableList( 'Veículos',

                   [ { align: 'center', fieldName: 'ID', field: 'id' },
                     { align: 'left', fieldName: 'Nome', field: 'name' },
                     { align: 'left', fieldName: 'Marca', field: 'brand' },
                     { align: 'left', fieldName: 'Modelo', field: 'model' },
                     { align: 'center', fieldName: 'Preço', field: 'price' } ],

                   loading,

                   { searchById,
                     searchByName,
                     setSearch,
                     setSearchById,
                     setSearchByName,
                     getDefault },

                   api,
                   data, getData,
                   page, setPage,
                   navigate, 'car' )
      }
    </>
  );
}

export default ListCars;
