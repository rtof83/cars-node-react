import React, { useContext, useEffect, useState } from 'react';
import api from '../api';
import CardFood from "../components/Card";
import { UserContext } from '../contexts/Contexts';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {
    const [ data, setData ] = useState([]);
    const [ user ] = useContext(UserContext);

    const [ loading, setLoading ] = useState(false);

    const getProducts = async () => {
        setLoading(true);

        await api.get('cars')
            .then(({ data }) => {
                console.log(data);
                setData(data);
            })
            .catch(e => console.log(e));

            setLoading(false);
    };

    useEffect(() => {
        console.log(user.token);
        getProducts();
        api.defaults.headers.common = {'authorization': `Bearer ${user.token}`};
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
                            <CardFood id={item.id}
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
