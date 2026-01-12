const jwt = require('jsonwebtoken')


const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1]

    try {
        const secret = process.env.ACCESS_TOKEN_SECRET
        const decoded = jwt.verify(token, secret)

        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }


}


module.exports = {
    verifyToken
}
