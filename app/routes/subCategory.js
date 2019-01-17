const express = require('express');
const router = express.Router({mergeParams: true});
const Category = require('../models/category');
const SubCategory = require('../models/subCategory');

// POST the new sub-categories
router.post('/categories/:id/subcat', (req, res) => {
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

module.exports = router;