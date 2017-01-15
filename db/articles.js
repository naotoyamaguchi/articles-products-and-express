let db = {
  "data": []
};

function createItem(object){
  let newArticle = {};
  if(object.title && object.body && object.author){
    newArticle.title = object.title;
    newArticle.body = object.body;
    newArticle.author = object.author;
    newArticle.urlTitle = encodeURI(object.title);
  }
  db.data.push(newArticle);
  console.log(db.data);
}


function findItem(urlId){
  for(let i = 0; i < db.data.length; i++){
    if(db.data[i].urlTitle == urlId){
      return db.data[i];
    }
  }
}

function deleteItem(urlId){
  console.log("urlID",urlId);
  for(let i = 0; i < db.data.length; i++){
    if(db.data[i].title == urlId){
      db.data.splice(db.data.indexOf(db.data[i]), 1);
    }
  }
}


module.exports = {
  db: db,
  createItem: createItem,
  findItem: findItem,
  deleteItem: deleteItem,
};