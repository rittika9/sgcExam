

const mongoose=require("mongoose")
const schema=mongoose.Schema


const useSchema=new schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    role:{
        type:mongoose.Types.ObjectId,
        ref:"role"
    },

    phone:{
        type:Number
    },

    is_active:{
        type:Boolean,
        default:true
    }

},
{
timestamps:true
})



const userModel=mongoose.model("user",useSchema)
module.exports=userModel