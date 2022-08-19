// CRUD routes for reviews

'use strict';

const express = require('express');
const { reviewInterface } = require('../models');

const router = express.Router();

// POST review
router.post('/review', async (req, res, next) => {
  let review = req.body;

  let response = await reviewInterface.create(review);
  res.status(200).send(response);
});

// GET all reviews
router.get('/review', async (req, res, next) => {
  let allReviews = await reviewInterface.readAll();
  res.status(200).send(allReviews);
});

// DELETE review
router.delete('/review/:id', async (req, res, next) => {
  let { id } = req.params;
  let deleteReview = await reviewInterface.delete(id);
  res.status(200).send(deleteReview);
});

module.exports = router;