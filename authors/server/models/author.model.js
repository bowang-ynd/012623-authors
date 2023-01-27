const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Who is your favorite author?"],
        minLength: [3, "Your favorite author's name should have at least 3 characters!"]},
}, { timestamps: true });

const Author = mongoose.model('author', authorSchema.plugin(uniqueValidator));


module.exports = Author;