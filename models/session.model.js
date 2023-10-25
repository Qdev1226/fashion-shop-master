const mongoose = require('mongoose')

const Schema = mongoose.Schema

const sessionSchema = new Schema({
	cart: [{
		productId: String,
		quantity: Number
	}]
})

const Session = mongoose.model('Session', sessionSchema, 'sessions')

module.exports = Session