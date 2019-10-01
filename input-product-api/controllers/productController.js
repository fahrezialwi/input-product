const db = require('../database')

module.exports = { 
    getProducts: (req, res) => {
        db.query(`select * from products`, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },

    inputProduct: (req, res) => {
        db.query(`insert into products (id, product_name, product_image) values (0, '${req.body.product_name}', '${req.file.filename}')`, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    }  
}