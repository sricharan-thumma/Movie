const exp=require('express')
const expressAsyncHandler = require('express-async-handler')
const Userapp=exp.Router()
const bcryptjs=require('bcryptjs')
//jsonwebtoken
const jwt=require('jsonwebtoken')

require("dotenv").config()

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

Userapp.use(exp.json())




Userapp.get('/getusers',expressAsyncHandler(async(request,response)=>{
    let usercollection=request.app.get("usercollection")
    
    let users=await usercollection.find().toArray()
    response.send({message:'all users',payload:users})
}));
Userapp.get('/getusers/:id',expressAsyncHandler(async(request,response)=>{
    let pid=request.params.id;
    let usercollection=request.app.get("usercollection");
    let user=await usercollection.findOne({username:pid})
    if(user==null)
    {
        response.send('user not existed')
    }
    else{
        response.send({message:'user found',payload:user})
    }
}));

Userapp.post('/login',expressAsyncHandler(async(request,response)=>{
    let usercollection=request.app.get("usercollection")
    
    let usercred=request.body
    //find the user in DB
    let userofDB=await usercollection.findOne({username:usercred.username})
    if(userofDB==null){
        response.send({message:"Invalid username",status:200})
        //alert("invalid details")
    }
    else{
        
        let status=await bcryptjs.compare(usercred.password,userofDB.password)
        //if pass not matched
        if(status==false){
            response.send({message:"Invalid password"})
        }
        else{`  `
            

            let token=jwt.sign({username:userofDB.username},"abcedef",{expiresIn:60})
            //send token
            response.send({message:"login success",payload:token,userObj:userofDB})
        }
    }
}));
Userapp.post('/create-user',

upload.single("photo"),
expressAsyncHandler(async(request,response)=>{
    //console.log(request.file.path);
    let newUser=JSON.parse(request.body.userObj);
    let usercollection=request.app.get("usercollection")
    let existinguser=await usercollection.findOne({username:newUser.username})
    if(existinguser!=null){
        response.send({message:"Username already exists,please choose another"})
    }
    else{
        let hashedpassword= await bcryptjs.hash(newUser.password,6)
        newUser.password=hashedpassword
        newUser.profileImg=request.file.path;
        await usercollection.insertOne(newUser);
        
        response.send({message:"new user created"})
    }
}));


Userapp.post('/update-user', upload.single("photo"), expressAsyncHandler(async (request, response) => {
    const usercollection = request.app.get("usercollection");
    const { username, email, city } = JSON.parse(request.body.userObj);
    
    try {
      const updatedUser = {
        email,
        city,
        profileImg: request.file ? request.file.path : null,
      };

      await usercollection.updateOne(
        { username },
        { $set: updatedUser }
      );
      
      response.send({ message: "User details updated successfully" });
    } catch (error) {
      response.status(500).send({ message: "An error occurred while updating user details" });
    }
}));

Userapp.post('/add-to-cart', expressAsyncHandler(async (request, response) => {
    try {
        const usercollection = request.app.get("usercollection");
       const productcollection=request.app.get("productcollection")
        const { productobj, userobj } = request.body;

        
        const product = await productcollection.findOne({ _id: productobj._id });
        const user = await usercollection.findOne({ username: userobj.username });

        if (!user) {
            return response.status(404).send({ message: "Sender or receiver not found" });
        }

        
        if (!user.Cart) {
            user.Cart = [];
        }
        
        const productIdsInCart = user.Cart.map(item => item._id);
        if (productIdsInCart.includes(productobj._id)) {
            return response.status(400).send({ message: "product already exists in the cart" });
        }

        
        user.Cart.push(productobj);
        

       
        await usercollection.updateOne({ username: userobj.username }, { $set: { Cart: user.Cart } });

        return response.send({ message: "Added successfully" });
    } catch (error) {
        console.error(error);
        return response.status(500).send({ message: "Internal server error" });
    }
}));

Userapp.get('/get-cart', expressAsyncHandler(async (request, response) => {
    try {
      const usercollection = request.app.get('usercollection');
      const {username} = request.body; 
  
      
      const user = await usercollection.findOne({ username });
      
      if (!user || !user.Cart) {
        return response.status(404).send({ message: 'Cart not found' });
      }
  
      return response.send({ cart: user.Cart });
    } catch (error) {
      console.error(error);
      return response.status(500).send({ message: 'Internal server error' });
    }
  }));

  Userapp.post('/remove-from-cart', expressAsyncHandler(async (request, response) => {
    try {
        const usercollection = request.app.get("usercollection");
        const { productobj,username } = request.body;

    
        const user = await usercollection.findOne({ username: username });

        if (!user) {
            return response.status(404).send({ message: "user not found" });
        }

    
        const itemIndex = user.Cart.findIndex(item => item._id === productobj._id);
        if (itemIndex === -1) {
            return response.status(400).send({ message: "item not found" });
        }

        
        user.Cart.splice(itemIndex, 1);

    
        await usercollection.updateOne({ username: username }, { $set: { Cart: user.Cart } });

        return response.send({ message: "Removed successfully",payload:user.Cart});
    } catch (error) {
        console.error(error);
        return response.status(500).send({ message: "Internal server error" });
    }
}));

Userapp.post('/buy-now', expressAsyncHandler(async (request, response) => {
    try {
      const usercollection = request.app.get("usercollection");
      
      const { cartItems, username } = request.body;
  
      const user = await usercollection.findOne({ username: username });
  
      if (!user) {
        return response.status(404).send({ message: "User not found" });
      }
  
      
      if (!user.Orders) {
        user.Orders = [];
      }
      
    
      user.Orders.push(...cartItems);
  
      
      user.cartItems = [];
  
      
      await usercollection.updateOne(
        { username: username },
        { $set: { Orders: user.Orders, Cart: user.cartItems } }
      );
  
      return response.send({ message: "Order accepted successfully", payload: user.Cart });
    } catch (error) {
      console.error(error);
      return response.status(500).send({ message: "Internal server error" });
    }
  }));


  Userapp.post('/update-quantity-in-cart', expressAsyncHandler(async (request, response) => {
    
    const { productobj, username, quantity } = request.body;
  

    const usercollection=request.app.get("usercollection")
    const user = await usercollection.findOne({ username });
  
    if (!user) {
      return response.status(400).send({ message: 'User not found' });
    }
  
    
    const cartItem = user.Cart.find(item => item._id.toString() === productobj._id.toString());
  
    if (!cartItem) {
      return response.status(400).send({ message: 'Item not found in the cart' });
    }
  

    cartItem.quantity = quantity;
  
    
    response.send({ message: 'Quantity updated successfully', payload: user.Cart });
  }));
  

  
  

module.exports=Userapp; 