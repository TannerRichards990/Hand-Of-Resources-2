const { Router } = require('express');
const router = Router();
const Consoles = require('../models/consoles');

router
  .get('/:id', async (req, res, next) => {
    try {
      const response = await Consoles.getByID(req.params.id);
      if (!response) next();
      else res.json(response);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    const response = await Consoles.getAll();
    try {
      res.json(response);
    }
    catch (err) {
      next(err);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const response = await Consoles.insert(req.body);
      res.json(response);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const response = await Consoles.updateByID(req.params.id, req.body);
      res.json(response);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const response = await Consoles.deleteByID(req.params.id);
      res.json(response);
    } catch (err) {
      next(err);
    }
  }
  );

module.exports = router; 
