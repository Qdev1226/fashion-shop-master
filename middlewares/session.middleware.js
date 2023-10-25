const Session = require('../models/session.model')

module.exports.create = async (req, res, next) => {
	if (!req.signedCookies.sessionId) {
		const id = (await Session.create({})).id
		res.cookie('sessionId', id, { signed: true })
	}
	next()
}