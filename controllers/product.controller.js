const Product = require('../models/product.model')

module.exports.index = async (req, res) => {
	const page = parseInt(req.query.page) || 1
	const perPage = 12
	const start = (page - 1) * perPage
	const end = page * perPage

	const products = await Product.find()

	let pages = []
	const lastPage = Math.ceil(products.length / perPage)

	if (products.length > 0 && page === 1) {
		pages.push(1, 2, 3) 
	}

	if (products.length > 0 && page === lastPage) {
		pages.push(page - 2, page -1, page) 
	}

	if (page > 1 && page < lastPage) {
		pages.push(page - 1, page, page + 1)
	}

	if (lastPage === 2) {
		pages = []
		pages.push(1, 2)
	}

	if (lastPage === 1) {
		pages = []
		pages.push(1)
	}

	res.render('products/index', { 
		products: products.slice(start, end),
		activePage: page,
		pages: pages
	})
}