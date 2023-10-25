const Coupon = require('../models/coupon.model')

module.exports.index = async (req, res) => {
  const coupons = await Coupon.find()

  res.json(coupons)
}

module.exports.createCoupon = async (req, res) => {
  const { code, discount } = req.body

  // check code exists or not
  let existsCoupon = await Coupon.findOne({ code })
  if (existsCoupon) {
    existsCoupon.discount = discount
    await existsCoupon.save()
  } else {
    const newCoupon = new Coupon({ code, discount })
    await newCoupon.save()
  }

  res.json({ message: 'creating coupon successfully!' })
}

module.exports.getCoupon = async (req, res) => {
  const { couponCode } = req.params

  const coupon = await Coupon.findOne({ code: couponCode })

  res.json(coupon)
}
