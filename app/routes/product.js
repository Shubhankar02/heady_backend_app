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
                        };
                    });

                };
            });
        };
    });
});

// Get all products
router.get('/categories/:id/subcat/:subId/product', (req, res) => {
    Product.find({}, (err, products) => {
        res.send(products)
    });
});

// Get particular product
router.get('/categories/:id/subcat/:subId/product/:productId', (req, res) => {
    Product.findById(req.params.productId, (err, product) => {
        res.send(product);
    });
});

// Update product
router.put('/categories/:id/subcat/:subId/product/:productId', (req, res) => {
    const newData = {name : req.body.name, desc : req.body.desc, price : req.body.price}
    Product.findByIdAndUpdate(req.params.productId, {$set : newData}, (err, product) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/categories/:id/subcat/:subId/product/' + product._id);
        };
    });
});

// Delete product
router.delete('/categories/:id/subcat/:subId/product/:productId', (req, res) => {
    Product.findByIdAndRemove(req.params.productId, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log('Sucessfully deleted product');
            res.redirect('/categories/:id/subcat/:subId/product/');
        };
    });
});

module.exports = router;