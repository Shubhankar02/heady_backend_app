const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : String,
    desc : String,
    price : Number
});

module.exports = mongoose.model('Product', productSchema);