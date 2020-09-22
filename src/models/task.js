const mongoose = require('mongoose')

// mongoose.connect('mongodb://127.0.0.1:27017/time_table',{
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
//     useCreateIndex:true

// })
const taskSchema = new mongoose.Schema({
    course:{
        type:String,
        required:true,
        trim:true,
        uppercase:true
    },
    title:{
        type:String,
        trim:true
    },
    instructor:{
        type: String,
        trim: true,
        default:"Course Lecturer"
    },
    venue:{
        type:String,
        trim:true
    },
    repFK:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Rep",
    },
    lecTime:{
        type:String
    },
    lecDay:{
        type:String
    }
},{
    timestamps:true
})

const Task = mongoose.model('Task',taskSchema)

module.exports = Task