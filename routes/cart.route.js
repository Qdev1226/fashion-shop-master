const express = require('express')

const controller = require('../controllers/cart.controller')

const router = express.Router()

router.get('/', controller.index)

router.get('/add/:productId', controller.addToCart)

router.get('/quantity', controller.getQuantity)

router.get('/increaseQuantity/:productId', controller.increaseQuantity)

router.get('/decreaseQuantity/:productId', controller.decreaseQuantity)

router.delete('/:productId', controller.removeProduct)

module.exports = router
