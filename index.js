const express = require('express');
const app = express();
const mustache = require('mustache-express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.get('/', function(req, res) {
    res.send('Hello! Welcome to the The Scottish Pantry Network.');
});
app.listen(3000, () => {
console.log('Server started on port 3000. Ctrl^c to quit.');
})

const router = require('./routes/tspnRoutes');
app.use('/', router); 
const path = require('path');
const public = path.join(__dirname,'public');
app.use(express.static(public));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
// redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); 


