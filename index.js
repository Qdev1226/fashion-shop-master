require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const pug = require('pug')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const sessionMiddleware = require('./middlewares/session.middleware')

const productRoute = require('./routes/product.route')
const cartRoute = require('./routes/cart.route')
const aboutRoute = require('./routes/about.route')
const contactRoute = require('./routes/contact.route')
const couponRoute = require('./routes/coupon.route')

const port = process.env.PORT || 8000

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })

app = express()

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.static('public'))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(sessionMiddleware.create)

app.get('/', (req, res) => {
	res.render('index')
})

app.use('/products', productRoute)
app.use('/cart', cartRoute)
app.use('/about', aboutRoute)
app.use('/contact', contactRoute)
app.use('/coupons', couponRoute)

app.listen(port, () => console.log(`App is listening on port ${port}`))
