const express=require('express');
const ConnectDb=require('./Config/db')
require('dotenv').config();
const path=require("path")
const bodyParser=require('body-parser');
const mongoose =  require('mongoose')






const app=express();
ConnectDb()



//Body Parser for Collection of Data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))



// // API Port
const apiRoute=require("./Router/route");
app.use(apiRoute);





const port=process.env.PORT||9701
const dbDriver=process.env.MONGO_URL;
mongoose.connect(dbDriver,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    app.listen(port,()=>{
        console.log('db is connected');
        console.log(`server is running at http://localhost:${port}`);
    })
})
.catch(()=>{
    console.log('error');
})