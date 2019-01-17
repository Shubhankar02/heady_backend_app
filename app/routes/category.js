/*
 *  Routing File for dealing with categories 
 */


const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// Post new category
router.post('/', (req, res) => {
    const name = req.body.name;
    const desc = req.body.desc;

    const newCategory = {
        name: name,
        desc: desc
    };

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
router.get('/', (req, res) => {
    Category.find({}, (err, foundCategory) => {
        if (err) {
            console.log(err)
        } else {
            console.log(foundCategory);
            res.send(foundCategory);
        }
    })
});

// Get particular category
router.get('/:id', (req, res) => {
    Category.findById(req.params.id, (err, category) => {
        if(err) {
            console.log(err)
        } else {
            console.log(category);
            res.send(category);
        };
    });
});

// Update category
router.put('/:id', (req, res) => {
    newData = {name : req.body.name, desc : req.body.desc}
    Category.findByIdAndUpdate(req.params.id, {$set : newData}, (err, category) => {
        if(err) {
            console.log(err);
        } else {
            console.log(category)
            res.redirect('/categories/' + category._id);
        };
    });
});

// DELETE category
router.delete('/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log('SUCCESSFULLY DELETED CATEGORY');
            res.redirect('/categories');
        };
    });
});


module.exports = router;