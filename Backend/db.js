
const mongoose = require('mongoose')
require('dotenv').config()
const mongoURI = "mongodb+srv://Pankaj:Pankaj2002@cluster0.dddtjax.mongodb.net/test"

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected")
    })
}

module.exports = connectToMongo;