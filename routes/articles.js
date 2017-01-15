const express = require('express');
const bodyparser = require('body-parser');
const router = express.Router();
router.use(bodyparser.urlencoded({extended: true}));
router.use(bodyparser.json());
let articles = require('../db/articles');

router.get('/', (req, res) => {
  res.render('tempArticleIndex', articles.db);
});

router.get('/new', (req, res) => {
  res.render('article_new');
});

router.get('/:title', (req, res) => {
  res.render('article', articles.findItem(encodeURI(req.params.title)));
});

router.get('/:title/edit', (req, res) => {
  res.render('article_edit', articles.findItem(encodeURI(req.params.title)));
});



router.post('/', (req, res) => {
  articles.createItem(req.body);
  res.redirect(303, '/articles');
});

router.put('/:title', (req, res) => {
  console.log("req.params.title", req.params.title);
  for(let i = 0; i < articles.db.data.length; i++){
      if(articles.db.data[i].urlTitle == encodeURI(req.params.title)){
        console.log(req.body);
        articles.db.data[i].title = req.body.title;
        articles.db.data[i].urlTitle = encodeURI(req.body.title);
      }
    }
  res.redirect(303, `/articles/${req.body.title}`);
});

router.delete('/:title', (req, res) => {
  articles.deleteItem(req.params.title);
  res.redirect(303, '/articles');
});


module.exports = router;