

const mongoose=require("mongoose")


const resourecesSchema=mongoose.Schema({
    resource_type:{
        type:String,
        enum:["API", "WIDGET" ,"MODULE"],
        default:"API"
    },
    resource_name:{
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


const resourcesModel=mongoose.model("resources",resourecesSchema)
module.exports=resourcesModel