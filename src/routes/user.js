// CRUD routes for users

'use strict';

const express = require('express');
const { userInterface, reviewInterface, showInterface } = require('../models');

const router = express.Router();

// POST user
// router.post('/user', async (req, res, next) => {
//   let user = req.body;

//   let response = await userInterface.create(user);
//   res.status(200).send(response);
// });

//Get all users
router.get('/user', async (req, res, next) => {
  let allUsers = await userInterface.readAll();
  res.status(200).send(allUsers);
});

// GET one user
// router.get('/user/:id', async (req, res, next) => {
//   let { id } = req.params;
//   let oneUser = await userInterface.readOne(id);
//   res.status(200).send(oneUser);
// });

// GET one user with relations
router.get('/user/:id', async (req, res, next) => {
  let { id } = req.params;
  let oneUser = await userInterface.readWithRelations(id, {include: reviewInterface.model});
  res.status(200).send(oneUser.reviews);
});

// DELETE one user
router.delete('/user/:id', async (req, res, next) => {
  let { id } = req.params;
  let deleteUser = await userInterface.delete(id);
  res.status(200).send(deleteUser);
});

module.exports = router;