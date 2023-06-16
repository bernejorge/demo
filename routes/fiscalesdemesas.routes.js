const express = require('express');
const router = express.Router();
const db = require('../models');

const repository = db.FiscalDeMesa;

router.get('/', (req, res) => {
    repository.findAll({
        include: [ db.Companero, 
            {
                model:db.MesaElectoral,
                include:[db.Eleccion, db.Escuela]
            }
        ]
    })
    .then((FiscalesDeMesas) => {
        res.json(FiscalesDeMesas);
    })
    .catch((err) => res.json(err))
    //res.send("Hola Jorge!");
});

router.get('/:id/:id2', async (req, res) => {
    const id = req.params.id;
    const id2 = req.params.id2;
    const fiscalMesa = await repository.findOne({
        where: {
            mesa_id: id,
            companero_id: id2
        },
        include: [db.MesaElectoral, db.Companero]
    });
    if(fiscalMesa  === null){
        res.status(404).json({message: 'No se encontró el/la fiscalMesa.'});
    }else{
        res.json(fiscalMesa);
    }
});

router.get('/obtenerPorEscuela', async (req, res) => {
    const escuelaId = req.body.escuelaId;
    const fiscalMesa = await repository.findAll({
        where: {
            escuela_id: escuelaId
        },
        include: [db.MesaElectoral, db.Companero]
    });
    if(fiscalMesa  === null){
        res.status(404).json({message: 'No se encontró el/la fiscalMesa.'});
    }else{
        res.json(fiscalMesa);
    }
});

router.post('/', (req, res) => {
    const fiscalMesa = repository.build(req.body);
    fiscalMesa.save()
    .then((escuelaSaved) => {
        res.json(escuelaSaved);
    })
    .catch((err) =>{
        res.json(err);
    });
    console.log(fiscalMesa);

});

router.patch('/:id', async(req, res) => {
    const id = req.params.id;
    const data = req.body;
    const fiscalMesa = await repository.findByPk(id);
    if(fiscalMesa  === null){
        res.status(404).json({message: 'No se encontró la fiscalMesa.'});
    }else{
        const rta =  await fiscalMesa.update(data);
        res.json(rta);        
    }
});

router.delete('/:mesaId/:companeroId', async (req, res) => {
    const mesaId = req.params.mesaId;
    const companeroId = req.params.companeroId;
    const fiscalMesa = await repository.findOne({
        where: {
            mesa_id: mesaId,
            companero_id: companeroId
        }
    })
    if(fiscalMesa  === null){
        res.status(404).json({message: 'No se encontró la fiscalMesa'});    
    } else{
        await fiscalMesa.destroy();
        res.status(200).json({message: 'fiscalMesa eliminada'});
    }
});

module.exports = router;