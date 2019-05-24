DROP TABLE IF EXISTS book_list;

CREATE TABLE book_list (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  genre TEXT,
  series BOOLEAN
);