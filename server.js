const bcrypt = require('bcrypt')

const express = require('express')
const mongo = require('mongoose')
const app = express()
const socket = require('socket.io')
const server = require('http').Server(app)
const io = socket(server)

const jwt = require('jsonwebtoken')
const jwtStategy = require('passport-jwt').Strategy,
      extractJwt = require('passport-jwt').ExtractJwt,
      passport = require('passport')
 
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json({ extended: true, limit: '5mb' });

let Comment = require('./shemaComment')
let Post = require('./shemaPost');
const Like = require('./shemaLike');
const User = require('./shemaUser');
const friend = require('./shemaFriend');


const db = mongo.connection

const secret = 'hviderussisk'

let options = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,UPDATE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept')
  next()
})
app.use(jsonParser)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('social/build'));
  const path = require('path');
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'social', 'build', 'index.html'));
  });
}
async function start() {
  try {
    await mongo.connect(
      'mongodb+srv://hviderussisk:dx545713dx@cluster0.u3rfh.mongodb.net/sd',
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      }, function (err) {
        if (err) throw err
        console.log('Successfully connected DB');
      }
    )
    const PORT = process.env.PORT || 80;
    server.listen(PORT, () => `Server running on port ${PORT}`);
  } catch (error) {
    console.log(error)
  }
}
start()

// io.on('connection', (socket)=>{
//   console.log('Сокет работает',socket)
// })

app.post('/addUser', async (req, res) => {
  try {
    let salt = bcrypt.genSaltSync(10)
    const cruptPass = bcrypt.hashSync(req.body.password, salt)
    let id = await db.collections.users.find({}).count()
    console.log(req.body)
    let newUser = new User({
      email: req.body.email,
      name: req.body.name,
      id: id+1,
      s: salt,
      lastname: req.body.lastname,
      password: cruptPass,
      photo: null
    })
    newUser.save(() => {console.log('Пользователь создан.') })
    res.status(200).send(newUser);
  } catch (e) { console.log(e) }
})


passport.use( new jwtStategy(options, async (jwt_payload, done) => {
    await db.collections.users.findOne({ email: jwt_payload.email , id: jwt_payload.id } , ( error , user ) => {
      if(error){
        return done(error, false)
      }else if(user){
        return done(null, user)
      }else{
        return done(null, false)
      }
    })
}))



app.post('/auth', jsonParser, async ( req, res ) => {
    let id = await db.collections.users.findOne({ email: req.body.login })
    if(id){
      if(id.password === bcrypt.hashSync(req.body.password, id.s)){
        let token = jwt.sign({
            email: id.email,
            id: id.id
        } , secret , {expiresIn:60*10} )
        res.status(200).json('Bearer '+ token)
      }else{
        res.status(401).send('Неверный пароль.')
      }
    }else{
      res.status(404).send('Такого пользователя не существует.')
    }
})

app.post('/addpost', passport.authenticate('jwt', {session: false}) , (req, res) => {
  try {
    let newPost = new Post({
      liked: req.body.liked,
      idUser: req.body.idUser,
      whomIdUser: req.body.whomIdUser,
      id: mongo.Types.ObjectId(),
      name: req.body.name,
      timePost: req.body.timePost,
      info: req.body.info,
      likeList: req.body.likeList,
      comment: req.body.comment,
      share: req.body.share
    })
    newPost.save(() => {
      console.log('IlyaPost successfully saved.')
    })
    res.status(200).send(newPost);
  } catch (e) {
    console.log(e)
  }
})
app.post('/deletePost', passport.authenticate('jwt', {session: false}) , async (req, res) => {
  try{
    await db.collections.posts.deleteOne({ id: mongo.Types.ObjectId(req.body.idPost) })
    for (const elem of req.body.idComment) {
      await db.collections.comments.deleteOne({ id: mongo.Types.ObjectId(elem) })
    }
    for (const elem of req.body.idLikes) {
      await db.collections.likes.deleteOne({ idLike: mongo.Types.ObjectId(elem) })
    }
    res.status(200).send(req.body)
  } catch (e) {
    console.log(e)
  }
})
app.post('/changePost', passport.authenticate('jwt', {session: false}) , async (req, res) => {
  try{
    await db.collections.posts.update({ id: mongo.Types.ObjectId(req.body.id) }, {$set:{info: req.body.newText}})
    res.status(200).send(req.body)
  } catch (e) {
    console.log(e)
  }
})


