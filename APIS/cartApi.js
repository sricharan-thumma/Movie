const exp = require('express')
const expressAsyncHandler = require('express-async-handler')
const cartApp = exp.Router()

//to extract body of request obj(is a middleware)
cartApp.use(exp.json())

//CART API routes
//get all cartProducts
cartApp.post('/getcart', expressAsyncHandler(async (request, response) => {
  //get cartcollectionObject
  let cartCollectionObject = request.app.get("cartCollectionObject")
  let cusername = request.body
  //read all carts
  let carts = await cartCollectionObject.find({ $and: [{ username: { $eq: cusername.username } }, { status: { $eq: "false" } }] }).toArray()
  //send response
  response.send({ message: 'All carts', payload: carts })
}))

cartApp.post('/getorder', expressAsyncHandler(async (request, response) => {
  //get cartcollectionObject
  let cartCollectionObject = request.app.get("cartCollectionObject")
  let cusername = request.body
  //read all carts
  let carts = await cartCollectionObject.find({ $and: [{ username: { $eq: cusername.username } }, { status: { $eq: "true" } }] }).toArray()
  //send response
  response.send({ message: 'All carts', payload: carts })
}))



//add to cart
cartApp.post('/add-to-cart', expressAsyncHandler(async (request, response) => {
  //get cartcollectionObject
  let cartCollectionObject = request.app.get("cartCollectionObject")
  let newcartObj = request.body
  newcartObj.status="false"
  //if (cartOfDB != null) {
  //insert new cart
  let insert=await cartCollectionObject.insertOne(newcartObj)
  if(insert)
  response.send({ message: 'Added to cart' })
  else
  response.send({message:"Can't insert"})
  /*}
  else {
    response.send({ message: 'Please login' })
  }*/
}))



cartApp.put('/increase-count', expressAsyncHandler(async (request, response) => {
  //get cartcollectionObject
  let cartCollectionObject = request.app.get("cartCollectionObject")
  let newcartObj = request.body
  //search for cart by cart name
  let cartOfDB = await cartCollectionObject.findOne({ productname: newcartObj.productname })
  if (cartOfDB != null) {
    let newCount = cartOfDB.count
    newCount++
    await cartCollectionObject.updateOne({ productName: newcartObj.productName }, { $set: { count: newCount } })
    response.send({ message: 'cart updated' })
  }
  else {
    response.send({ message: 'invalid operation' })
  }
}))



cartApp.put('/placeorder/:user', expressAsyncHandler(async (request, response) => {
  //get cartcollectionObject
  let cartCollectionObject = request.app.get("cartCollectionObject")
  
  let user = (request.params.user)
  
  let order=await cartCollectionObject.updateMany({ username: user }, { $set: { status: "true" } })
  if(order)
  response.send({ message: 'Order Placed' })
  else
  response.send({message:"Something went wrong"})
}))



cartApp.put('/decrease-count', expressAsyncHandler(async (request, response) => {
  //get cartcollectionObject
  let cartCollectionObject = request.app.get("cartCollectionObject")
  let newcartObj = request.body
  //search for cart by cart name
  let cartOfDB = await cartCollectionObject.findOne({ productname: newcartObj.productname })
  if (cartOfDB != null) {
    let newCount = cartOfDB.count
    newCount--
    await cartCollectionObject.updateOne({ productName: newcartObj.productName }, { $set: { count: newCount } })
    response.send({ message: 'cart updated' })
  }
  else {
    response.send({ message: 'invalid operation' })
  }
}))



//delete cart by id
cartApp.delete('/remove-from-cart/:id', expressAsyncHandler(async (request, response) => {
  //get cart collection obj
  let cartCollectionObject = request.app.get("cartCollectionObject")

  //get cart id from url params
  let prodpid = (request.params.id)
  console.log(prodpid)
  //get cart by id 
  let cart = await cartCollectionObject.findOne({ pid: prodpid })

  if (cart == null) {
    response.send({ message: 'cart not existed' })
  }
  else {
    let cart = await cartCollectionObject.deleteOne({ pid: prodpid })
    response.send({ message: 'cart deleted' })
  }
}))

//export cartApp
module.exports = cartApp