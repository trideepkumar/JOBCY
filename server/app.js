const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const user_router = require('./routes/user_route')
const organisation_router = require('./routes/organisation_router')
const cookieParser = require('cookie-parser');


require('dotenv').config()
const app = express()



app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
const cors = require('cors');






app.use(express.json())
app.use(cors())


app.use('/', user_router)
app.use('/organisation',organisation_router)


mongoose.connect(process.env.MONGODB_URL).then(()=>{
    app.listen(3000)
    console.log('mongoose connected succesfully!')
}).catch((err)=>{
   console.log(err)
})
