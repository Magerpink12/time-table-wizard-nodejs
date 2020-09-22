const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcript = require('bcryptjs')
const Task = require('./task')

const repSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim:true,
    },
    phone:{
        type: String,
        unique: true,
        required:true,
        minlength:11
        
    },
    department:{
        type:String,
        trim:true,
        required:true
    },
    faculty:{
        type:String,
        trim:true,
        required:true
    },
    nick:{
        type:String,
        trim:true,
        required:true
    },
    password:{
        type:String,
        minlength:6
    },
    level:{
        type: Number,
        required:true,
        trim:true
    },
    status:{
        type: Boolean,
        default:false,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required: true
        }
    }]
},{
    timestamps:true
})

repSchema.virtual('mytasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'repFK'
})

repSchema.methods.generateAuthToken = async function(){
    const rep = this
    const token = jwt.sign({_id: rep._id.toString()}, process.env.JWT_SECRET)
    rep.tokens = await rep.tokens.concat({token})
    await rep.save()
    return token
}

repSchema.statics.findByCredentials = async function (phone,password){

    const rep = await Rep.findOne({phone})
    if (!rep) {
        throw new Error('Unable to Login')
    }

    const isValid = await bcript.compare(password,rep.password)
    if (!isValid) {
        throw new Error('Unable to Login')
    }
    return rep

}

repSchema.pre('save',async function(next) {
    const rep = this
    if (rep.isModified('password')) {
        rep.password = await bcript.hash(rep.password,8)
    }
    next()
})

repSchema.pre('remove', async function(next){
    const rep = this
    await Task.deleteMany({repFK:rep._id})
    next()
})

const Rep = mongoose.model('Rep',repSchema)

// const add = new Rep({
//     name: "isah",
//     phone: 12345678901,
//     department:"computer",
//     password:"414141",
//     level: 100,
// })
// add.save().then(()=>{
//     console.log(add)
// }).catch((error)=>{
//     console.log('error:', error)
// })

module.exports = Rep