const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
//     •	Name
// •	Image url
// •	Author
// •	pages
// •	price

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: Number,
        required: true
    },
    imageurl: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('book', BookSchema)