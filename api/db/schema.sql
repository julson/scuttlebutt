DROP DATABASE IF EXISTS scuttlebutt;
CREATE DATABASE scuttlebutt;

\c scuttlebutt;

CREATE TABLE users (
       ID SERIAL PRIMARY KEY,
       username VARCHAR NOT NULL,
       date_created TIMESTAMP NOT NULL DEFAULT now(),
       UNIQUE(username)
);
