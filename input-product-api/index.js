var express = require('express')
var app = express()
const port =  2020
var cors = require('cors')
var bodyParser = require('body-parser')
const productRouter = require('./routers/productRouter')

app.use(bodyParser.json())
app.use(cors())

app.use(productRouter)
app.use('/files', express.static('uploads'))

app.listen(port, console.log('Server up in port ' + port))