const express = require('express')
require('./db/mongoose')
const session = require('express-session')
const repRouter = require('./routers/rep')
const taskRouter = require('./routers/task')
const { static, response } = require('express')
const hbs = require('hbs')
const request = require('request')
const { json } = require('body-parser')
const bodyParser = require('body-parser')


const app=express()
const port = process.env.PORT
const {
    SESS_NAME = 'sid',
    MODE_ENV = 'development',
    SESS_LIFETIME = 24* 1000 * 60 * 60 * 2,
    SESS_SECRET = 'magerpink12',
    
} = process.env
const IN_PROD = MODE_ENV ==='production'

app.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized:false,
    secret:SESS_SECRET,
    cookie:{
        maxAge: SESS_LIFETIME,
        sameSite:true
        // expires:true
        // secure = IN_PROD
    }
}))



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))



 app.use(express.json())
 app.use(repRouter)
 app.use(taskRouter)
 app.use(express.static(__dirname+'/views'))


 app.set('view engine','hbs')
 app.set('views',__dirname+'/views/templetes')
 hbs.registerPartials(__dirname+ '/views/partials')

//********TASKS**********//


app.get('/login',(req,res)=>{
    if (req.session.token) {
        return res.redirect('/dashboard')
    }
    res.render('login',{
        
    })
})

 
app.get('/',(req,res)=>{
    res.render('index',{

    })
})


app.get('/dashboard',(req,res)=>{
    if (!req.session.token) {
        return res.redirect('/')
    }
    res.render('dashboard',{
        
    })
})

app.get('/update',(req,res)=>{
    res.render('update',{
        
    })
})

app.listen(port,()=>{
    console.log('Server is up on port ',port)
})
