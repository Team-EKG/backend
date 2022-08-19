'use strict';

const express = require('express');
const { userInterface } = require('../models');
const bcrypt = require('bcrypt');
let basicAuth = require('../middleware/basicAuth')
const router = express.Router();


router.post('/signup', async (req, res) => {
  console.log('requestBody', req.body)
  try {
    let { email, password } = req.body;
    let encryptedPassword = await bcrypt.hash(password, 5);
    const record = await userInterface.create({
      email,
      password: encryptedPassword,
    });
    res.status(201).json(record);
  } catch (e) {
    res.status(403).send('Error Creating User');
  }
});

router.post('/signin', basicAuth, (req, res) => {
  try {
    let user = req.user
    res.status(200).json(user);
  } catch (error) {
    res.status(403).send('Invalid Login');
  }
});

module.exports = router;