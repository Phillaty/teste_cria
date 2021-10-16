const router = require('express').Router();
let Materiais = require('../models/material.model.js');

router.route('/').get((req, res) => {
  Materiais.find()
    .then(resp => res.json(resp))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const brand = req.body.brand;
  const image = req.body.image;
  const active = req.body.active;
  const dateInativated = Date.parse(req.body.dateInativated);

  const newMaterial = new Materiais({
    name,
    description,
    brand,
    image,
    active,
    dateInativated,
  });

  newMaterial.save()
    .then(() => res.json('Material adicionado!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Materiais.findById(req.params.id)
    .then(resp => res.json(resp))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Materiais.findByIdAndDelete(req.params.id)
    .then(() => res.json('Material deletado.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Materiais.findById(req.params.id)
    .then(resp => {
      resp.name = req.body.name;
      resp.description = req.body.description;
      resp.brand = req.body.brand;
      resp.image = req.body.image;
      resp.active = req.body.active;
      resp.dateInativated = Date.parse(req.body.date);

      resp.save()
        .then(() => res.json('Material atualizado!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;