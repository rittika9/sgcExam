const roleModel=require("../Model/roleModel")



const roleCreate=async(req,res)=>{
    try{

        const{title,description}=req.body
        if(!(title && description)){
           return res.status(400).json({
            status:400,
            message:"All input is required"
        
            });
        }
        
       
        
        
        
        
                const roledetails= new roleModel({
                    title:req.body.title,
                    description:req.body.description
                })
             const result=await roledetails.save()
             return res.status(201).json({
                success:true,
                message:"data fetch successfully",
                data:result
            })
            
            
            
                }catch(error){
                    return res.status(404).json({success: false , message:"error"})
                }
}


const updaterole=async(req,res)=>{
    try{
        if (!req.body) {
            return res.status(400).json({
              message: "Data to update can not be empty!"
            });
          }
          const id = req.params.id;
         const result=await roleModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
         if(!result){
            res.status(404).json({
                message: `Cannot update data with id=${id}. Maybe data was not found!`
              });
         }else{
            return res.status(200).json({
                success:true,
                message:"Data update Successfully",
               })

         }

    }catch(err){
        return res.status(404).json({
            success:false,
            error:err.message
        })

    }

}

module.exports={
    roleCreate,
    updaterole,

    
}