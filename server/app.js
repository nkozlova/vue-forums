let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let morgan = require('morgan');
let app = express();
let session = require('express-session');
let logger = require('./utils/winston');
let config = require('./config/config');

let hbs = require('hbs');
hbs.registerPartials(__dirname  +'/views/partials', function (err) {});

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views/'))

app.use(morgan('combine', { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(config.JWT_SECRET));
app.use(express.static(path.join(__dirname, '../public')));

app.use(session({
	secret: config.JWT_SECRET,
	resave: false,
	saveUninitialized: true
}))

require('./routes/forum')(app);
require('./routes/topic')(app);
app.get('*', (req, res) => res.status(404).render('404', {url : config.URL_SITE}))

module.exports = app;
