const express = require('express');
const db = require('../models');
const router = express.Router();


router.post('/', (req, res) => {
    const escuela = db.Escuela.build(req.body);
    escuela.save()
    .then((escuelaSaved) => {
        res.json(escuelaSaved);
    })
    .catch((err) =>{
        res.json(err);
    });
    console.log(escuela);

});

module.exports = router;