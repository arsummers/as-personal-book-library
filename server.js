'use strict';

//basic app setup
require('dotenv').config();
const express = require('express');
const app = express;
const pg = require('pg');

//lets the app know I'll be using ejs for server-side rendering
app.set('view engine', 'ejs');

const PORT = process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(express.static(./public));

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.log(err));

app.listen(PORT, ()=> console.log(`Library listenint on port ${PORT}`));