const express = require('express');//middleware module
const cors = require('cors');//allow fetch module
const bodyParser = require('body-parser');

//static DB
let db = [];
let app = express();//will use express middleware

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get('/userInfo', getDb);
app.post('/update', updateDb);
app.post('/remove', fixDb);

function fixDb(req,res,err){
  let delCard = req.body.removedCard;

  if(!(delCard ===  undefined)){
    let newDb = db.filter(({id}) => id !== delCard[0].id);
    db = newDb;
  }
}

function getDb(req,res,err){
  res.status(200).json(db);
}

function updateDb(req,res,err){

  if(req.body.userInfo.length > 0){
    db = req.body.userInfo;
    res.status(200).json(db);
  }else{
      res.status(200)
  }

}
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
  console.log(S`erver is listening on port ${PORT}` );
});
