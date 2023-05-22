const express = require('express');
const router = express.Router();
const db = require('../models');

const repository = db.Eleccion;

router.get('/', (req, res) => {
    repository.findAll()
    .then((elecciones) => {
        res.json(elecciones);
    })
    .catch((err) => res.json(err))
    //res.send("Hola Jorge!");
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const eleccion = await repository.findByPk(id);
    if(eleccion  === null){
        res.status(404).json({message: 'No se encontró la eleccion.'});
    }else{
        res.json(eleccion);
    }
});

router.post('/', (req, res) => {
    const eleccion = repository.build(req.body);
    eleccion.save()
    .then((escuelaSaved) => {
        res.json(escuelaSaved);
    })
    .catch((err) =>{
        res.json(err);
    });
    console.log(eleccion);

});

router.patch('/:id', async(req, res) => {
    const id = req.params.id;
    const data = req.body;
    const eleccion = await repository.findByPk(id);
    if(eleccion  === null){
        res.status(404).json({message: 'No se encontró la eleccion.'});
    }else{
        const rta =  await eleccion.update(data);
        res.json(rta);        
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const eleccion = await repository.findByPk(id)
    if(eleccion  === null){
        res.status(404).json({message: 'No se encontró la Eleccion'});    
    } else{
        await eleccion.destroy();
        res.status(200).json({message: 'Eleccion eliminada'});
    }
});

module.exports = router;