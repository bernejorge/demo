const express = require("express");
const router = express.Router();
const db = require("../models");

const repository = db.ListaElectoral;

router.get("/", (req, res) => {
  repository
    .findAll({
      include: [db.Eleccion, db.Candidato, db.Partido],
    })
    .then((Listas) => {
      res.json(Listas);
    })
    .catch((err) => res.json(err));
  //res.send("Hola Jorge!");
});

router.get("/obtenerPorEleccion", async (req, res) => {
  const eleccion_id = req.query.eleccion_id;
  
  if (eleccion_id === 'undefined') {
    res.status(400).json({ message: "Parametros incorrectos" });
  }
  else{
    const listas = await repository.findAll({
        where: {
          eleccion_id: eleccion_id,
        },
        include: [db.Partido, db.Candidato, db.Eleccion, db.Cargo],
      });
      if (listas === null) {
        res
          .status(404)
          .json({
            message:
              "No se encontraron listas electorales para la elección solicitada.",
          });
      } else {
        res.json(listas);
      }
  }

  
});

router.get("/obtenerPorEleccionYCargo", async (req, res) => {
  const eleccion_id = req.query.eleccion_id;
  const cargo_id = req.query.cargo_id;
  if (!eleccion_id) {
    res.status(400).json({ message: "Parametros incorrectos" });
  }

  if (!cargo_id) {
    res.status(400).json({ message: "Parametros incorrectos" });
  }
  const listas = await repository.findAll({
    where: {
      eleccion_id: eleccion_id,
      cargo_id: cargo_id,
    },
    include: [
      db.Partido,
      db.Candidato,
      //db.Eleccion,
      db.Cargo,
    ],
  });
  if (listas === null) {
    res
      .status(404)
      .json({
        message:
          "No se encontraron listas electorales para la elección solicitada.",
      });
  } else {
    res.json(listas);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const listas = await repository.findOne({
    where: {
      id: id,
    },
    include: [db.Eleccion, db.Candidato, db.Partido],
  });
  if (listas === null) {
    res.status(404).json({ message: "No se encontró el/la fiscalMesa." });
  } else {
    res.json(listas);
  }
});

router.get("/obtenerPorEleccion", async (req, res) => {
  const idEleccion = req.query.idEleccion;
  const listas = await repository.findAll({
    where: {
      eleccion_id: idEleccion,
    },
    include: [db.Eleccion, db.Candidato, db.Partido],
  });
  if (listas === null) {
    res.status(404).json({ message: "No se encontraron listas." });
  } else {
    res.json(listas);
  }
});

router.post("/", (req, res) => {
  const lista = repository.build(req.body);
  lista
    .save()
    .then((listaSaved) => {
      res.json(listaSaved);
    })
    .catch((err) => {
      res.json(err);
    });
  console.log(lista);
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const lista = await repository.findByPk(id);
  if (lista === null) {
    res.status(404).json({ message: "No se encontró la fiscalMesa." });
  } else {
    const rta = await lista.update(data);
    res.json(rta);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const lista = await repository.findByPk(id);
  if (lista === null) {
    res.status(404).json({ message: "No se encontró la lista" });
  } else {
    await lista.destroy();
    res.status(200).json({ message: "lista eliminada" });
  }
});

module.exports = router;
