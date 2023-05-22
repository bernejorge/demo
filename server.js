const express = require("express");
const app = express();
const db = require("./models");

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const escuelaRoute = require('./routes/escuela.routes');
app.use('/api/escuelas', escuelaRoute);

const eleccionesRoute = require('./routes/eleccion.routes');
app.use('/api/elecciones', eleccionesRoute);

const mesasRoute = require('./routes/mesas.routes');
app.use('/api/mesas', mesasRoute);

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
