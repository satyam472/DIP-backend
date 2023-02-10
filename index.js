const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require("cookie-parser");
const session = require('express-session');
const bodyParser = require('body-parser')
const fs = require('fs');
const MongoDBStore = require('connect-mongodb-session')(session);


app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

// db connection start---------------
const database = process.env.MONGOLAB_URI;

mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('db connect'))
.catch(err => console.log(err));
// db connection closed**************

// session part start----------------
// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
var store = new MongoDBStore({
    uri: database,
    collection: 'mySessions'
  });

app.use(session({
secret: 'This is a secret',
cookie: {
    maxAge: oneDay
},
store: store,
resave: true,
saveUninitialized: true
}));

// session part closed***************

app.use(express.urlencoded({ extended: false }));
app.use("/dashboard", require("./routes/ideaRoute"));
app.use("/user", require("./routes/userRoute"));
app.use("/comment",require("./routes/commentRoute"));

const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server started at http://localhost:" + PORT))