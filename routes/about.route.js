const express = require('express')

const controller = require('../controllers/about.controller')

const router = express.Router()

router.get('/', controller.index)

module.exports = router