# Scuttlebutt
A basic chat server in node.js with a RESTful API.

## Project Notes

I've used node.js a few years ago for building microservices and it's a very good candidate for building fast event-based services (like a chat server!). It's nice to finally learn and play around with ES6 and some newer libraries (pg-promise is particularly nice). Postgres is good enough to be the go-to DB since I don't have any specific requirements (chat servers are write-heavy by nature, but it won't be a problem till it hits crazy scale).

## Local Setup (Mac OSX)

This project needs node.js and a Postgresql database. Using [homebrew](https://brew.sh/) is a good way to set these up.

* `brew install node`
* `brew install postgresql`

In the project directory, do:

* `npm install`
* `psql postgres -f ./api/db/schema.sql`
* `npm start`

The server will be accessible through port 3000. We can test it out like this:

`curl http://localhost:3000/api/v1/users -X POST -d '{"username": "julson"}' -H 'Content-Type: application/json'`

## Running Tests

`npm test`

This project only has request-level integration testing for now, which requires a running Postgres database. Important note: It will wipe out your local DB until the tests set up their own database.

## API (TODO)
