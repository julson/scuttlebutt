const express = require('express');
const router = express.Router();
const userDb = require('../db/users');

router.get('/', (req, res) => {
  userDb.findAll().then(users => res.send(users));
});

router.post('/', (req, res) => {
  userDb.create(req.body)
    .then(user => res.send(user));
});

router.get('/:username', (req, res, next) => {
  const username = req.params.username;
  userDb.findByUsername(username)
    .then(user => res.send(user))
    .catch(err => {
      console.log(err);
      const errorRes = new Error('User ' + username + ' not found');
      errorRes.status = 404;
      next(errorRes);
    });
});

module.exports = router;
