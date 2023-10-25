const mongoose = require('mongoose')

const Schema = mongoose.Schema

const invoiceSchema = new Schema({
	userId: String,
	detail: [{
		productId: String,
		quantity: Number
	}],
	total: Number,
	quantity: Number
})

const Invoice = mongoose.model('Invoice', invoiceSchema, 'invoices')

module.exports = Invoice