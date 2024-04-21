const express = require('express');
const router = express.Router();
const controller = require('../controllers/tspnControllers.js');
const { login, verify } = require('../auth/auth');

router.get("/loggedIn", verify, controller.loggedIn_landing); 
router.get("/logout", verify, controller.logout);
router.post('/login', login, controller.handle_login);
// router.post('/login', login, function(req, res, next) {
    
    
//     console.log("Before role check");
//     const role = req.user.role; // Access user's role
    
//     // Redirect based on user's role
//     if (role === 'Customer') {
//         res.redirect('/loggedInMainPage/customer');
//         console.log("logged in as customer");
//     } else if (role === 'Admin') {
//         res.redirect('/loggedInMainPage/admin');
//         console.log("logged in as admin");
//     } else if (role === 'Supplier') {
//         res.redirect('/loggedInMainPage/supplier');
//         console.log("logged in as supplier");
//     } else {
//         // Handle case where role is undefined or unrecognized
//         res.redirect('/login'); // Redirect to login page
//         console.log("went knowhere");
//     }
// });
//this is so can log in and loads diffrent options for roles
router.get('/login', controller.show_login_page); 

router.post('/register', controller.post_new_user);
router.get('/register', controller.show_register_page); 
router.get('/posts/:supplier', verify, controller.show_user_entries); // Assuming authentication is required
router.get("/list", controller.landing_page);
router.get('/pantryFood', controller.entries_list);
router.get('/new', controller.new_entries);
router.post('/new', controller.post_new_entry);
router.get('/new', controller.show_new_entries);
router.get('/petersgarden', verify, controller.peters_entries); // Assuming authentication is required

const path = require('path');
router.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/about.html'));
});

router.get('/', function(req, res) {
    res.render('index', { title: 'Welcome to The Scottish Pantry Network' });
});

router.use(function(req, res, next) {
    res.status(404).send('404 Not found.');
});

router.use(function(err, req, res, next) {
    console.error(err); 
    res.status(500).send('Internal Server Error: 1' + err.message); 
});

module.exports = router;