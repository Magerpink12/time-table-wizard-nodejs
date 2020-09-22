const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const Rep = require('../models/rep')
const studAuth = require('../middleware/studAuth')

const router = new express.Router()

// add task
router.post('/tasks/add',auth,async(req,res)=>{
    try {
            await req.rep.populate('mytasks').execPopulate()
            const tasksArray = req.rep.mytasks
            const collide = tasksArray.find((x)=>{
               return x.lecTime.split(':')[0] === req.body.lecTime.split(':')[0] && x.lecDay === req.body.lecDay
            })
            // console.log(collide)
           if (!collide) {

            const task =await new Task({
                ...req.body,
                repFK: req.rep._id
            })
            await task.save()
            res.send(task)

             
           }else{
            return res.status(400).send({error:'lectures clash'})
           }
        
        
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/task/:id', auth, async(req,res)=>{
    try{
        var task = await Task.findById({_id: req.params.id})
        res.send(task).status(200)
    }catch(error){
        res.send(error).status(500)
    }
})

// fetch tasks
router.get('/tasks',auth,async(req,res)=>{
    try {
        await req.rep.populate('mytasks').execPopulate()
        res.send(req.rep.mytasks)
    } catch (error) {
        res.status(500).send(error)
    }
   
})

// add task
router.delete('/tasks/:id',auth,async(req,res)=>{
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, repFK:req.rep._id})
        if (!task) {
            return res.status(404).send({error: 'no Task found'})
        }
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

// Student task
router.get('/tasks/student',studAuth,async(req,res)=>{
    try {
        const tasks = await Task.find({repFK:req.srep._id})
        res.send(tasks)
    } catch (error) {
        console.log(req.srep)
        res.status(500).send(error)
    }
})
// students task by id
router.get('/task/student/:id',studAuth, async(req,res)=>{
    try{
        var task = await Task.findById({_id: req.params.id})
        res.send(task).status(200)
    }catch(error){
        res.send(error).status(500)
    }
})
module.exports = router