module.exports = app => {
  const orders = require("../controllers/orders.controller");
  const router = require("express").Router();

  router.post("/order", orders.createOrder);

  app.use('/api', router);
};