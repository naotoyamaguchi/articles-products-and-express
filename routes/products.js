const express = require('express');
const bodyparser = require('body-parser');
const router = express.Router();
router.use(bodyparser.urlencoded({extended: true}));
router.use(bodyparser.json());
let products = require('../db/products');
let counter = 0;



router.get('/', (req, res) => {
  // console.log("messages", res.locals.messages());
  res.render('index', {products: products.db.data, messages: res.locals.messages()});
});

router.get('/new', (req, res) => {
  res.render('product_new', {messages: res.locals.messages()});
});

router.get(`/:id`, (req, res) => {
  res.render('product', products.findItem(req.params.id));
});

router.get('/:id/edit', (req, res) => {
  res.render('product_edit', products.findItem(req.params.id));
});



router.post('/', (req, res) => {
  let newProduct = {};
  if(req.body.name && typeof(parseInt(req.body.price)) === 'number' && !isNaN(parseInt(req.body.price)) && typeof(parseInt(req.body.inventory)) === 'number' && !isNaN(parseInt(req.body.inventory))){
    counter++;
    newProduct.id = counter;
    newProduct.name = req.body.name;
    newProduct.price = req.body.price;
    newProduct.inventory = req.body.inventory;
    products.db.data.push(newProduct);
    console.log(products.db.data);
    req.flash("info", "successful nao");
    res.redirect(303, '/products');
  } else {
    console.log("else...");
    req.flash("error", "post failed... enter proper inputs and try again");
    res.redirect(303, '/products/new');
  }

});

router.put('/:id', (req, res) => {
  let productIdPath = parseInt(req.params.id);
  //if the new edit has an id and has a new name assignment
  if(req.body.name){
    for(let i = 0; i < products.db.data.length; i++){
      if(products.db.data[i].id === productIdPath){
        products.db.data[i].name = req.body.name;
      }
    }
    res.redirect(303, `/products/${req.params.id}`);
  }
  res.end();
});

router.delete('/:id', (req, res) => {
  products.deleteItem(req.params.id);
  res.redirect(303, '/products');
});


module.exports = router;