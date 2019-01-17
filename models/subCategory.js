/*
 *  Schema File for categories 
 */


const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    name : String,
    // product: [{
    //     id: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Product"
    //     }
    // }]
});

module.exports = mongoose.model('SubCategory', subCategorySchema);