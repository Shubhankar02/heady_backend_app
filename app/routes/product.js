const express = require('express');
const router = express.Router({mergeParams: true});
const Category = require('../models/category');
const SubCategory = require('../models/subCategory');
const Product = require('../models/product');

// POST the new Product
router.post('/categories/:id/subcat/:subId/product', (req, res) => {
    const data = {
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price
    }
    SubCategory.findById(req.params.subId, (err, subCategory) => {
        if (err) {
            console.log('err');
        } else {
            Product.create(data, (err, newProduct) => {
                if (err) {
                    console.log(err)
                } else {
                    Category.findById(req.params.id, (err, category) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(category.subCategory[0].product);
                            category.subCategory[0].product.push(newProduct)
                            category.save();
                            console.log(newProduct);
                            res.redirect('/');
                        }
                    })

                }
            });
        }
    });
});

module.exports = router;