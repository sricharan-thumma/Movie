const exp=require('express')
const expressAsyncHandler = require('express-async-handler')
const Userapp=exp.Router()
const expresAsyncHandler=require('express-async-handler')
const bcryptjs=require('bcryptjs')
//jsonwebtoken
const jwt=require('jsonwebtoken')
Userapp.use(exp.json())




Userapp.get('/getusers',expresAsyncHandler(async(request,response)=>{
    let usercollection=request.app.get("usercollection")
    let users=await usercollection.find().toArray()
    response.send({message:'all users',payload:users})
}));
Userapp.post('/login',expresAsyncHandler(async(request,response)=>{
    let usercollection=request.app.get("usercollection")
    //user credintials fron client
    let usercred=request.body
    //find the user in DB
    let userofDB=await usercollection.findOne({username:usercred.username})
    if(userofDB==null){
        response.send({message:"Invalid username"})
    }
    else{
        //comparing given password and actual password
        let status=await bcryptjs.compare(usercred.password,userofDB.password)
        //if pass not matched
        if(status==false){
            response.send({message:"Invalid password"})
        }
        else{
            //create token

            let token=jwt.sign({username:userofDB.username},process.env.REACT_APP_SECRET_KEY,{expiresIn:60})
            //send token
            response.send({message:"login success",payload:token,userObj:userofDB})
        }
    }
}));
Userapp.post('/create-user',expressAsyncHandler(async(request,response)=>{
    let newUser=request.body
    let usercollection=request.app.get("usercollection")
    let existinguser=await usercollection.findOne({username:newUser.username})
    if(existinguser!=null){
        response.send({message:"Username already exists,please choose another"})
    }
    else{
        let hashedpassword= await bcryptjs.hash(newUser.password,6)
        newUser.password=hashedpassword
        await usercollection.insertOne(newUser);
        response.send({message:"new user created"})
    }
}));

module.exports=Userapp; 