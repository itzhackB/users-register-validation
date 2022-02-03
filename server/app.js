const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoute');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
require('dotenv').config()


const app = express();
const DB_URI = 'mongodb+srv://itzhack:nabava90@cluster0.7dufu.mongodb.net/Users?retryWrites=true&w=majority'

app.use(cors());
app.use(bodyParser.json());


app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
  }


mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(process.env.PORT || 8080, () => {
        console.log('DB and Server in the air!');
    }))
    .catch((err) => console.log(err));

app.use('/user', userRouter);