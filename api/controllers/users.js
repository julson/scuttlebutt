const express = require('express');
const router = express.Router();
const userDb = require('../db/users');
const messageDb = require('../db/messages');

router.get('/', (req, res) => {
  userDb.findAll().then(users => res.send(users));
});

router.post('/', (req, res, next) => {
  userDb.create(req.body)
    .then(user => res.send(user))
    .catch(next);
});

router.get('/:userId', (req, res, next) => {
  const userId = req.params.userId;
  userDb.findById(userId)
    .then(user => res.send(user))
    .catch(err => {
      const errorRes = new Error('User ' + userId + ' not found');
      errorRes.status = 404;
      next(errorRes);
    });
});

router.post('/:toUserId/convos/:fromUserId', (req, res, next) => {
  const fromUserId = req.params.fromUserId;
  const toUserId = req.params.toUserId;
  const message = req.body.message;

  messageDb.send(fromUserId, toUserId, message)
    .then(() => res.sendStatus(200))
    .catch(next);
});

router.get('/:toUserId/convos/:fromUserId', (req, res) => {
  const fromUserId = req.params.fromUserId;
  const toUserId = req.params.toUserId;

  messageDb.getLog(fromUserId, toUserId)
    .then(log => res.send(log));
});

module.exports = router;
