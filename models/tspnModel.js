const nedb = require('gray-nedb');

class Tspn {
    constructor(dbFilePath) {
        if (dbFilePath) {
        this.db = new nedb({ filename: dbFilePath, autoload: true });
        console.log('DB connected to ' + dbFilePath);
        } else {
        this.db = new nedb();
        }
        }
        init() {
            this.db.insert({
            typeoffood: 'Vegtables',
            listoffood: 'Tomato x2, Potatoes x10, Leak x5',
            bestbefore: '27/05/2024',
            supplier: 'Peters Garden'
            });
            //for later debugging
            console.log('db entry Peter inserted');
    
            this.db.insert({
                typeoffood: 'Cans of food',
                listoffood: 'Tomato soup x3, Chicken Soup x1, Bacon and Ham x5',
                bestbefore: '01/07/2024',
                supplier: 'St Andrews Chapel Collection'
            });
            //for later debugging
            console.log('db entry St Andrews inserted');
           }
           //a function to return all entries from the database
getAllEntries() {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
    //use the find() function of the database to get the data,
    //error first callback function, err for error, entries for data
    this.db.find({}, function(err, entries) {
    //if error occurs reject Promise
    if (err) {
    reject(err);
    //if no error resolve the promise & return the data
    } else {
    resolve(entries);
    //to see what the returned data looks like
    console.log('function all() returns: ', entries);
    }
    })
    })
    }
    getPetersEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
        //find(author:'Peter) retrieves the data,
        //with error first callback function, err=error, entries=data
        this.db.find({ supplier: 'Peters Garden' }, function(err, entries) {
        //if error occurs reject Promise
        if (err) {
        reject(err);
        //if no error resolve the promise and return the data
        } else {
        resolve(entries);
        //to see what the returned data looks like
        console.log('getPetersEntries() returns: ', entries);
        }
        })
        })
        }
        

        addEntry(supplier, typeoffood, listoffood, bestbefore) {
            var entry = {
            supplier: supplier,
            typeoffood: typeoffood,
            listoffood: listoffood,
            bestbefore: bestbefore
            }
            console.log('entry created', entry);
            this.db.insert(entry, function(err, doc) {
            if (err) {
            console.log('Error inserting document', typeoffood);
            } else {
            console.log('document inserted into the database', doc);
            }
            })
            }

            getEntriesByUser(supplierName) {
                return new Promise((resolve, reject) => {
                this.db.find({ 'supplier': supplierName }, function(err, entries) {
                if (err) {
                reject(err);
                } else {
                resolve(entries);
                console.log('getEntriesByUser returns: ', entries);
                }
                })
                })
                }
}
module.exports = Tspn;