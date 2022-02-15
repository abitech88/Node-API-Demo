const {db} = require('../models');
const {Sequelize,sequelize,Item, Order, OrderItem, Address} = require('../models');
const {validState, validStreetAddress} = require('../utils/addressValidator')
const Op = Sequelize.Op;

exports.createOrder = async (req, res) => {
  const address = req.body.address;
  const items = req.body.items;
  let subTotal = 0;
  let total = 0;
  let taxRate = 0;

  //chack if state is valid

  if(!validState(address.state)){
    return res.status(500).send({
      status: `error`,
      message: 'State address not valid'
    });
  }

  console.log("state", validStreetAddress(address.street))

  if(!validStreetAddress(address.street)){
    return res.status(500).send({
      status: `error`,
      message: 'Street address not valid'
    });
  }


  const itemIDs = items.map((value) => value.id)
  const products = await Item.findAll({
    where: {
      id: {
        [Op.or]: itemIDs
      }
    }
  });
  try {
    items.forEach(function (itm) {
      const product = products.find(o => o.id === itm.id);
      if (!product) {
        return res.status(500).send({
          status: `error`,
          message: `item ID: ${itm.id} not found`
        });
      }
      subTotal += product.price * itm.quantity;
    })
  } catch (e) {
    return res.status(500).send({
      status: `error`,
      message: e.message
    });
  }

  switch (address.state) {
    case 'FL':
      taxRate = 0.07
      break;
    case 'GA':
      taxRate = 0.1
      break;
    default:
      break;
  }
  total += subTotal + (subTotal * taxRate)

  sequelize.transaction(function (t) {

    // chain all your queries here. make sure you return them.
   return  Address.create({
      city: address.city,
      state: address.state,
      zip: address.zip,
      street: address.street,
    }, {transaction: t}).then(function (address) {
      return Order.create({
        addressID: address.id,
        description: 'new order',
        taxRate: taxRate,
        subTotal: subTotal,
        total:total,
      }, {transaction: t}).then(async function (order){
        await mapItems(order.id, itemIDs);
      });
    });

  }).then(function (result) {
    // Transaction has been committed
    // result is whatever the result of the promise chain returned to the transaction callback
    res.status(200).send({
      status: `success`,
      data: {
        subTotal: subTotal,
        total: total
      }
    });
  }).catch(function (err) {
    // Transaction has been rolled back
    // err is whatever rejected the promise chain returned to the transaction callback
    res.status(500).send({
      status: `Fail`,
      message: err.message
    });
  });

};

async function mapItems(orderID, itemIDs) {
  await itemIDs.forEach(function (item) {
    OrderItem.create({
      orderID: orderID,
      itemID: item
    })
  })
}