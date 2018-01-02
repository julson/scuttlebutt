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

  afterEach(() => dbHelpers.clearTable('messages'));

  after(() => clearAll());

  describe('Send Message Route', () => {
    it('should send a message to a user', () => {
      const senderId = this.sender.id;
      const receiverId = this.receiver.id;
      return request(app)
        .post(util.format('%s/%s/convos/%s', baseRoute, receiverId, senderId))
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({message: 'Hello!'})
        .expect(200);
    });

    it('should not be able to send a message to self', () => {
      const senderId = this.sender.id;
      return request(app)
        .post(util.format('%s/%s/convos/%s', baseRoute, senderId, senderId))
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({message: 'Hello!'})
        .expect(400);
    });
  });

  describe('Get Log Route', () => {
    before(() => {
      return messageDb.send(this.sender.id, this.receiver.id, 'Hello')
        .then(() => messageDb.send(this.receiver.id, this.sender.id, 'Waddup'))
        .then(() => messageDb.send(this.sender.id, this.receiver.id, 'Fine'));
    });

    it('should send the chat log for 2 users', () => {
      const senderId = this.sender.id;
      const receiverId = this.receiver.id;
      return request(app)
        .get(util.format('%s/%s/convos/%s', baseRoute, receiverId, senderId))
        .set('Accept', 'application/json')
        .expect(200)
        .then(res => {
          const log = res.body;
          assert.equal(log.length, 3);

          assert(log[0].date_created <= log[1].date_created);
          assert.equal(log[0].text, 'Hello');
          assert.equal(log[0].username, this.sender.username);

          assert(log[1].date_created <= log[2].date_created);
          assert.equal(log[1].text, 'Waddup');
          assert.equal(log[1].username, this.receiver.username);

          assert.equal(log[2].text, 'Fine');
          assert.equal(log[2].username, this.sender.username);
        });
    });

    it('should not be able to get a log of messages to self', () => {
      const senderId = this.sender.id;
      return request(app)
        .get(util.format('%s/%s/convos/%s', baseRoute, senderId, senderId))
        .set('Accept', 'application/json')
        .expect(400);
    });
  });
});
