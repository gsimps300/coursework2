const express = require('express');
const router = express.Router();
const controller = require('../controllers/tspnControllers.js');
router.get("/", controller.landing_page);
router.get('/pantryFood', controller.entries_list);
router.get('/new', controller.new_entry);
const path = require('path');
router.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/about.html'));
});
router.use(function(req, res) {
res.status(404);
res.type('text/plain');
res.send('404 Not found.');
})
router.use(function(err, req, res, next) {
res.status(500);
res.type('text/plain');
res.send('Internal Server Error.');
})
module.exports = router;