const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// Post new category
router.post('/categories', (req, res) => {
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
router.get('/categories', (req, res) => {
    Category.find({}, (err, foundCategory) => {
        if (err) {
            console.log(err)
        } else {
            console.log(foundCategory);
            res.send(foundCategory);
        }
    })
});

// Update category
router.put('/categories/:id', (req, res) => {
    
})

module.exports = router;