var express = require('express')
var router = express.Router()
const productController = require('../controllers/productController')
var upload = require('../helpers/multer')

router.get('/products', productController.getProducts)
router.post('/products', upload.single('browse_file'), productController.inputProduct)
module.exports = router