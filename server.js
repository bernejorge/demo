const express = require("express");
const app = express();
const db = require("./models");
const cors = require('cors');

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const escuelaRoute = require('./routes/escuela.routes');
app.use('/api/escuelas', escuelaRoute);

const eleccionesRoute = require('./routes/eleccion.routes');
app.use('/api/elecciones', eleccionesRoute);

const mesasRoute = require('./routes/mesas.routes');
app.use('/api/mesas', mesasRoute);

const companeroRoute = require('./routes/companeros.routes');
app.use('/api/companeros', companeroRoute);

const fiscalMesaRoute = require('./routes/fiscalesdemesas.routes');
app.use('/api/fiscalesdemesas', fiscalMesaRoute);

const fiscalGeneralRoute = require('./routes/fiscalesgenerales.routes.js');
app.use('/api/fiscalesgenerales', fiscalGeneralRoute);

const candidatoRoute = require('./routes/candidatos.routes');
app.use('/api/candidatos', candidatoRoute);

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
