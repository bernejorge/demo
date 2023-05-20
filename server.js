const express = require('express');
const app = express();
const db =  require('./models');

const port = 3000;

 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));

 db.sequelize.sync({ force: true }).then(()=>{
    app.listen(port,()=>{
        console.log(`listening on port ${port}`);
    });
 });
