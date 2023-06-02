const express = require('express');
const router = express.Router();
const {orderData} = require("../controller/orderHistory")

router.post('/' , orderData)

module.exports = router;