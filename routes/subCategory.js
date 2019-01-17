/*
 *  Routing File for dealing with categories 
 */


const express = require('express');
const router = express.Router({mergeParams: true});
const Category = require('../models/category');
const SubCategory = require('../models/subCategory');

// POST the new sub-categories
router.post('/', (req, res) => {
    const data = {
        name: req.body.name
    }
    Category.findById(req.params.id, (err, category) => {
        if (err) {
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

// Get all the Sub-Categories
router.get('/', (req, res) => {
    SubCategory.find({}, (err, subCategory) => {
        if(err) {
            console.log(err);
        } else {
            res.send(subCategory);
        };
    });
});

// Get particular sub-Category
router.get('/:id', (req, res) => {
    SubCategory.findById(req.params.id, (err, subCategory) => {
        if(err) {
            console.log(err);
        } else {
            res.send(subCategory);
        }
    });
});

// UPDATE sub-category
router.put('/:id', (req, res) => {
    const newData = {name : req.body.name}
    SubCategory.findByIdAndUpdate(req.params.id, {$set : newData}, (err, subCategory) => {
        if(err) {
            console.log(err);
        } else {
            console.log(subCategory);
            res.redirect('/categories/:id/subcat/' +subCategory._id)
        }
    })
})

// DELETE sub-category
router.delete('/:id', (req, res) => {
    SubCategory.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            console.log(err)
        } else {
            console.log('Successfully deleted sub-category');
            res.redirect('/categories/:id/subcat');
        }
    });
});

module.exports = router;