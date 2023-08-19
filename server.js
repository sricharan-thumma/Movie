const exp=require('express')
const app=exp()
const mclient=require("mongodb").MongoClient;
require('dotenv').config();
// var cors = require('cors')
// app.use(cors())
const path=require('path')
app.use(exp.static(path.join(__dirname,'./build')))

const Userapp=require('./APIS/userapp');
const Productapp = require('./APIS/Product');
const DBurl=process.env.REACT_APP_DATABASE_CONNECTION_URL;
mclient.connect(DBurl)
.then((client)=>{
    let dbobj=client.db("vamshidb")
    let usercollection=dbobj.collection("usercollection")
    let productcollection=dbobj.collection("productcollection")
    //sharing collection objects to APIs
    app.set("usercollection",usercollection); 
    app.set("productcollection",productcollection);
    console.log("DB connection sucess")
})
.catch(err=>console.log("error in DB connection",err))
app.use('/user-api',Userapp)
app.use('/product-api',Productapp)
//const port=process.env.REACT_APP_PORT;
app.listen(4000,()=>console.log("server is ruuning on port 4000"))