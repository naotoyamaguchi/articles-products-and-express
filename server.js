// jshint esversion: 6

const express = require('express');
const handlebars = require('express-handlebars');
const bodyparser = require('body-parser');
let app = express();
app.use(bodyparser.urlencoded());
let data = {
  'products': [
  ]
};

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

app.post('/products', (req, res) => {
  let newProduct = req.body;
  if(newProduct.hasOwnProperty("name") && newProduct.hasOwnProperty("price") && newProduct.hasOwnProperty("inventory")){
    newProduct.id = data.products.length;
    data.products.push(newProduct);
  }
  console.log("products", data.products);
  res.render('index', data);
});

module.exports = app;