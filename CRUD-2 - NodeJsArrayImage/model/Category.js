const {Schema, model} = require('mongoose');

const CategoryCourse = new Schema({
    name: {
        type: String,
    },
    updated: { 
        type: Date, 
        default: Date.now
    },
});

module.exports = model('CategoryCourse', CategoryCourse)