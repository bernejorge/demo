const express = require("express");
const db = require("../models");
const router = express.Router();
const { Op } = require("sequelize");
const { configureSocket, getIO } = require("../socket");

router.get("/resultadoMesa", async (req, res) => {
  try {
    const id_mesa = req.query.id_mesa;
    const id_cargo = req.query.id_cargo;

    const repository = db.Resultado;

    const rta = await repository.findOne({
      where: {
        cargo_id: id_cargo,
        mesa_id: id_mesa,
      },
    });

    if (rta) {
      const detalles = await db.DetalleResultado.findAll({
        where: {
          cargo_id: id_cargo,
          mesa_id: id_mesa,
        },
        include: [
          {
            model: db.ListaElectoral,
            include: { all: true }, // Incluir todas las relaciones de ListaElectoral y sus relaciones secundarias
          },
        ],
      });
      // Agregar la propiedad DetalleResultado al objeto rta
      rta.setDataValue("DetalleResultado", detalles);

      res.status(200).json(rta);
    } else {
      res.status(204).json("No hay resultados guardados todavía");
    }
  } catch (error) {
    res.status(500).json({ error: "Error insperado en el servidor" });
  }
});

router.post("/gurdarResultado", async (req, res) => {
  //para guardar primero buscar que no exista el resultado de mesa para ese cargo
  //si no existe guardar
  //si existe actualizar
  try {
    const data = req.body;
    var fechaHoraActual = new Date().toISOString();
    const detalleResultado = data.DetalleResultado;
    const deleteSQL = `DELETE FROM "ResultadoMesa" WHERE mesa_id = ${data.mesa_id} AND cargo_id = ${data.cargo_id}`;
    const deleteDetalleSQL = `DELETE FROM "DetalleResultado" WHERE mesa_id = ${data.mesa_id} AND cargo_id = ${data.cargo_id}`;
    let insertSQL =
      'INSERT INTO "DetalleResultado" ("mesa_id", "cargo_id", "lista_id", "cantidadVotos", "createdAt", "updatedAt") VALUES ';

    detalleResultado.forEach((detalle, index) => {
      const { mesa_id, cargo_id, lista_id, cantidadVotos } = detalle;
      insertSQL += `(${mesa_id}, ${cargo_id}, ${lista_id}, ${cantidadVotos}, '${fechaHoraActual}', '${fechaHoraActual}') `;

      if (index !== detalleResultado.length - 1) {
        insertSQL += ",";
      }
    });
    // Crea los detalles necesarios
    // const detalles = data.detalles.map((detalleData) =>
    //   db.DetalleResultado.build(detalleData)
    // );

    const repository = db.MesaElectoral;
    // Crea una transacción de Sequelize
    await db.sequelize.transaction(async (transaction) => {
      await db.sequelize.query(deleteSQL, { transaction });
      // Guarda el resultado
      const resultado = await db.Resultado.create(
        {
          mesa_id: data.mesa_id,
          cargo_id: data.cargo_id,
          votosAfirmativos: data.votosAfirmativos,
          votosBlancos: data.votosBlancos,
          votosNulos: data.votosNulos,
          votosRecurridos: data.votosRecurridos,
          votosImpuganados: data.votosImpuganados,
        },
        { transaction }
      );
      await db.sequelize.query(deleteDetalleSQL, { transaction });

      await db.sequelize.query(insertSQL, { transaction });
      // Asocia los detalles al resultado
      //await resultado.setDetalleResultado(detalles, { transaction });
      // Emitir el evento a todos los clientes conectados
      const io = getIO();
      io.emit("nuevaNotificacion", {
        mensaje: "Se ha guardado un nuevo resultado",
      });

      res
        .status(201)
        .json({ message: "Resultado y detalles guardados correctamente" });
    });
  } catch (error) {
    res.status(500).json({ error: "Error insperado en el servidor" });
  }
});

router.get("/todosPorCargo", async (req, res) => {
  try {
    const repository = db.Resultado;
    const cargo_id = req.query.cargo_id;
    const eleccion_id = req.query.eleccion_id;

    const rta = await repository.findAll({
      where: { cargo_id: cargo_id },
      include: [
        {
          model: db.MesaElectoral,
          where: { eleccion_id: eleccion_id },
        },
      ],
    });

    if (rta) {
        const ids = rta.map(x=>{
            return x.dataValues.mesa_id;
        });
      const detalles = await db.DetalleResultado.findAll({
        where: {
          cargo_id: cargo_id,
          mesa_id: {
            [Op.in]: ids,
          },
        },
        include: [
          {
            model: db.ListaElectoral,
            include: { all: true }, // Incluir todas las relaciones de ListaElectoral y sus relaciones secundarias
          },
        ],
      });
      // Agregar la propiedad DetalleResultado al objeto rta
      //rta.setDataValue("DetalleResultado", detalles);

      res.status(200).json(detalles);
    } else {
      res.status(204).json("No hay resultados guardados todavía");
    }
  } catch (error) {
    res.status(500).json({ error: "Error insperado en el servidor" });
  }
});

module.exports = router;
