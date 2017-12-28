// Request-level testing for the user API
const assert = require('assert');
const request = require('supertest');
const dbHelpers = require('./db_helpers');
const userDb = require('../api/db/users');
const app = require('../app');

const baseRoute = '/api/v1/users';

before(() => {
  return dbHelpers.clearTable('users')
    .then(() => {
      return userDb.create({username: 'john_doe'});
    });
});

describe('User Routes', () => {
  describe('Find users', () => {
    it('should return all users in the system', () => {
      return request(app)
        .get(baseRoute + '/')
        .set('Accept', 'application/json')
        .expect(200)
        .then(res => {
          const users = res.body;
          assert.equal(users.length, 1);

          const user = users[0];
          assert.equal(user.username, 'john_doe');
        });
    });
  });
});
