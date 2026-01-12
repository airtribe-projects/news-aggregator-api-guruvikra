const { Router } = require('express')
const { getNews } = require('../controllers/news.controllers.js')
const { verifyToken } = require('../middleware/auth.middleware.js')

const router = Router()


router.route('/')
    .all(verifyToken)
    .get(getNews)

module.exports = router
