const jwt = require('jsonwebtoken')
const Rep = require('../models/rep')
const session = require('express-session')
const auth = async (req,res,next)=>{
    try{
        // const token = req.body.token || req.header('Authorization').replace('Bearer ','')
        const token = req.session.token || req.header('Authorization').replace('Bearer ','')
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const rep = await Rep.findOne({_id:decode._id,'tokens.token':token})
        if (!rep) {
            throw new Error()
        }
        req.rep = rep

        req.token = token
        next()
    }catch(e){

        // console.log(token)
        res.status(401).send({error: 'please Authenticate!.'})
    }
}
module.exports=auth