
const exp = require('express')
const expressAsyncHandler = require('express-async-handler')
const adminApp = exp.Router()

const bcryptjs = require('bcryptjs')


const jwt = require('jsonwebtoken')

var cloudinary=require("cloudinary").v2
const { CloudinaryStorage }=require('multer-storage-cloudinary')
const multer=require("multer");

cloudinary.config({
    cloud_name:"dpcmouuen",
    api_key:"288333834481731",
    api_secret:"h9JxTzgSs4gSR9tUzvDUiKt66B4",
    secure:true,
});

const cloudinaryStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async(req,res)=>{
        return{
            folder:"zebu",
            public_id:"img" + "-" + Date.now(),
        };
    },
});

var upload=multer({storage:cloudinaryStorage});


adminApp.use(exp.json())


adminApp.post('/login',expressAsyncHandler(async(request,response)=>{
  let admincollection=request.app.get("admincollection")

  let usercred=request.body
  
  let userofDB=await admincollection.findOne({username:usercred.username})
  if(userofDB==null){
      response.send({message:"Invalid username",status:200})
      
  }
  else{
      
      let status=await bcryptjs.compare(usercred.password,userofDB.password)
      
      if(status==false){
          response.send({message:"Invalid password"})
      }
      else{
          

          let token=jwt.sign({username:userofDB.username},"abcedef",{expiresIn:60})
      
          response.send({message:"login success",payload:token,userObj:userofDB})
      }
  }
}));



adminApp.post('/create-user',

upload.single("photo"),
expressAsyncHandler(async(request,response)=>{
    
    let newUser=JSON.parse(request.body.userObj);
    let admincollection=request.app.get("admincollection")
    let existinguser=await admincollection.findOne({username:newUser.username})
    if(existinguser!=null){
        response.send({message:"Username already exists,please choose another"})
    }
    else{
        let hashedpassword= await bcryptjs.hash(newUser.password,6)
        newUser.password=hashedpassword
        newUser.profileImg=request.file.path;
        await admincollection.insertOne(newUser);
        
        response.send({message:"admin created"})
    }
}));

module.exports = adminApp