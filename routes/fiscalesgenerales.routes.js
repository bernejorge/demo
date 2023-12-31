const express = require("express");
const router = express.Router();
const db = require("../models");

const repository = db.FiscalGralEleccion;

router.get("/", (req, res) => {
  repository
    .findAll({
      include: [db.Companero, db.Escuela, db.Eleccion],
    })
    .then((fiscalesgenerales) => {
      res.json(fiscalesgenerales);
    })
    .catch((err) => res.json(err));
});

router.get("/getByIds", async (req, res) => {
  const companero_id = req.params.companero_id;
  const escuela_id = req.params.escuela_id;
  const eleccion_id = req.params.eleccion_id;
  const fiscalGeneral = await repository.findOne({
    where: {
      companero_id: companero_id,
      escuela_id: escuela_id,
      eleccion_id: eleccion_id,
    },
    include: [db.Companero, db.Escuela, db.Eleccion],
  });
  if (fiscalGeneral === null) {
    res.status(404).json({ message: "No se encontró el Fiscal General." });
  } else {
    res.json(fiscalGeneral);
  }
});

router.get("/obtenerPorEscuela", async (req, res) => {
  const escuelaId = req.body.escuelaId;
  const eleccion_id = req.params.eleccion_id;
  const fiscalGeneral = await repository.findAll({
    where: {
      escuela_id: escuelaId,
      eleccion_id: eleccion_id,
    },
    include: [db.Escuela, db.Companero],
  });
  if (fiscalGeneral === null) {
    res.status(404).json({ message: "No se encontró el/la Fiscal General." });
  } else {
    res.json(fiscalGeneral);
  }
});

router.get("/obtenerPorEleccion", async (req, res) => {
  const eleccion_id = req.query.eleccion_id;
  if (!eleccion_id) {
    eleccion_id = 0;
  }

  const fiscalGeneral = await repository.findAll({
    where: {
      eleccion_id: eleccion_id,
    },
    include: [db.Escuela, db.Companero, db.Eleccion],
  });
  if (fiscalGeneral === null) {
    res.status(404).json({ message: "No se encontró el/la Fiscal General." });
  } else {
    res.json(fiscalGeneral);
  }
});

router.post("/", (req, res) => {
  const fiscalGeneral = repository.build(req.body);
  fiscalGeneral
    .save()
    .then((f) => {
      res.json(f);
    })
    .catch((err) => {
      res.json(err);
    });
  console.log(fiscalGeneral);
});

router.delete("/", async (req, res) => {
  const companero_id = req.query.companero_id;
  const escuela_id = req.query.escuela_id;
  const eleccion_id = req.query.eleccion_id;

  try {
    const fiscal = await repository.findOne({
      where: {
        companero_id: companero_id,
        escuela_id: escuela_id,
        eleccion_id: eleccion_id,
      },
    });
    if (fiscal === null) {
      res.status(404).json({ message: "No se encontró la Fiscal General" });
    } else {
      await fiscal.destroy();
      res.status(200).json({ message: "Fiscal General eliminado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
