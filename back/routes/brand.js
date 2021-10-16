const router = require('express').Router();
let User = require('../models/brand.model');

router.route('/').get((req, res) => {
  User.find().then(a => res.json(a)).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const description = req.body.description;

  const newBrand = new User({ name, description });

  newBrand.save().then(() => res.json('Marca adicionada!')).catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;