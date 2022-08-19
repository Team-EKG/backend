// CRUD routes for shows

'use strict';

const express = require('express');
const { showInterface } = require('../models');

const router = express.Router();

// POST show
router.post('/show', async (req, res, next) => {
  let show = req.body;

  let response = await showInterface.create(show);
  res.status(200).send(response);
});

// GET all shows
router.get('/show', async (req, res, next) => {
  let allShows = await showInterface.readAll();
  // console.log('all shows: ', allShows);
  res.status(200).send(allShows);
});

// DELETE one show
router.delete('/show/:id', async (req, res, next) => {
  let { id } = req.params;
  let deleteShow = await showInterface.delete(id);
  res.status(200).send(deleteShow);

});

// GET one show
router.get('/show/:id', async (req, res, next) => {
  let { id } = req.params;
  let oneShow = await showInterface.readOne(id);
  res.status(200).send(oneShow);
});

module.exports = router;