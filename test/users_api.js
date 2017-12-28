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
  describe('Find Users', () => {
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

  describe('Find One User', () => {
    it('should return one user given the username', () => {
      return request(app)
        .get(baseRoute + '/john_doe')
        .set('Accept', 'application/json')
        .expect(200)
        .then(res => {
          const user = res.body;
          assert.equal(user.username, 'john_doe');
        });
    });

    it('should return a 404 if the user does not exist', () => {
      return request(app)
        .get(baseRoute + '/foobar')
        .set('Accept', 'application/json')
        .expect(404);
    });
  });

  describe('Create User', () => {
    it('should create a user', () => {
      return request(app)
        .post(baseRoute + '/')
        .set('Accept', 'application/json')
        .set('Content-type', 'application/json')
        .send({username: 'jane_smith'})
        .expect(200)
        .then(res => {
          const user = res.body;
          assert.equal(user.username, 'jane_smith');
        });
    });
  });
});
