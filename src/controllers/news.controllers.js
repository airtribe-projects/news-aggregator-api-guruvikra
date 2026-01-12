const User = require('../models/users.js')
const axios = require('axios')

const getNews = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email })
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        let preferences = user.preferences;
        if (!preferences || preferences.length === 0) {
            return res.status(400).json({ error: 'please add atleat one Preferences to get related news' });
        }
        const query = `(${preferences.join(' OR ')})`
        const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.NEWS_API_KEY}`
        const response = await axios.get(url)
        res.json({
            news: response.data
        })
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getNews
}
