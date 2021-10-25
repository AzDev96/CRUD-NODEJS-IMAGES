const mongoose = require('mongoose');
module.exports = () => {
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log(`Mongo DB OFLAYN Ulandik`);
    }).catch((err) => {
        console.log(err);
    })
}