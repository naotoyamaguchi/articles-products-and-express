const methodOverride = require('method-override');
const express = require('express');
const handlebars = require('express-handlebars');
const bodyparser = require('body-parser');
const productRouter = require('./routes/products');
const articleRouter = require('./routes/articles');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');



let app = express();
app.use(cookieParser());
app.use(session({secret: "something"}));

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});



app.use(methodOverride('_method'));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
let products = require('./db/products');
let counter = 0;

const hbs = handlebars.create(
  {
    extname: '.hbs',
    defaultLayout: 'app'
  }
);

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/products', productRouter);
app.use('/articles', articleRouter);

module.exports = app;