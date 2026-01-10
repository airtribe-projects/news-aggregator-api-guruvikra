const app = require('./app.js')
const db = require('./db/db.js')


const PORT = process.env.PORT || 3000
console.log("start")
db().then(() => {
    app.listen(PORT, (err) => {
        if (err){
            return console.log(err)
        }
        console.log(`server is running on ${PORT}`)
    })
}).catch((err) => {
    console.error(err)
})
