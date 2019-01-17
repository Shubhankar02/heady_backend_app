/*
 *  Schema File for categories 
 */

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name : String,
    desc : String,
    price : Number
});

module.exports = mongoose.model('Product', productSchema);