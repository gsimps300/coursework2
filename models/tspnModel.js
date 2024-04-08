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
            typeoffood: 'Vegstables',
            listoffood: 'Tomato x2, Potatoes x10, Leak x5',
            bestbefore: '2024-05-21',
            supplier: 'Peters Garden'
            });
            //for later debugging
            console.log('db entry Peter inserted');
    
            this.db.insert({
                typeoffood: 'Cans of food',
                listoffood: 'Tomato soup x3, Chicken Soup x1, Bacon and Ham x5',
                bestbefore: '2024-07-1',
                supplier: 'St Andrews chapel Collection'
            });
            //for later debugging
            console.log('db entry St Andrews inserted');
           }
        
}
module.exports = Tspn;