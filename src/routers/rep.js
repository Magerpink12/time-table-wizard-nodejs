const express = require('express')
const Rep = require('../models/rep')
const auth = require('../middleware/auth')
const session = require('express-session')
const bcript = require('bcryptjs')


const router = new express.Router()

var sess
//register as a Rep
router.post('/reps/reg',async(req,res)=>{
    try {
        const existed = await Rep.findOne({department:req.body.department, level:req.body.level})
        if(existed){
            return res.status(400).send({error: `${req.body.department} Level ${req.body.level} Class Rep Has Already Registered`})
        }
        const rep = new Rep(req.body)
        const token = await rep.generateAuthToken()
        await rep.save()
        req.session.token = token
        res.status(201).send({rep,token})
        
    } catch (e) {
        res.status(400).send({error: `${req.body.phone} has registered`})
    }
   
})

//delete user account
router.delete('/reps/me', auth,async(req,res)=>{
    try {
        await req.rep.remove()
        res.send(req.rep)
    } catch (error) {
        res.status(404).send({error: 'No user found'})
    }
})


// user profile
router.get('/reps',auth,async(req,res)=>{
   try {
    //    const rep = await Rep.find({})
    const rep = req.rep
       res.send(rep)
   } catch (error) {
       res.status(500).send()
   }
})

// students Route
router.post('/reps/student',async(req,res)=>{
    try {
        const rep = await Rep.findOne({department: req.body.department, level: req.body.level})
        if(!rep){
        return res.status(400).send({error: "Your class rep hasn't registered yet!"})
        }
        req.session.studentRep = rep 
        res.send({
            name: rep.name,
            phone:rep.phone,
            level: rep.level,
            faculty: rep.faculty,
            department: rep.department
        })
    } catch (error) {
        res.status(500).send(error)
    }
 })

// edit user account
router.patch('/reps/me',auth,async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowUpdate = ['name','password','level','phone','department']
    const isValid = updates.every((update)=>allowUpdate.includes(update))

    if (!isValid) {
        return res.status(400).send({error: 'invalid update'})
    }
    if (req.body.phone) {
        const existed = await Rep.findOne({phone:req.body.phone})
        if(existed){
            return res.status(400).send({error: `${req.body.phone} Has Already Registered`})
        }

    }
    if (req.body.level) {
        existed = await Rep.findOne({department:req.rep.department, level:req.body.level})
        if(existed){
            return res.status(400).send({error: `${req.rep.department} Level ${req.rep.level} Class Rep Has Already Registered`})
        }
    }
    
       
   try {
       updates.forEach((update)=>req.rep[update]=req.body[update])
       await req.rep.save()
       res.send(req.rep)
   } catch (e) {
       res.status(500).send()
   }
})

// password recovery
router.patch('/reps/pass_rec',async(req,res)=>{
    try {
        const rep = await Rep.findOne({phone: req.body.phone, nick: req.body.nick})
        if (!rep) {
            // throw new Error({error: 'errrorororor'})
            return res.status(400).send({error:'User Not Found'})
        }
        rep.password = req.body.password
        // rep.password = await bcript.hash(req.body.password,8)
        rep.save()
        res.status(200).send({success: 'Password Changed Successfully'})
    } catch (error) {
        res.status(500).send(error)
    }
})

// user login
router.post('/reps/login', async(req,res)=>{
    try {
        const rep = await Rep.findByCredentials(req.body.phone, req.body.password)
        const token = await rep.generateAuthToken()
        req.session.token = token
        req.session.studentRep = rep
        // console.log(req.session.studentRep)
        res.send({rep,token})
    } catch (e) {
        // console.log(e)
        res.status(404).send({error: 'Unable to login'})
    }
   
})

// user logout
router.get('/reps/logout',auth,async(req,res)=>{
   try{
    req.session.destroy()
    req.rep.tokens = req.rep.tokens.filter((token)=>{
        token.token !== req.token
    })
    await req.rep.save()
    res.send()
    }catch(e){
        res.status(500).send(e)
    }
})



router.post('/reps/logoutAll',auth, async(req,res)=>{
    try {
        req.rep.tokens = []
        await req.rep.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// router.get('/*',(req,res)=>{
//     res.status(404).send('<h1>404</h1>')
// })
module.exports = router