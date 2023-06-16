const express = require('express');
const router = express.Router();

const db = require('../models');

const repository = db.Candidato;

router.get('/', (req, res) => {
    repository.findAll()
    .then((candidatos) => {
        res.json(candidatos);
    })
    .catch((err) => res.json(err))
    //res.send("Hola Jorge!");
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const candidato = await repository.findByPk(id);
    if(candidato  === null){
        res.status(404).json({message: 'No se encontró al/la candidato/a.'});
    }else{
        res.json(candidato);
    }
});

router.post('/', (req, res) => {
    const candidato = repository.build(req.body);
    candidato.save()
    .then((escuelaSaved) => {
        res.json(escuelaSaved);
    })
    .catch((err) =>{
        res.json(err);
    });
    console.log(candidato);

});

router.patch('/:id', async(req, res) => {
    const id = req.params.id;
    const data = req.body;
    const candidato = await repository.findByPk(id);
    if(candidato  === null){
        res.status(404).json({message: 'No se encontró al/la candidato/a.'});
    }else{
        const rta =  await candidato.update(data);
        res.json(rta);        
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const candidato = await repository.findByPk(id)
    if(candidato  === null){
        res.status(404).json({message: 'No se encontró al/la candidato/a'});    
    } else{
        await candidato.destroy();
        res.status(200).json({message: 'candidato/a eliminado/a'});
    }
});

module.exports = router; 