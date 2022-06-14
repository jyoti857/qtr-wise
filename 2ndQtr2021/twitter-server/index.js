

const express = require('express');
const app = express();
const cookieSession = require('cookie-session');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/twitter-clone';


// app.use(express.bodyParser());
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.use(cors());



async function mongoConnect(){
  try{
    await mongoose.connect(url, {useNewUrlParser: true,  useUnifiedTopology: true});
    console.log("mongodb connected!!")
  }catch(err){console.log("error in connection ---> ", err)}
}
mongoConnect();

app.get('/', (req, res) => res.json({message: "sdl;sd"}))
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
// handle routes 
console.log("type of auth ---> ", typeof auth)
require('./routes/auth')(app);
// app.use('/post', post)
const port = process.env.PORT || 5000;

app.listen(port, () => console.log('app is listening on port ', port ))