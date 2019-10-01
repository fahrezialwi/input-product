var multer = require('multer')

let multerStorageConfig =  multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },

    filename: (req, file, cb) => {
        cb(null, `product-${Date.now()}.${file.mimetype.split('/')[1]}`)
    }
})

let fileFilterConfig = (req, file, cb) => {
    if (file.mimetype.split('/')[1] == 'jpeg' || file.mimetype.split('/')[1] == 'png'){
        cb(null, true)
    } else {
        req.validation = {
            error: true,
            msg: 'File must be an image'
        }
        cb(null, false)
    }
}

let upload = multer({
    storage: multerStorageConfig,
    fileFilter: fileFilterConfig
})

module.exports = upload