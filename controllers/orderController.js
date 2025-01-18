import Order from "../models/order.js";
import { isCustomer } from "./userController.js";
import Product  from "../models/product.js";

export async function createOrder(req,res){

    if(!isCustomer(req)){
        res.json({
            message : "Please login as customer"
        })
        return
    }

    //take last product id to create new id for new order

    try{
        const latestOrder = await Order.find().sort
        ({date : -1}).limit(1)

        let orderId

        if(latestOrder.length == 0){
            orderId = "CBC0001"
        }else{
            const currentOrderId = latestOrder[0].orderId
            const numberString = currentOrderId.replace("CBC","")
            const number = parseInt(numberString)
            const newNumber = (number + 1).toString().padStart(4,"0")
            orderId = "CBC" + newNumber
        }

        const newOrderData = req.body

        //need to create product details from product id
        const newProductArray = []

        for(let i=0;i<newOrderData.orderedItems.length;i++){

            const product = await Product.findOne({
                productID : newOrderData.orderedItems[i].productID
            })

            if(product == null){
                res.json({
                    message: "Product with id " + newOrderData.orderedItems[i].productID + " not found"
                })
                return
            }

            newProductArray[i] = {
                name : product.ProductName,
                price : product.price,
                quantity : newOrderData.orderedItems[i].quantity,
                Image: product.images.join(',')
            }
        }

        console.log(newProductArray)

        newOrderData.orderedItems = newProductArray


        newOrderData.orderId = orderId
        newOrderData.email = req.user.email

        const order = new Order(newOrderData)

        await order.save()

        res.json({
            message : "Order created"
        })

    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}