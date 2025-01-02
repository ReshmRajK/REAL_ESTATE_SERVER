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
        default:'https://www.iconpacks.net/icons/1/free-user-icon-295-thumb.png'
        
    },
        
},
{timestamps:true});


const users=mongoose.model('users',userSchema)
module.exports=users