/*
 * This is primary file for application.
 *
 */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoDb = require('mongodb');

const Category = require('./models/category');
// console.log(Category.schema.obj.subCategory)
const Product = require('./models/product');
const SubCategory = require('./models/subCategory');

mongoose.connect('mongodb://localhost:27017/heady_backend', {useNewUrlParser : true});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// Post new category
app.post('/categories', (req, res) => {
    const name = req.body.name;
    const desc = req.body.desc

    const newCategory = {name : name, desc : desc};

    Category.create(newCategory, (err, newCategory) => {
        if (err) {
            console.log('err');
        } else {
            console.log(newCategory);
            res.redirect('/');
        }
    });
});

// Get all the categories
app.get('/categories', (req, res) => {
    Category.find({}, (err, foundCategory) => {
        if(err) {
            console.log(err)
        } else {
            console.log(foundCategory);
            res.send(foundCategory);
        }
    })
});

// POST the new sub-categories
app.post('/categories/:id/subcat', (req, res) => {
    const data = {name : req.body.name}
    Category.findById(req.params.id, (err, category) => {
        if(err) {
            console.log('err');
        } else {
            SubCategory.create(data, (err, newSubCat) => {
                if (err) {
                    console.log(err)
                } else {
                    category.subCategory.push(newSubCat)
                    category.save();
                    console.log(newSubCat);
                    res.redirect('/');
                }
            });
        }
    });
});

// POST the new Product
app.post('/categories/:id/subcat/:subId/product', (req, res) => {
    const data = {
        name: req.body.name,
        desc : req.body.desc,
        price : req.body.price
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

app.get("/", (req,res) => {
  res.end('This is home page');
})


app.get('*', (req, res) => {
    res.status(404).send('Page not found');
});

app.listen(3000, (err, callback) => {
    if(!err) console.log('Server has started on port 3000');
});



