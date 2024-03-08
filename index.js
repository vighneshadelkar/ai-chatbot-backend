const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const PORT=process.env.PORT || 4000;
const Chatbot=require('./routes/chatbot');
const bodyParser = require("body-parser");
const DATABASE_URL=process.env.DATABASE_URL;

// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use('/chatbot',Chatbot);

mongoose.connect(DATABASE_URL, { useNewUrlParser: true });

const db=mongoose.connection;

db.on("close",(error)=>{
    console.log(error);
})

db.once('open',()=>{
    console.log("db working");
})

app.get('/', (req, res) => {
    res.send('hello');
})


app.listen(PORT, () => {
    console.log('database at port: ', PORT);
})