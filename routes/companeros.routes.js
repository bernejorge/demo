const express = require('express');
const router = express.Router();

const db = require('../models');

const repository = db.Companeros;

router.get('/', (req, res) => {
    repository.findAll()
    .then((companeros) => {
        res.json(companeros);
    })
    .catch((err) => res.json(err))
    //res.send("Hola Jorge!");
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const companero = await repository.findByPk(id);
    if(companero  === null){
        res.status(404).json({message: 'No se encontró al/la companero/a.'});
    }else{
        res.json(companero);
    }
});

router.post('/', (req, res) => {
    const companero = repository.build(req.body);
    companero.save()
    .then((escuelaSaved) => {
        res.json(escuelaSaved);
    })
    .catch((err) =>{
        res.json(err);
    });
    console.log(companero);

});

router.patch('/:id', async(req, res) => {
    const id = req.params.id;
    const data = req.body;
    const companero = await repository.findByPk(id);
    if(companero  === null){
        res.status(404).json({message: 'No se encontró al/la companero/a.'});
    }else{
        const rta =  await companero.update(data);
        res.json(rta);        
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const companero = await repository.findByPk(id)
    if(companero  === null){
        res.status(404).json({message: 'No se encontró al/la companero/a'});    
    } else{
        await companero.destroy();
        res.status(200).json({message: 'companero/a eliminado/a'});
    }
});

module.exports = router; 