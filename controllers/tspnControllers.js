const TspnDAO = require('../models/tspnModel');
const db = new TspnDAO();
const userDao = require('../models/userModel.js');
db.init();
exports.entries_list = function(req, res) {
    res.send('<h1>Available Food</h1><p>Not yet implemented:will show a list of available food.</p>');
    db.getAllEntries();
}

exports.landing_page = function(req, res) {
    db.getAllEntries()
    .then((list) => {
    res.render('entries', {
    'title': 'The Scottish Food Panty',
    'entries': list
    });
    console.log('promise resolved');
    })
    .catch((err) => {
    console.log('promise rejected', err);
    })
}
exports.new_entry = function(req, res) {
    res.send('<h1>Not yet implemented: show a new entry page.</h1>');
}

exports.peters_entries = function(req, res) {
    res.send('<h1>Processing Peter\'s Entries, see terminal</h1>');
    db.getPetersEntries();
}

exports.new_entries = function(req, res) {
    res.render('newEntry', {
    'title': 'The Scottish Food Panty'
    })
}

exports.show_new_entries = function(req, res) {
    res.render('newEntry', {
     'title': 'The Scottish Food Pantry',
     'user': 'user'
     })
    } 

exports.post_new_entry = function(req, res) {
    console.log('processing post-new_entry controller');
    if (!req.body.supplier) {
        res.status(400).send("Entries must have an supplier.");
        return;
    }
    db.addEntry(req.body.supplier, req.body.typeoffood, req.body.listoffood);
    res.redirect('/');
}

exports.show_user_entries = function(req, res) {
    console.log('filtering supplier name', req.params.supplier);
    let user = req.params.supplier;
    db.getEntriesByUser(user).then(
    (entries) => {
    res.render('entries', {
    'title': 'The Scottish Food Pantry',
    'entries': entries
    });
    }).catch((err) => {
    console.log('error handling supplier posts', err);
    });       
}

exports.show_register_page = function(req, res) {
    res.render("user/register");
} 

exports.post_new_user = function(req, res) {
    console.log(req.body); // Log the request body
    
    const user = req.body.username;
    const password = req.body.pass;
    const role = req.body.role; 

    if (!user || !password) {
        return res.status(401).send('No user or no password');
    }

    userDao.lookup(user, function(err, u) {
        if (err) {
            console.error('Error looking up user:', err);
            return res.status(500).send('Internal Server Error2');
        }
        if (u) {
            return res.status(401).send('User exists: ' + user);
        }
        
        // Create the user
        userDao.create(user, password, role, function(err) {
            if (err) {
                console.error('Error creating user:', err);
                return res.status(500).send('Internal Server Error3');
            }
            console.log('Registered user:', user, 'with role:', role);
            res.redirect('/login');
        });
    });
}

exports.show_login_page = function(req, res) {
    res.render("user/login");
}; 

exports.handle_login = function(req, res) {
    res.render("newEntry", {
        title: "The Scottish Food Pantry",
        user: req.user // Assuming req.user contains user data after login
    });
};

exports.logout = function (req, res) {
    res
        .clearCookie("jwt")
        .status(200)
        .redirect("/");
};

