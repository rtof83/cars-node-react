import React, { useContext, useEffect, useState } from 'react';
import api from '../api';
import Card from "../components/Card";
import { UserContext } from '../contexts/Contexts';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {
    const [ data, setData ] = useState([]);
    const [ user, setUser ] = useContext(UserContext);

    const [ loading, setLoading ] = useState(false);

    let userStorage = {};

    const getProducts = async () => {
      setLoading(true);

      await api.get('cars')
        .then(({ data }) => {
            setData(data);
        })
        .catch(e => console.log(e));

        setLoading(false);
    };

    const getCountDown = async () => {
      await api.post('validate')
        .then(({ data }) => {
    
          if (!userStorage) {
            setUser({...user, exp: data.exp});
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
      userStorage = JSON.parse(localStorage.getItem('login'));
      
      if (userStorage) {
        api.defaults.headers.common = {'authorization': `Bearer ${userStorage.token}`};
        setUser(userStorage);
      };

      getCountDown();
    };

    useEffect(() => {
      getProducts();
      checkUser();
    }, []);

    return (
        <> 
            <div className="container text-center">
                { user.name && <><h3>Olá {user.name}</h3><br /></> }

                { loading ? <h3><CircularProgress /></h3> : <>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        { data.map((item, index) => (
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
                </> }
            </div>
        </>
    )
};

export default Home;
