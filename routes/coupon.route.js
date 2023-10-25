const express = require('express')

const controller = require('../controllers/coupon.controller');

const router = express.Router()

router.route('/')
  .get(controller.index)
  .post(controller.createCoupon)

router.route('/:couponCode')
  .get(controller.getCoupon)

module.exports = router