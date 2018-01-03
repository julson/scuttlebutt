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

## API

### `GET /api/v1/users`

Retrieves a list of users in the system

Example Response:

```json
[{"id": 1,
  "username": "john_doe",
  "date_created": "2018-01-01T00:00:24.239Z" }]
```

### `GET /api/v1/users/<userId>`

Retrieves a user with the given `userId`

Example Route:

`/api/v1/users/1`

Example Response:

```json
{"id": 1,
 "username": "john_doe",
 "date_created": "2018-01-01T00:00:24.239Z"}
```

### `POST /api/v1/users`

Creates a new user with the given username in the system

Example Route and Payload:

`/api/v1/users`

```json
{"username": "john_doe"}
```

### `GET /api/v1/users/<receiverId>/convos/<senderId>`

Retrieves the chat log between the 2 users

Example Route:

`/api/v1/users/1/convos/2`

Example Response:

```json
[ { "username": "john_doe",
    "text": "Hello",
    "date_created": "2018-01-01T00:00:00.152Z" },
  { "username": "jane_smith",
    "text": "Waddup",
    "date_created": "2018-01-01T00:00:00.153Z" },
  { "username": "john_doe",
    "text": "Fine",
    "date_created": "2018-01-01T00:00:00.154Z" } ]
    ```

### `POST /api/v1/users/<receiverId>/convos/<senderId>`

Sends a message between 2 users

Example Route and Payload:

`/api/v1/users/1/convos/2`

```json
{"message": "Hello!"}
```
