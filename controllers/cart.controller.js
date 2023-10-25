const fs = require('fs')

const Session = require('../models/session.model')
const Product = require('../models/product.model')

module.exports.index = async (req, res) => {
	const data = fs.readFileSync('public/data/countries.json', 'utf8')
	const countries = JSON.parse(data)

	let cart = {}
	if (req.signedCookies.sessionId) {
		cart = (await Session.findById(req.signedCookies.sessionId)).cart
		for (item of cart) {
			item.product = await Product.findById(item.productId)
		}
	}
	
	res.render('cart/index', { 
		cart,
		countries
	})
}

module.exports.addToCart = async (req, res) => {
	const { sessionId } = req.signedCookies
	if (!sessionId) {
		res.redirect('/products')
		return
	}

	const { productId } = req.params
	const session = await Session.findById(sessionId)
	const product = await Product.findById(productId)

	let index
	const productInCart = session.cart.find((product, i) => {
		index = i
		return product.productId === productId
	})
	if (productInCart) {
		session.cart[index].quantity += 1
	} else {
		session.cart.push({
			productId: productId,
			quantity: 1
		})
	}

	await session.save()

	res.redirect('back')
}

module.exports.getQuantity = async (req, res) => {
	const { sessionId } = req.signedCookies
	if (!sessionId) {
		res.redirect('/products')
		return
	}

	const session = await Session.findById(sessionId)

	res.json({ quantity: session.cart.length})
}

module.exports.increaseQuantity = async (req, res) => {
	const { sessionId } = req.signedCookies
	if (!sessionId) {
		res.redirect('/products')
		return
	}

	const { productId } = req.params
	const session = await Session.findById(sessionId)
	
	let quantity = 0
	session.cart.forEach(item => {
		if (item.productId === productId) {
			item.quantity++
			quantity = item.quantity
			return
		}
	})

	await session.save()

	res.json({ quantity })
}

module.exports.decreaseQuantity = async (req, res) => {
	const { sessionId } = req.signedCookies
	if (!sessionId) {
		res.redirect('/products')
		return
	}

	const { productId } = req.params
	const session = await Session.findById(sessionId)
	
	let quantity = 0
	session.cart.forEach((item, index) => {
		if (item.productId === productId) {
			item.quantity--
			quantity = item.quantity

			if (quantity === 0) {
				session.cart.splice(index, 1)
			}
			return
		}
	})

	await session.save()
	
	res.json({ quantity })
}

module.exports.removeProduct = async (req, res) => {
	const { sessionId } = req.signedCookies
	if (!sessionId) {
		res.redirect('/products')
		return
	}

	const { productId } = req.params
	const session = await Session.findById(sessionId)

	session.cart.forEach((item, index) => {
		if (item.productId === productId) {
			session.cart.splice(index, 1)
			return
		}
	})

	await session.save()
	res.status(200)
}
