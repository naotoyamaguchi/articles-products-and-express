const PG_PASS = process.env.PG_PASS;
const pgp = require('pg-promise')();
const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'products_articles',
  user: 'postgres',
  password: PG_PASS
});

function getAllProducts(){
  return db.query(`SELECT * FROM products`);
}

function getSpecificProduct(reqId){
  return db.one(`SELECT * FROM products WHERE products.id = ${reqId}`);
}

function postProduct(reqBody){
  return db.none(`INSERT INTO products (name, price, inventory) VALUES ('${reqBody.name}', ${reqBody.price}, ${reqBody.inventory})`);
}

function putProduct(reqBody, reqId){
  if(reqBody.name){
    db.none(`UPDATE products SET name = '${reqBody.name}' WHERE ID = ${reqId}`);
  }
  if(typeof(parseInt(reqBody.price)) === 'number' && !isNaN(parseInt(reqBody.price))){
    db.none(`UPDATE products SET price = ${reqBody.price} WHERE ID = ${reqId}`);
  }
  if(typeof(parseInt(reqBody.inventory)) === 'number' && !isNaN(parseInt(reqBody.inventory))){
    db.none(`UPDATE products SET inventory = ${reqBody.inventory} WHERE ID = ${reqId}`);
  }
  return db.one(`SELECT * FROM products WHERE products.id = ${reqId}`);
}


function deleteItem(urlId){
  return db.none(`DELETE FROM products WHERE ID = ${urlId};`);
}


module.exports = {
  getAllProducts: getAllProducts,
  getSpecificProduct: getSpecificProduct,
  postProduct: postProduct,
  putProduct: putProduct,
  deleteItem: deleteItem
};