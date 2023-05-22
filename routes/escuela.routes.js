const express = require('express');
const db = require('../models');
const router = express.Router();

const repository = db.Escuela;

router.get('/', (req, res) => {
    repository.findAll()
    .then((escuelas) => {
        res.json(escuelas);
    })
    .catch((err) => res.json(err))
    //res.send("Hola Jorge!");
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const escuela = await repository.findByPk(id);
    if(escuela  === null){
        res.status(404).json({message: 'No se encontró la escuela'});
    }else{
        res.json(escuela);
    }
});

router.post('/', (req, res) => {
    const escuela = repository.build(req.body);
    escuela.save()
    .then((escuelaSaved) => {
        res.json(escuelaSaved);
    })
    .catch((err) =>{
        res.json(err);
    });
    console.log(escuela);

});

router.patch('/:id', async(req, res) => {
    const id = req.params.id;
    const data = req.body;
    const escuela = await repository.findByPk(id);
    if(escuela  === null){
        res.status(404).json({message: 'No se encontró la escuela'});
    }else{
        const rta = await escuela.update(data);
        res.status(200).json(rta);
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const escuela = await repository.findByPk(id)
    if(escuela  === null){
        res.status(404).json({message: 'No se encontró la escuela'});    
    } else{
        await escuela.destroy();
        res.status(200).json({message: 'Escuela eliminada'});
    }
});

module.exports = router;