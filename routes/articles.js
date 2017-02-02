const express = require('express');
const bodyparser = require('body-parser');
const router = express.Router();
router.use(bodyparser.urlencoded({extended: true}));
router.use(bodyparser.json());
let articles = require('../db/articles');

router.get('/', (req, res) => {
  articles.getAllArticles()
  .then( result => {
    console.log(result);
    res.render('tempArticleIndex', {data: result});
  })
  .catch(err => console.error(err));
});

router.get('/new', (req, res) => {
  res.render('article_new', {messages: res.locals.messages()});
});

router.get('/:title', (req, res) => {
  let encodedTitle = encodeURI(req.params.title);
  articles.getSpecificArticle(encodedTitle)
  .then( result => {
    res.render('article', result);
  })
  .catch( err => console.error(err));
});

router.get('/:title/edit', (req, res) => {
  let encodedTitle = encodeURI(req.params.title);
  articles.getSpecificArticle(encodedTitle)
  .then( result => {
    res.render('article_edit', result);
  })
  .catch( err => console.error(err));
});



router.post('/', (req, res) => {
  //no validations rn
  articles.postArticle(req.body)
  .then( result => {
    res.redirect(303, '/articles');
  })
  .catch( err => console.error(err));
});

router.put('/:title', (req, res) => {
  articles.putArticle(req.body, req.params.title)
  .then( result => {
    console.log("result--- ", result);
    res.redirect(303, `/articles/${result.urltitle}`);
  })
  .catch( err => console.error(err));
});

router.delete('/:title', (req, res) => {
  articles.deleteItem(req.params.title)
  .then( () => (
  res.redirect(303, '/articles')  
  ))
  .catch(err => console.error(err));
});


module.exports = router;