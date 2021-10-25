const mongoose = require('mongoose');
module.exports = () => {
    mongoose.connect('mongodb://localhost:27017/test').then(() => {
        console.log("MongoGa Ulandik")
    }).catch(err => {
        console.log(err);
    })

}