const express = require("express")
const userRoutes = require('./routes/users.routes.js')
const newsRoutes = require('./routes/news.routes.js')

const app = express()
app.use(express.json())


app.use('/users', userRoutes)
app.use('/news', newsRoutes)


module.exports= app
