let db = {
  "data": []
};

let counter = 0;

function createItem(object){

}

function findItem(urlId){
  for(let i = 0; i < db.data.length; i++){
    if(db.data[i].id == urlId){
      return db.data[i];
    }
  }
}

function deleteItem(urlId){
  for(let i = 0; i < db.data.length; i++){
    if(db.data[i].id == urlId){
      db.data.splice(db.data.indexOf(db.data[i]), 1);
    }
  }
}


module.exports = {
  db: db,
  createItem: createItem,
  findItem: findItem,
  deleteItem: deleteItem
};