const express = require('express');//middleware module
const cors = require('cors');//allow fetch module
const bodyParser = require('body-parser');

//static DB
let db = [];
let app = express();//will use express middleware

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req,res) => {res.send("working!")});
app.get('/userInfo', getDb);
app.post('/newEntry', addList);
app.post('/removeEntry', cutList);
app.post('/lateComment', comList);

function cutList(req,res,next){

  if(req.body.oldCard === undefined){
    res.status(404).send("Bad entry");
  }else{
    let oldId = req.body.oldCard.id;
    const updatedDb = db.filter(({id}) => id !== oldId);
    db = updatedDb;
    res.status(200).json(db)
  }

}

function addList(req,res,next){

  if(req.body.newCard === undefined){
    res.status(404).send("Bad entry");
  }else{
    db.push(req.body.newCard)
    res.status(200).json(db)

  }
}

function comList(req,res,next){

  if(req.body.upCard === undefined){
    res.status(404).send("Bad entry");
  }else{
    let upId = req.body.upCard.id;
    db.map((photo) => {
      if(photo.id === upId){
        photo.comment = req.body.userComm;
      }
    })
    res.status(200).json(db)

  }
}


function getDb(req,res,err){
  res.status(200).json(db);
}

const PORT = process.env.PORT || 3005;

app.listen(PORT, () =>{
  console.log(`Server is listening on port ${PORT}` );
});

/*console.log("inside Adder on DB side")
console.log("what i recieved was ");
console.log(req.body.newCard);
console.log("or")
console.log(req.body)*/
