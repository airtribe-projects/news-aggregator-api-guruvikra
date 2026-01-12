const { Router } = require('express')
const { signUp, login, getPreferences, updateUserPreferences } = require('../controllers/users.controllers.js')
const { verifyToken } = require('../middleware/auth.middleware.js')

const router = Router()

router.post('/signup', signUp)
router.post('/login', login)

router.route('/preferences')
    .all(verifyToken)
    .get(getPreferences)
    .put(updateUserPreferences)

module.exports = router
