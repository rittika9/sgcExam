
const userModel=require("../Model/userModel")
const Jwt=require("jsonwebtoken");



const userCreate=async(req,res)=>{
    try{

        const{name,email,phone}=req.body
        if(!(name && email && phone)){
           return res.status(400).json({
            status:400,
            message:"All input is required"
        
            });
        }
        
        const checkDuplicate = await userModel.findOne({ email:email });
             if(checkDuplicate){
                return res.status(400).json({
                    status:400,
                    message:"Email Id Is Already Exist"
                });
        }
        
        
        
        
                const userdetails= new userModel({
                    name:req.body.name,
                    email:req.body.email,
                    phone:req.body.phone,
                    role:req.body.role
                })
             const result=await userdetails.save()
             return res.status(201).json({
                success:true,
                message:"data fetch successfully",
                data:result
            })
            
            
            
                }catch(error){
                    return res.status(404).json({success: false , message:"error"})
                }
}



const updateuser=async(req,res)=>{
    try{
        if (!req.body) {
            return res.status(400).json({
              message: "Data to update can not be empty!"
            });
          }
          const id = req.params.id;
         const result=await userModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

const deleteUser=(req,res)=>{
    const id=req.params.id
    userModel.deleteOne({_id:id}).then(data=>{
        return res.status(200).json({
            success:true,
            message:"Data delete Successfully",
           })
    })
    

}




const loginuser_8=async(req,res)=>{
    try {
        const data = await userModel.findOne({
            email: req.body.email
        })
        if(!req.body.email){
            return res.status(400).json({
                success:false,
                message:"all fields are mandatory!",
                
            })
        }
        else{
            if (data) {
                        const token = Jwt.sign({
                            _id: data._id,
                            name: data.name,
                            email: data.email,
                            phone: data.phone,

                        
                           }, process.env.SECRET_USER, { expiresIn: "1d" });
                           console.log(data);
                           return res.status(200).json({
                               success:true,
                               message:"Candidate Login successfully!",
                               data,
                               token
                           })
                       
                    } 
                    else{
                        return res.status(400).json({
                            success:false,
                            message:"user doesnt exist!"
                        })
                    }
                } 
            
    
            
           
            }    

    catch (error) {
        console.log(error);
    }
}







const view=async(req,res)=>{
    try{

const userData=await userModel.find()
return res.status(200).json({
    success:true,
    message:"data fetch successfully",
    data:userData
})



    }catch(error){
        return res.status(404).json({success: false , message:"error"})
    }
}



const view_userId =async(req,res)=>{
    try{
      const id =req.params.id  
      const result=await userModel.findById(id)
      return res.status(200).json({
        success:true,
        message:"data fetch successfully with id",
        data:result
    })
          

    }
    catch(error){
        return res.status(404).json({success: false , message:"error"})
    }
        
}

const role_alluserId_2=(req,res)=>{
    userModel.aggregate([
        {
            $sort: {
                _id: -1
            }
        },
        
        {
            $lookup:{
                from: "roles",
                localField: "role",
                foreignField: "_id",
                as: "role_details",
            },
            
        }

    ]).then((result)=>{
        res.send({
            status:true,
            data:result,
            msg:"All data fatch"
        })
    }).catch((err)=>{
        res.send({
            status:false,
            msg:"All Data not fatch",
            err:err
        })
    })
}


module.exports={
    userCreate,
    updateuser,
    deleteUser,
    view,
    loginuser_8,
    view_userId,
    role_alluserId_2
}