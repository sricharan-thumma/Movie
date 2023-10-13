
const exp = require('express')
const productApp = exp.Router()

const expressAsyncHandler = require('express-async-handler')
const { v4: uuidv4 } = require('uuid');
const unique=uuidv4().slice(0,8);




//to extract body of request obj(is a middleware)
productApp.use(exp.json())

 
productApp.get('/getproducts', expressAsyncHandler(async (request, response) => {
    
    const { category } = request.query;
    let productCollection = request.app.get("productcollection")
    
    let filteredProducts = await productCollection.find().toArray()
    if (category) {
        
        filteredProducts = filteredProducts.filter((product) => product.category === category);
      }

    response.send({ message: 'All products', payload: filteredProducts })
}))




productApp.get('/getusers/:id',expressAsyncHandler(async(request,response)=>{
    let pid=request.params.id;
    let productcollection=request.app.get("productcollection");
    let product=await productcollection.findOne({productname:pid})
    if(product==null)
    {
        response.send('product not existed')
    }
    else{
        response.send({message:'product found',payload:product})
    }
}));

productApp.post('/create-product', expressAsyncHandler(async (request, response) => {
    
    let productCollectionObject = request.app.get("productcollection")
    let newproduct = request.body

    newproduct.pid=unique;
    console.log(newproduct);


    await productCollectionObject.insertOne(newproduct)
    
    response.send({ message: 'Product added' })
}))


productApp.put('/update-product', expressAsyncHandler(async (request, response) => {
    
    let productCollectionObject = request.app.get("productCollectionObject")
    let modifiedProduct = request.body
    
    await productCollectionObject.updateOne({ productName: modifiedProduct.productName }, { $set: { ...modifiedProduct } })
    
    response.send({ message: 'product modied' })
}))



//delete product by id
productApp.delete('/remove-product/:id', expressAsyncHandler(async (request, response) => {
    
    let productCollection = request.app.get("productcollection")

    
    let prodpid = (request.params.id)
    console.log(prodpid)
    
    let product = await productCollection.findOne({ pid: prodpid })

    if (product == null) {
        response.send({ message: 'product not existed' })
    }
    else {
        let product = await productCollection.deleteOne({ pid: prodpid })
        response.send({ message: 'product deleted' })
    }
}))



module.exports = productApp