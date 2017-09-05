const {Router} = require('express')

const products = require('./products.json')

const router = Router()

router.get('/', function (req, res) {
    const cart = req.session.cart || []
    res.render('index.ejs', {products, cart})
})

router.get('/cart/remove/:id', function (req, res) {
    const cart = (req.session.cart || []).filter(c => c.product.id != req.params.id)
    req.session.cart = cart
    res.render('index.ejs', {products, cart})
})

router.get('/cart/add/:id', function (req, res) {
    let product = false;
    products.map(p => p.id === req.params.id ? product = p : false)
    if (product !== false) {
        let cart = req.session.cart || []
        let exists = false;
        cart = cart.map(c => {
            if (c.product.id === product.id) {
                exists = true
                return Object.assign({}, c, {count: c.count + 1})
            }
            return c
        })
        if (exists === false) {
            cart.push({count: 1, product})
        }
        req.session.cart = cart
    }
    res.redirect('/')
})

module.exports = router