app.post('/follow', passport.authenticate('jwt', {session: false}),  async (req, res) => {
  try {
    let arr = []
    await db.collections.friends.find({ idWhom: req.body.idWho+"", idWho: req.body.idWhom+""}).forEach(el=>{
      arr.push(el)
    })
    if(req.body.idWho !== req.body.idWhom && arr.length == 0){
      let newFriend = new friend({
        idWho: req.body.idWho,
        idWhom: req.body.idWhom,
        status: false
      })
      newFriend.save(() => {
        console.log('Friend request.')
      })
      res.status(200).send(newFriend);
    }
  } catch (e) { 
    console.log(e) 
    res.status(200);
  }
})

app.post('/addLike', passport.authenticate('jwt', {session: false}),  async (req, res) => {
  try {
    let newLike = new Like({
      idUser: req.body.idUser,
      idLike: mongo.Types.ObjectId(),
      idPost: mongo.Types.ObjectId(req.body.idPost)
    })
    let arr = []
    await db.collections.likes.find({ idPost: newLike.idPost, idUser: newLike.idUser }).forEach(function (response) {
      arr.push(response)
    })
    if (arr.length === 0) {
      newLike.save(() => console.log('Like successfully saved.'))
    } else {
      db.collections.likes.deleteOne({ idPost: newLike.idPost, idUser: newLike.idUser })
      console.log('like deleted.')
    }
    res.status(200).send(newLike);
  } catch (e) { console.log(e) }
})

app.post('/addcomment', passport.authenticate('jwt', {session: false}), (req, res) => {
  try {
    let newComment = new Comment({
      id: mongo.Types.ObjectId(),
      idPost: req.body.idPost,
      idUser: req.body.idUser,
      name: req.body.name,
      timePost: req.body.timePost,
      info: req.body.info
    })
    newComment.save(() => { console.log('Comment successfully saved.') })
    res.status(200).send(newComment)
  } catch (e) { console.log(e + ' ошибка комментария') }
})

app.post('/uploadavatar', passport.authenticate('jwt', {session: false}) , async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1]
    token = jwt.decode(token)
    await db.collections.users.update({ email: token.email, id: token.id }, {$set:{photo: req.body}})
    res.status(200).send(req.body);
  } catch (e) {
    console.log(e)
  }
})
app.post('/uploadavatarMini', passport.authenticate('jwt', {session: false}) , async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1]
    token = jwt.decode(token)
    await db.collections.users.update({ email: token.email, id: token.id }, {$set:{photomini: req.body}})
    res.status(200).send(req.body);
  } catch (e) {
    console.log(e)
  }
})
app.post('/deletePhoto', passport.authenticate('jwt', {session: false}) , async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1]
    token = jwt.decode(token)
    await db.collections.users.update({ email: token.email, id: token.id }, {$set:{photo: ''}})
    res.status(200).send(token);
  } catch (e) {
    console.log(e)
  }
})


app.post('/agreeFriend', passport.authenticate('jwt', {session: false}) , async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1]
    token = jwt.decode(token)
    await db.collections.friends.update({ idWho: req.body.id+"" , idWhom: token.id+"" }, { $set: { status: true} })
    res.status(200).send(req.body);
  } catch (e) {
    console.log(e)
  }
})
app.post('/deleteFriend', passport.authenticate('jwt', {session: false}) , async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1]
    token = jwt.decode(token)
    await db.collections.friends.deleteOne({status: true , $or :  [ { idWhom: token.id+""} , { idWho: token.id+""} ] })
    res.status(200).send(req.body);
  } catch (e) {
    console.log(e)
  }
})
app.post('/rejectFriend', passport.authenticate('jwt', {session: false}) , async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1]
    token = jwt.decode(token)
    await db.collections.friends.deleteOne({ idWho: req.body.id+"" , idWhom: token.id+"" })
    res.status(200).send(req.body);
  } catch (e) {
    console.log(e)
  }
})

