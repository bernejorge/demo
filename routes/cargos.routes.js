const express = require('express');
const router = express.Router();

const db = require('../models');

const repository = db.Cargo;

router.get('/', (req, res) => {
    repository.findAll()
    .then((cargos) => {
        res.json(cargos);
    })
    .catch((err) => res.json(err))
    //res.send("Hola Jorge!");
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const cargo = await repository.findByPk(id);
    if(cargo  === null){
        res.status(404).json({message: 'No se encontró al cargo.'});
    }else{
        res.json(cargo);
    }
});

router.post('/', (req, res) => {
    const cargo = repository.build(req.body);
    cargo.save()
    .then((cargo) => {
        res.json(cargo);
    })
    .catch((err) =>{
        res.json(err);
    });
    console.log(cargo);

});

router.patch('/:id', async(req, res) => {
    const id = req.params.id;
    const data = req.body;
    const cargo = await repository.findByPk(id);
    if(cargo  === null){
        res.status(404).json({message: 'No se encontró al cargo.'});
    }else{
        const rta =  await cargo.update(data);
        res.json(rta);        
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const cargo = await repository.findByPk(id)
    if(cargo  === null){
        res.status(404).json({message: 'No se encontró al cargo'});    
    } else{
        await cargo.destroy();
        res.status(200).json({message: 'cargo eliminado'});
    }
});

module.exports = router; 