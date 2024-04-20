const Datastore = require("gray-nedb");
const bcrypt = require('bcrypt'); const
saltRounds = 10; 

class UserDAO { constructor(dbFilePath) { 
    if(dbFilePath) { this.db = new Datastore({
        filename: dbFilePath, autoload: true });
        } 
    else { 
        this.db = new Datastore();
        }
    }
    init() {
        this.db.insert({
            user: 'Peters Garden',
            password: '$2b$10$I82WRFuGghOMjtu3LLZW9OAMrmYOlMZjEEkh.vx.K2MM05iu5hY2C',
            role: 'Supplier'
        });
        console.log('db entry Peter user inserted');
        this.db.insert({
            user: 'St Andrews Chapel Collection',
            password: '$2b$10$bnEYkqZM.MhEF/LycycymOeVwkQONq8kuAUGx6G5tF9UtUcaYDs3S',
            role: 'Supplier'
        });
        console.log('db entry St Andrews user inserted');
        return this;
    } 
    create(username, password, role) {
        const that = this;
        bcrypt.hash(password, saltRounds).then(function(hash) {
            var entry = { user: username, password: hash, role: role }; // Include role
            that.db.insert(entry, function (err) {
                if (err) {
                    console.log("Can't insert user:", username);
                }
                else{
                    console.log("User Inserted")
                }
            });
        });
    } 
    lookup(user, cb) { 
        this.db.find({'user':user}, function (err, entries) { 
            if (err) { return cb(null, null);} 
            else { 
                if (entries.length == 0) {
                    return cb(null, null);
                } 
            return cb(null, entries[0]);
            }
        });
    } 
} 
const dao = new
UserDAO(); dao.init();
module.exports = dao;