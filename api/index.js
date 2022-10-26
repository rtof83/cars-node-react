// initial config
const express = require('express');
const cors = require('cors');
const { app } = require('./database/conn');

app.use(express.json());
app.use(cors());

