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
  let urlEncodedTitle = encodeURI(reqBody.title);
  let urlEncodedUrl = encodeURI(reqId);
  console.log("reqBody --",reqBody);
  console.log("reqId--", reqId);
  console.log("urlEncodedTitle", urlEncodedTitle);
  if(reqBody.author){  
  db.one(`UPDATE articles SET author = '${reqBody.author}' WHERE title = '${reqId}'`);
  }
  if(reqBody.title){
  db.one(`UPDATE articles SET title = '${reqBody.title}' WHERE title = '${reqId}'`);
  db.one(`UPDATE articles SET urlTitle = '${urlEncodedTitle}' WHERE urlTitle = '${urlEncodedUrl}'`);
  }

  return db.one(`SELECT * FROM articles WHERE articles.title = '${reqBody.title}'`);

  // db.one(`UPDATE articles SET urltitle = `);
  // console.log("reqbody------", reqBody);
  // let urlEncodedReqId = encodeURI(reqId);
  // if(reqBody.title){
  //   db.one(`UPDATE articles SET title = '${reqBody.title}' WHERE urltitle = ${urlEncodedReqId}`);
  // }
  // // if(reqBody.author){
  // //   db.one(`UPDATE articles SET author = '${reqBody.author}' WHERE title = '${reqId}'`);
  // // }
  // // if(reqBody.body){
  // //   db.one(`UPDATE articles SET body = '${reqBody.body}' WHERE title = '${reqId}'`);
  // // }
  // console.log("reach me & reqId....", reqId);
  // return db.query(`SELECT * FROM articles WHERE articles.title = ${reqId}`);
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