const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true     
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:'https://icons.iconarchive.com/icons/graphicloads/flat-finance/256/person-icon.png'
    },
        
},
{timestamps:true});


const users=mongoose.model('users',userSchema)
module.exports=users