/*
 * Index routing file
 */

const express = require('express');
const router = express.Router();


router.get("/", (req, res) => {
    res.end('This is home page');
})


router.get('*', (req, res) => {
    res.status(404).send('Page not found');
});

module.exports = router;