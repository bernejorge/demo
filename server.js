const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World! Despligue continuo!!!");
});



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

const partidoRoute = require('./routes/partidos.routes');
app.use('/api/partidos', partidoRoute);

const listasRoute = require('./routes/listas.routes');
app.use('/api/listas', listasRoute);

const cargoRoute = require('./routes/cargos.routes');
app.use('/api/listas', cargoRoute);

const gptRoute = require('./routes/openai.routes');
app.use('/api/gpt', gptRoute);

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
