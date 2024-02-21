

const mongoose=require("mongoose")


const roleSchema=mongoose.Schema({
    title:{
        type:String,
    },
    description :{
        type:String,
    },
    

},
{
timestamps:true
})


const roleModel=mongoose.model("role",roleSchema)
module.exports=roleModel