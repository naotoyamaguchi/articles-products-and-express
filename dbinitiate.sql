\c postgres
CREATE USER "products_articles_user";
CREATE DATABASE "products_articles" OWNER "products_articles_user";
\c products_articles

CREATE TABLE IF NOT EXISTS products
(
  id serial,
  name text NOT NULL,
  price integer NOT NULL,
  inventory integer NOT NULL,
  primary key (id)
);

CREATE TABLE IF NOT EXISTS articles
(
  id serial,
  title text NOT NULL,
  author text NOT NULL,
  body text NOT NULL,
  urlTitle text NOT NULL
)