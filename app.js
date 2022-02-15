const express = require("express");
const {sequelize} = require('./models'); // import models

const app = express(); // create a new express app
app.use(express.json());

app.get('/', function (req, res) {
  res.send('App running')
});
require("./routes/app.routes")(app);
app.listen({port: 3000}, async() =>{
  await sequelize.sync();
});
module.exports = app