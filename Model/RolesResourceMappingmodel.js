

const mongoose=require("mongoose")


const RolesResourceMappingSchema=mongoose.Schema({
   
    role:{
        type:mongoose.Types.ObjectId,
        ref:"role"
    },

    resource  :{
        type:mongoose.Types.ObjectId,
        ref:"resources"   
     },
    
     permission :{
        type:String,
        enum:["READ", "EDIT"],
        default:"READ"
        
    }

},
{
timestamps:true
})


const RolesResourceMappingModel=mongoose.model("RolesResourceMapping",RolesResourceMappingSchema)
module.exports=RolesResourceMappingModel