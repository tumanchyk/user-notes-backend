const multer = require('multer');
const path = require('path')

const destination = path.resolve("temp");

const multerConfig = multer.diskStorage({
    destination,
    filename: (_, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname )
    }
})

const uploader = multer({
    storage: multerConfig
})

module.exports = uploader;