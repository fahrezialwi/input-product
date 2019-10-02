const db = require('../database')
const fs = require('fs')

module.exports = { 
    getProducts: (req, res) => {
        db.query(`select * from products`, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },

    inputProduct: (req, res) => {
        try {
            if(req.validation) throw req.validation
            if(req.file.size > 5000000) throw {error: true, message: 'Image size too large'}

            let data = JSON.parse(req.body.data)
            db.query(`insert into products (id, product_name, product_price, product_image) values (0, '${data.productName}', ${data.productPrice}, '${req.file.path.replace('uploads', 'files')}')`, (err, result) => {
                try {
                    if (err) throw err
                    res.send(result)
                } catch (error) {
                    // delete file ketika query/database error
                    fs.unlinkSync(req.file.path)
                    console.log(error)                
                }
            })
        } catch (error) {
            // delete file ketika file size lebih dari 5MB
            fs.unlinkSync(req.file.path)
            console.log(error)
        }
    }  
}