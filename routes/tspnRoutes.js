const { login, verify } = require('../auth/auth');
const express = require('express');
const router = express.Router();
const app = express();
app.use(express.urlencoded({ extended: true }));
const controller = require('../controllers/tspnControllers.js');
router.get("/logout", verify, controller.logout);
router.get('/login', controller.show_login_page); 
router.post('/login', login, controller.handle_login);
router.post('/register', controller.post_new_user);
router.get('/register', controller.show_register_page); 
router.get('/posts/:supplier', controller.show_user_entries);
router.get("/list", controller.landing_page);
router.get('/pantryFood', controller.entries_list);
router.get('/new', controller.new_entries);
router.post('/new', controller.post_new_entry);
router.get('/new', controller.show_new_entries);
router.get('/petersgarden', verify, controller.peters_entries);
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
    console.error(err); // Log the error to the console
    res.status(500).send('Internal Server Error: 1') //+ err.message); // Send the error message to the client
});

module.exports = router;