const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const routes=require('./routes/authroute')
app.use(routes)
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/abc').then(()=>{
    console.log('db is connected')
})
.catch(err=>{
    console.log(err)
})
app.listen(3200,()=>{
    console.log('server is running.....!')
})