const express = require('express');
const bodyParser = require('body-parser');
const mustache = require('mustache-express');
const path = require('path');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
const tspnRoutes = require('./routes/tspnRoutes');
app.use('/', tspnRoutes);
app.get('/', (req, res) => {
    res.render('index', { title: 'The Scottish Pantry Network' });
});
app.use((req, res, next) => {
    res.status(404).send('404 Not found.');
});
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}. Ctrl^c to quit.`);
});
module.exports = app;

