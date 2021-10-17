const router = require('express').Router();
let Brands = require('../models/brand.model');

router.route('/').get((req, res) => {
  Brands.find()
    .then(resp => res.json(resp))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const description = req.body.description;

  const newBrand = new Brands({ name, description });

  newBrand.save().then(() => res.json('Marca adicionada!')).catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').delete((req, res) => {
  Brands.findByIdAndDelete(req.params.id)
    .then(() => res.json('Marca deletada.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;