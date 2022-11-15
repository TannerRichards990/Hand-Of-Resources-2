const { Router } = require('express');
const router = Router();
const OS = require('../models/os');

router
  .get('/:id', async (req, res, next) => {
    try {
      const response = await OS.getByID(req.params.id);
      if (!response) next();
      else res.json(response);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    const response = await OS.getAll();
    try {
      res.json(response);
    }
    catch (err) {
      next(err);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const response = await OS.insert(req.body);
      res.json(response);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const response = await OS.updateByID(req.params.id, req.body);
      res.json(response);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const response = await OS.deleteByID(req.params.id);
      res.json(response);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;

    

