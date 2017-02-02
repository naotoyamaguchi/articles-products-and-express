const PG_PASS = process.env.PG_PASS;
const pgp = require('pg-promise')();
const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'products_articles',
  user: 'postgres',
  password: PG_PASS
});

function getAllArticles(){
  return db.query(`SELECT * FROM articles`);
}

function postArticle(reqBody){
  return db.none(`INSERT INTO articles (title, author, body, urlTitle) VALUES ('${reqBody.title}', '${reqBody.author}', '${reqBody.body}', '${encodeURI(reqBody.title)}')`);
}

function getSpecificArticle(reqId){
  return db.one(`SELECT * FROM articles WHERE articles.urlTitle = '${reqId}'`);
}

function putArticle(reqBody, reqId){
  if(reqBody.title){
    db.none(`UPDATE articles SET title = '${reqBody.title}' WHERE title = ${reqId}`);
  }
  if(reqBody.author){
    db.none(`UPDATE articles SET author = '${reqBody.author}' WHERE title = ${reqId}`);
  }
  if(reqBody.body){
    db.none(`UPDATE articles SET body = '${reqBody.body}' WHERE title = ${reqId}`);
  }
  console.log("reach me")
  return db.one(`SELECT * FROM articles WHERE articles.title = '${reqId}'`);
}

function deleteItem(urlId){
  return db.none(`DELETE FROM articles WHERE ID = ${urlId}`);
}


module.exports = {
  db: db,
  getAllArticles: getAllArticles,
  postArticle: postArticle,
  putArticle: putArticle,
  getSpecificArticle: getSpecificArticle,
  deleteItem: deleteItem,
};