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

router.get('/:userName', (req, res) => {
  const userName = req.params.userName;
  userDb.findByUserName(userName)
    .then(user => res.send(user))
    .catch(() => res.status(404));
});

module.exports = router;
