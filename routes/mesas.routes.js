const express = require("express");
const router = express.Router();
const db = require("../models");

const repository = db.MesaElectoral;

router.get("/", (req, res) => {
  repository
    .findAll({
      include: [db.Escuela, db.Eleccion],
    })
    .then((mesas) => {
      res.json(mesas);
    })
    .catch((err) => res.json(err));
  //res.send("Hola Jorge!");
});

router.get("/byEscuela", async (req, res) => {
  const idEscuela = req.query.idEscuela;
  const idEleccion = req.query.idEleccion;

  const mesas = await repository.findAll({
    where: {
      escuela_id: idEscuela,
      eleccion_id: idEleccion,
    },
  });

  if (mesas === null) {
    res
      .status(404)
      .json({
        message: "No se encontraron mesas para al escuela especificada",
      });
  } else {
    res.json(mesas);
  }
  //res.json({message: 'HolaMondo'});
});

router.get("/:id", async (req, res) => {
  const id = req. params.id;
  if(!id){
    res.status(400).json({message: 'Parametros incorrectos'});
  }
  const mesa = await repository.findByPk(id, { include: 'Escuela' });
  if (mesa === null) {
    res.status(404).json({ message: "No se encontró la mesa." });
  } else {
    res.json(mesa);
  }
});

router.post("/", (req, res) => {
  const mesa = repository.build(req.body);
  mesa
    .save()
    .then((escuelaSaved) => {
      res.json(escuelaSaved);
    })
    .catch((err) => {
      res.json(err);
    });
  console.log(mesa);
});-

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const mesa = await repository.findByPk(id);
  if (mesa === null) {
    res.status(404).json({ message: "No se encontró la mesa." });
  } else {
    const rta = await mesa.update(data);
    res.json(rta);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const mesa = await repository.findByPk(id);
  if (mesa === null) {
    res.status(404).json({ message: "No se encontró la mesa" });
  } else {
    await mesa.destroy();
    res.status(200).json({ message: "mesa eliminada" });
  }
});

module.exports = router;
