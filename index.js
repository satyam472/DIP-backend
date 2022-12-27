const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors())

const mongoose = require('mongoose');
const dotenv = require("dotenv");


dotenv.config();
const database = process.env.MONGOLAB_URI;

mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('db connect'))
.catch(err => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use("/", require("./routes/ideaRoute"));


const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server started at port: " + PORT))