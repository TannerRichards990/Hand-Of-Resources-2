-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS operating systems;
DROP TABLE IF EXISTS cars;
DROP TABLE IF EXISTS food;
DROP TABLE IF EXISTS gaming consoles;
DROP TABLE IF EXISTS phones;

CREATE TABLE operating systems (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR,
  easy BOOLEAN,
);

CREATE TABLE cars (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  brand VARCHAR,
  model VARCHAR,
);

CREATE TABLE food (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR,
  healthy BOOLEAN,
);

CREATE TABLE gaming consoles (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR,
  released NUMERIC,
);

CREATE TABLE phones (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  brand VARCHAR,
  model VARCHAR,
);

INSERT INTO operating systems
  (name, easy)
  VALUES
  ('Windows', true),
  ('Mac', false),
  ('Linux', true);

INSERT INTO cars
  (brand, model)
  VALUES
  ('Ford', Mustang),
  ('Toyota', 'Camry'),
  ('Honda', 'Civic');

INSERT INTO food
  (name, healthy)
  VALUES
  ('Pizza', false),
  ('Salad', true),
  ('Burger', false);

INSERT INTO gaming consoles
  (name, released)
  VALUES
  ('Playstation 4', 2013),
  ('Xbox One', 2013),
  ('Nintendo Switch', 2017);

INSERT INTO phones
  (brand, model)
  VALUES
  ('Apple', 'iPhone 11'),
  ('Samsung', 'Galaxy S10'),
  ('Google', 'Pixel 3');
