const { Router } = require('express');
const router = Router();
const Car = require('../models/car');

router
  .get('/:id', async (req, res, next) => {
    try {
      const response = await Car.getByID(req.params.id);
      if (!response) next();
      else res.json(response);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    const response = await Car.getAll();
    try {
      res.json(response);
    }
    catch (err) {
      next(err);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const response = await Car.insert(req.body);
      res.json(response);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const response = await Car.updateByID(req.params.id, req.body);
      res.json(response);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const response = await Car.deleteByID(req.params.id);
      res.json(response);
    } catch (err) {
      next(err);
    }
  });

module.exports = router; 
