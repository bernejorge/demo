const express = require('express');
const router = express.Router();

const db = require('../models');

const repository = db.Partido;

router.get('/', (req, res) => {
    repository.findAll()
    .then((partidos) => {
        res.json(partidos);
    })
    .catch((err) => res.json(err))
    //res.send("Hola Jorge!");
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const partido = await repository.findByPk(id);
    if(partido  === null){
        res.status(404).json({message: 'No se encontró al/la candidato/a.'});
    }else{
        res.json(partido);
    }
});

router.post('/', (req, res) => {
    const partido = repository.build(req.body);
    partido.save()
    .then((partido) => {
        res.json(partido);
    })
    .catch((err) =>{
        res.json(err);
    });
    console.log(partido);

});

router.patch('/:id', async(req, res) => {
    const id = req.params.id;
    const data = req.body;
    const partido = await repository.findByPk(id);
    if(partido  === null){
        res.status(404).json({message: 'No se encontró al/la candidato/a.'});
    }else{
        const rta =  await partido.update(data);
        res.json(rta);        
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const partido = await repository.findByPk(id)
    if(partido  === null){
        res.status(404).json({message: 'No se encontró al/la candidato/a'});    
    } else{
        await partido.destroy();
        res.status(200).json({message: 'candidato/a eliminado/a'});
    }
});

module.exports = router; 