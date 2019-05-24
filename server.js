'use strict';

//basic app setup
require('dotenv').config();
const superagent = require('superagent');
const express = require('express');
const app = express();
const pg = require('pg');

//lets the app know I'll be using ejs for server-side rendering
app.set('view engine', 'ejs');

const PORT = process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.log(err));

app.listen(PORT, ()=> console.log(`Library listening on port ${PORT}`));

/////////////////////////////////////

app.get('/', (request, response) =>{
  response.render('./index');
});

function handle_error(err, response){
  console.error(err);
  if (response) response.status(500).send('You have achieved an error in your server');
}


function Book(title, first_name, last_name, genre){
  this.title = title;
  this.first_name = first_name;
  this.last_name = last_name;
  this.genre = genre;
  this.series = series;
}

//function insert_books_into_DB

//function display_books_from_db linking to separate page