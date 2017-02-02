const express = require('express');
const bodyparser = require('body-parser');
const router = express.Router();
router.use(bodyparser.urlencoded({extended: true}));
router.use(bodyparser.json());
let products = require('../db/products');

router.get('/', (req, res) => {
  products.getAllProducts()
  .then( result => {
    res.render('index', {products: result, messages: res.locals.messages()});
  })
  .catch(err => console.error(err));
});

router.get('/new', (req, res) => {
  res.render('product_new', {messages: res.locals.messages()});
});

router.get(`/:id`, (req, res) => {
  products.getSpecificProduct(req.params.id)
  .then( result => {
    res.render('product', result);
  })
  .catch( err => console.error(err));
});

router.get('/:id/edit', (req, res) => {
  products.getSpecificProduct(req.params.id)
  .then( result => {
    res.render('product_edit', result);
  })
  .catch( err => console.error(err));
});

router.post('/', (req, res) => {
  if(req.body.name && typeof(parseInt(req.body.price)) === 'number' && !isNaN(parseInt(req.body.price)) && typeof(parseInt(req.body.inventory)) === 'number' && !isNaN(parseInt(req.body.inventory))){
    products.postProduct(req.body)
    .then((result) => {
      req.flash("info", "You succesfully entered a new product");
      res.redirect(303, '/products');
    })
    .catch( () => {
      return false;
    });
  } else {
    req.flash("error", "post failed... enter proper inputs and try again");
    res.redirect(303, '/products/new');
  }
});

router.put('/:id', (req, res) => {
  products.putProduct(req.body, req.params.id)
  .then( () => {
    res.redirect(303, `/products/${req.params.id}`);
  })
  .catch(err => console.error(err));
});

router.delete('/:id', (req, res) => {
  products.deleteItem(req.params.id)
  .then( () => (
   res.redirect(303, '/products') 
   ))
  .catch(err => console.error(err));
});


module.exports = router;