const tspnDAO = require('../models/tspnModel');
const db = new tspnDAO();
exports.entries_list = function(req, res) {
    res.send('<h1>Available Food</h1><p>Not yet implemented:will show a list of available food.</p>');
    }
    exports.landing_page = function(req, res) {
    res.send('<h1>Welcome to the The Scottish Food Pantry Website.</h1>');
    }
    exports.new_entry = function(req, res) {
    res.send('<h1>Not yet implemented: show a new entry page.</h1>');
    }

