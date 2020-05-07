/*
* Express server for personal blogs.
*/

// Set environment variables
require('dotenv').config()

// Import
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

// Database connection

let databaseURL = process.env.MONGODB_URI || process.env.DATABASE_URL

mongoose.connect(databaseURL, { 
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

mongoose.Promise = global.Promise

mongoose.connection.on('error', console.error.bind(console, `Failed to connect database ${databaseURL}`))

// Server port
const port = process.env.PORT || 3001

// Express server object
const app = express()

app.use(cors())

// Request parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: false} ))

// Routes
app.use(require('./route/api'))

// HTTP 404 reponses
app.use((request, response) => {
    response.status(404).json(["Not found"])
})

// Start server listener
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})