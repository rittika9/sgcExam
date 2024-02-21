
const express=require("express")
const userController=require("../Controller/userController")
const roleController=require("../Controller/roleController")

const route=express.Router()

route.post("/create_user",userController.userCreate )
route.get("/view_user",userController.view )
route.post("/update_user/:id",userController.updateuser )
route.get("/delete_user/:id",userController.deleteUser )
route.get("/login",userController.loginuser_8);
route.get("/view_user/:id",userController.view_userId);
route.get("/role_alluserId",userController.role_alluserId_2);


// role
route.post("/create_role",roleController.roleCreate )
route.post("/update_role/:id",roleController.updaterole )




module.exports=route

