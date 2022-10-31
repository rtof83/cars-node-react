import React, { useState } from 'react';

import Home from './pages/home';
import Car from './pages/car';
import Brand from './pages/brand';
import Store from './pages/store';

import ListCars from './lists/listCars';
import ListBrands from './lists/listBrands';
import ListStores from './lists/listStores';
import ListUsers from './lists/listUsers';

import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import User from './pages/user';

import NotFound from './pages/notFound';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchContext, UserContext} from './contexts/Contexts';

const App = () => {
  const [ user, setUser ] = useState([]);
  // const [ list, setList ] = useState([]);
  const [ search, setSearch ] = useState([]);

  return (
    <UserContext.Provider value={[ user, setUser ]}>
    {/* <ListContext.Provider value={[ list, setList ]}> */}
    <SearchContext.Provider value={[ search, setSearch ]}>

      <Router>
        <Header />
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />

            { user.auth && <>
              <Route path='/car' element={<Car />} />
              <Route path='/car/:id' element={<Car />} />

              <Route path='/brand' element={<Brand />} />
              <Route path='/brand/:id' element={<Brand />} />

              <Route path='/store' element={<Store />} />
              <Route path='/store/:id' element={<Store />} />

              <Route path='/user' element={<User />} />
              <Route path='/user/:id' element={<User />} />

              <Route path='/listCars' element={<ListCars />} />
              <Route path='/listBrands' element={<ListBrands />} />
              <Route path='/listStores' element={<ListStores />} />
              <Route path='/listusers' element={<ListUsers />} />
            </> }

            <Route path='*' exact={true} element={<NotFound />} />

          </Routes>
        <Footer />
      </Router>

    </SearchContext.Provider>
    {/* </ListContext.Provider> */}
    </UserContext.Provider>
  )
};

export default App;
