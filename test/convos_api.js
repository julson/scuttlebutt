// Request-level testing for the messaging API
const assert = require('assert');
const request = require('supertest');
const util = require('util');
const dbHelpers = require('./db_helpers');
const userDb = require('../api/db/users');
const messageDb = require('../api/db/messages');
const app = require('../app');

const baseRoute = '/api/v1/users';

function clearAll() {
  return dbHelpers.clearTable('messages')
    .then(() => dbHelpers.clearTable('users'));
}

describe('Messaging Routes', () => {
  before(() => {
    return clearAll()
      .then(() => {
        return userDb.create({username: 'john_doe'})
          .then(user => this.sender = user);
      })
      .then(() => {
        return userDb.create({username: 'jane_smith'})
          .then(user => this.receiver = user);
      });
  });

  after(() => clearAll());

  describe('Send message', () => {
    it('should send a message to a user', () => {
      const senderId = this.sender.id;
      const receiverId = this.receiver.id;
      return request(app)
        .post(util.format('%s/%s/convos/%s', baseRoute, receiverId, senderId))
        .set('Accept', 'application/json')
        .set('Content-type', 'application/json')
        .send({message: 'Hello!'})
        .expect(200);
    });
  });
});
