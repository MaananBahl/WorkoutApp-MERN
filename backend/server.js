require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

//start the express app
const app = express();

//middleware - It will run before every other request and then next() would take to that particular req.
app.use(express.json()) // this is for attaching the body to the request for Post/patch requests
app.use((req,res,next) => {
    console.log(req.path,req.method)
    next()
}) 

//routes
app.use('/api/workouts', workoutRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        //assigned port to the app
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB & Listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

