const router = require("express").Router()
const uploaderMiddleware = require("../middlewares/uploader.middleware")
const { uploader } = require("../controllers/upload.controller")

router.post('/image', uploaderMiddleware.single('imageData'), uploader)

module.exports = router
