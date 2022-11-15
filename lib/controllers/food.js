const { Router } = require('express');
const router = Router();
const Food = require('../models/food');

router
  .get('/:id', async (req, res, next) => {
    try {
      const response = await Food.getByID(req.params.id);
      if (!response) next();
      else res.json(response);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    const response = await Food.getAll();
    try {
      res.json(response);
    }
    catch (err) {
      next(err);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const response = await Food.insert(req.body);
      res.json(response);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const response = await Food.updateByID(req.params.id, req.body);
      res.json(response);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const response = await Food.deleteByID(req.params.id);
      res.json(response);
    } catch (err) {
      next(err);
    }
  });

module.exports = router; 
