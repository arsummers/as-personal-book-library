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

app.get('*', (request, response => response.status(404).send('go away this route is not home')));

function handle_error(err, response){
  console.error(err);
  if (response) response.status(500).send('You have achieved an error in your server');
}


function Book(title, first_name, last_name, genre, series){
  this.title = title;
  this.first_name = first_name;
  this.last_name = last_name;
  this.genre = genre;
  this.series = series;
}

function insert_books_into_DB(request, response){
  let SQL = 'INSERT INTO book_list(title, first_name, last_name, genre, series) VALUES ($1, $2, $3, $4, $5);';
  let values = [title, first_name, last_name, genre, series];

  return client.query(SQL, values)
    .then(sql_result =>{
      response.redirect('/')
    })
    .catch(error => handle_error(error, response))
}

//function display_books_from_db linking to separate page