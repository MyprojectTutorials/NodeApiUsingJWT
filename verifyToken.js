const jwt = require('jsonwebtoken')

const secretekey = "vghbnbjgyrgyfkjj@vghd5364478bdmnfkfj@#$%^"
const verifyToken = (req,res,next)=>{
    const token = req.headers['authorization']
    console.log(token)
    if(!token){
        res.status(403).send('token is required...!')
    }
    else{
        try{
        const decodedToken= jwt.verify(token,secretekey)
        req.decodedToken=decodedToken
        }
        catch(err){
            res.json({status :'error' , data : 'something went wrong'})
        }
    }
    return next()
}
module.exports = verifyToken