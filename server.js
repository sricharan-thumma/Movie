const exp=require('express')
const app=exp()
const mclient=require("mongodb").MongoClient;
require('dotenv').config();
 var cors = require('cors')
app.use(cors())
//const path=require('path')
// app.use(exp.static(path.join(__dirname,'./build')))
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   });
  

const Userapp=require('./APIS/userapp');

const DBurl=process.env.REACT_APP_DATABASE_CONNECTION_URL;
mclient.connect(DBurl)
.then((client)=>{
    let dbobj=client.db("zebu")
    let usercollection=dbobj.collection("usercollection")
   
    //sharing collection objects to APIs
    app.set("usercollection",usercollection); 
    
    console.log("DB connection sucess")
})
.catch(err=>console.log("error in DB connection",err))
app.use('/user-api',Userapp)

//const port=process.env.REACT_APP_PORT;
app.listen(4000,()=>console.log("server is ruuning on port 4000"))