app.post('/api/friends/request' , passport.authenticate('jwt', {session: false}) ,async (req, res) => {
  try {
    let arr = []
    let result = []
    let token = req.headers.authorization.split(" ")[1]
    token = jwt.decode(token)
    await db.collections.friends.find({ idWhom: token.id+"", status: false }).forEach(el=>{
      arr.push(el)
    })
    for(let elem of arr) {
      let id = Number(elem.idWho)
      await db.collections.users.find({ id: id }).forEach(response => { 
        let requestUser = {
          _id : response._id,
          email : response.email,
          name : response.name ,
          id : response.id,
          lastname : response.lastname,
          photo : response.photo,
          followed: null
        }
        result.push(requestUser)
      })
    }
    res.status(200).send(result);
  } catch (e) {
    console.log(e)
  }
})
app.post('/api/friends' , async (req, res) => {
  try {
    let arr = []
    let result = []
    let token = req.headers.authorization.split(" ")[1]
    token = jwt.decode(token)
    await db.collections.friends.find({status: true , $or :  [ { idWhom: token.id+""} , { idWho: token.id+""} ] }).forEach(el=>{
      if(el.idWho == token.id){
        result.push(el.idWhom)
      }else if(el.idWhom == token.id){
        result.push(el.idWho)
      }
    })
    for(let elem of result) {
      let id = Number(elem)
      await db.collections.users.find({ id: id }).forEach(response => { 
        let requestUser = {
          _id : response._id,
          email : response.email,
          name : response.name ,
          id : response.id,
          lastname : response.lastname,
          photo : response.photo,
          followed: null
        }
        arr.push(requestUser)
      })
    }
    res.status(200).send(arr);
  } catch (e) {
    console.log(e)
  }
})

app.post('/api/users/', async (req, res) => {
  let arr = []
  let token = req.headers.authorization.split(" ")[1]
      token = jwt.decode(token)
  await db.collections.users.find({}).forEach( function (response) {
    let user = {
      _id : response._id,
      email : response.email,
      name : response.name ,
      id : response.id,
      lastname : response.lastname,
      photo : response.photo,
      followed: null
    }
    arr.push(user)
  })
  await db.collections.friends.find({status: true , $or :  [ { idWhom: token.id+""} , { idWho: token.id+""} ] }).forEach((res)=>{
    for (const item of arr) {
      if(res.idWho == item.id){
        item.followed = true
      }
    }
  })
  await db.collections.friends.find({idWho: token.id+"", status: false}).forEach((res)=>{
    for (const item of arr) {
      if(res.idWhom == item.id){
        item.request = true
      }
    }
  })
  arr = arr.filter(el=> el.id !== token.id)
  res.send(arr)
});

app.post('/api/getDataUser/', passport.authenticate('jwt', {session: false}) ,async (req, res) => {
  try {
      let token = req.headers.authorization.split(" ")[1]
      token = jwt.decode(token)
      let user = { id: !req.body.id ? token.id : Number(req.body.id) }
      let id = await db.collections.users.findOne(user)
      let resObj = {
          email: id.email,
          name: id.name,
          id: id.id,
          lastname: id.lastname,
          photo: id.photo,
          photomini: id.photomini,
          _id: id._id,
          myPage: token.id === user.id ? true : false
      }
      res.status(200).send(resObj)
  } catch (error) {
      res.status(401).send(error)
      console.log(error)
     
  }
})

app.get('/api/posts/', async (req, res) => {
  let idUser = req.query['id']
  idUser = Number(idUser)
  let arr = []
  await db.collections.posts.find({ whomIdUser: idUser }).forEach(function (response) {
    arr.push(response)
  })
  for(let item of arr){
    await db.collections.likes.find({ idPost: item.id + ''}).forEach(function (itemLike) {
      item.likeList.push(itemLike)
    })
  }
  for(let itemTwo of arr){
   await db.collections.comments.find({ idPost: itemTwo.id +'' }).forEach((el)=>{
        itemTwo.comment.push(el)
   })
  }
  res.send(arr)
});

app.get('/api/likes/', (req, res) => {
  let idUser = req.query['id']
  idUser = Number(idUser)
  db.collections.likes.find({ idPost: newLike.idPost, idUser: newLike.idUser }).toArray(function (err, response) {
    if (err) console.log(err)
    res.send(response)
  })
});

app.delete('/api/comments/delete',passport.authenticate('jwt', {session: false}), (req, res) => {
  res.setTimeout(0)
  let idComment = req.query['id']
  db.collections.comments.deleteOne({ id: mongo.Types.ObjectId(idComment) })
  res.sendStatus(200)
})





