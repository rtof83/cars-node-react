import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../contexts/Contexts';
import api from '../api';
import TableList from '../components/TableList';

const ListBrands = () => {
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

    // const query = !searchById ? 'orders?page=' + page + (searchByName ? '&customer=' + searchByName : '') : 'orders/' + searchById;
    await api.get('brands')
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
    setSearchContext({ id: 'id', name: 'Nome da Marca' });
  }, []);
  
  useEffect(() => {    
    getData();
  }, [page, search]);

  const getDefault = () => {
    setSearchById('');
    setSearchByName('');
    setPage(1);
    setSearch('');
  };

  return (
    <>
      { TableList( 'Marcas',

                   [ { align: 'center', fieldName: 'ID', field: 'id' },
                     { align: 'left', fieldName: 'Nome', field: 'name' } ],

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
                   navigate, 'brand' )
      }
    </>
  );
};

export default ListBrands;
