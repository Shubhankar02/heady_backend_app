/*
 *  Schema File for categories 
 */


const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: String,
    desc: String,
    subCategory: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCategory"
        },
        name : String,
        product: [{
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            name: String,
            desc: String,
            price: Number
        }]
    }]
});
module.exports = mongoose.model('Category', categorySchema);