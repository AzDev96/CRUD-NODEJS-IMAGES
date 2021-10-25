const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Course = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    images: [
        {type: String}
    ],
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoryCourse',
    },
    updated: { 
        type: Date, 
        default: Date.now
    },
    year:     { 
        type: Number, 
        min: 1900, 
        max: 2300 
    },
});

module.exports = mongoose.model('course', Course);