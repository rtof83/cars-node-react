// initial config
const express = require('express');
const cors = require('cors');
const { app } = require('./database/conn');

app.use(express.json());
app.use(cors());

// brand routes
const brandRoutes = require('./routes/brandRoutes');
app.use('/brands', brandRoutes);

// store routes
const storeRoutes = require('./routes/storeRoutes');
app.use('/stores', storeRoutes);

// car routes
const carRoutes = require('./routes/carRoutes');
app.use('/cars', carRoutes);
