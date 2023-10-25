const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
	name: String,
	price: Number,
	discount: Number,
	description: String,
	image: String,
	dateCreated: { type: Date, default: Date.now }
})

const Product = mongoose.model('Product', productSchema, 'products')

module.exports = Product