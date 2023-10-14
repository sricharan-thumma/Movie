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
const Productapp = require('./APIS/productApi')

const Adminapp=require('./APIS/adminApi')

const DBurl="mongodb+srv://vamshi26:vamshi%4026@cluster0.ojkg9z7.mongodb.net/?retryWrites=true&w=majority";
mclient.connect(DBurl)
.then((client)=>{
    let dbobj=client.db("zebu")
    let usercollection=dbobj.collection("usercollection")
    let productcollection = dbobj.collection("productcollection")
	
	let admincollection = dbobj.collection("admincollection")
   
    //sharing collection objects to APIs
    app.set("usercollection",usercollection);
    app.set('productcollection', productcollection)
	
	app.set('admincollection', admincollection) 
    
    console.log("DB connection sucess")
})
.catch(err=>console.log("error in DB connection",err))
app.use('/user-api',Userapp)
app.use('/product-api', Productapp)

app.use('/admin-api', Adminapp)

//const port=process.env.REACT_APP_PORT;
app.listen(4000,()=>console.log("server is ruuning on port 4000"))