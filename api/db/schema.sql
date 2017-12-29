DROP DATABASE IF EXISTS scuttlebutt;
CREATE DATABASE scuttlebutt;

\c scuttlebutt;

CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       username VARCHAR NOT NULL,
       date_created TIMESTAMP NOT NULL DEFAULT now(),
       UNIQUE(username)
);

CREATE TABLE messages (
       id SERIAL PRIMARY KEY,
       text VARCHAR,
       from_user_id INTEGER REFERENCES users(id),
       to_user_id INTEGER REFERENCES users(id),
       date_created TIMESTAMP NOT NULL DEFAULT now()
);
