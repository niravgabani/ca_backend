let mongoose = require('mongoose');
let mongoDB = mongoose.createConnection(process.env.MONGO_URI);

mongoose.set('runValidators', true);
module.exports = mongoDB;