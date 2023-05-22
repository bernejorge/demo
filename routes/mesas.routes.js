const express = require('express');
const router = express.Router();
const db = require('../models');

const repository = db.MesaElectoral;

router.get('/', (req, res) => {
    repository.findAll()
    .then((mesas) => {
        res.json(mesas);
    })
    .catch((err) => res.json(err))
    //res.send("Hola Jorge!");
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const mesa = await repository.findByPk(id);
    if(mesa  === null){
        res.status(404).json({message: 'No se encontró la mesa.'});
    }else{
        res.json(mesa);
    }
});

router.post('/', (req, res) => {
    const mesa = repository.build(req.body);
    mesa.save()
    .then((escuelaSaved) => {
        res.json(escuelaSaved);
    })
    .catch((err) =>{
        res.json(err);
    });
    console.log(mesa);

});

router.patch('/:id', async(req, res) => {
    const id = req.params.id;
    const data = req.body;
    const mesa = await repository.findByPk(id);
    if(mesa  === null){
        res.status(404).json({message: 'No se encontró la mesa.'});
    }else{
        const rta =  await mesa.update(data);
        res.json(rta);        
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const mesa = await repository.findByPk(id)
    if(mesa  === null){
        res.status(404).json({message: 'No se encontró la mesa'});    
    } else{
        await mesa.destroy();
        res.status(200).json({message: 'mesa eliminada'});
    }
});

module.exports = router;