/*
 * This is primary file for application.
 *
 */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const indexRoutes = require('./routes/index')
const categoryRoutes = require('./routes/category');
const subCategoryRoutes = require('./routes/subCategory');
const productRoutes = require('./routes/product');

mongoose.connect('mongodb://localhost:27017/heady_backend', {useNewUrlParser : true});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use('/', indexRoutes);
app.use('/categories', categoryRoutes);
app.use('/categories/:id/subcat', subCategoryRoutes);
app.use('/categories/:id/subcat/:subId/product',productRoutes);


app.listen(3000, (err, callback) => {
    if(!err) console.log('Server has started on port 3000');
});



