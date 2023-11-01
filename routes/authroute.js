const express = require('express');
const router = express.Router()
const userSchema = require('../models/authModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretekey = "vghbnbjgyrgyfkjj@vghd5364478bdmnfkfj@#$%^"
const verifyToken = require('../verifyToken')
router.get('/',(req,res)=>{
    res.send("Hello")
})
router.post('/login',async(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    await userSchema.findOne({email : email})
    .then(user => {
        if(user && user._id){
            bcrypt.compare(password , user.password , function(err,response){
                if(!err){
                    if(response){
                        const token = jwt.sign({_id : user._id , email :user.email},secretekey,{expiresIn:'1h'})
                        res.json({status : 'ok' , data : {token , response , user}})
                    }
                    else if(!response){
                        res.json({status:'ok',data:{user , response , message : 'incorrect password or email'}})
                    }
                }
            })
        }
    })
    .catch(err=>{
        console.log('somthing wrong....!')
    })
})

router.post('/register',async(req,res)=>{
    console.log(req.body)
    const data = new userSchema(req.body);
    const salt = await bcrypt.genSalt(10)
   await bcrypt.hash(req.body.password,salt).then(hashedpassword=>{
    if(hashedpassword){
        console.log("hashed",hashedpassword)
        data.password = hashedpassword
    }
   })   
await userSchema.create(data).then(Stored=>{
    if(Stored && Stored._id){
        console.log(Stored)
        res.json({status : 'ok' , data : Stored})
    }
})
.catch(err=>{
    if(err){
        res.json({status : 'err',data:err})
    }
})
})

router.get('/dashboard',verifyToken,async(req,res)=>{
    if(req && req.decodedToken){
        res.json({status : 'ok' , data:'ok'})
    }
    else{
        res.json({status : 'err' , data:'err'})
    }
})
module.exports= router;