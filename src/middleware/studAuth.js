const Rep = require('../models/rep')
const session = require('express-session')
const studAuth = async (req,res,next)=>{
    try {
         req.srep = req.session.studentRep
        //  console.log(req.srep)
         next()
    } catch (error) {
        console.log('hoho')
        res.status(401).send({error: 'No Time-Table Found'})
    }
}
module.exports = studAuth