import Product  from "../models/product.js";
import { isAdmin } from "./userController.js";


//get product using normal function and "then"

// export function getProduct(req,res){

//   Product.find().then(

//     (productList)=>{
//       res.status(200).json({
//         list : productList
//       }) 
//     }
//   ).catch(
//     (err)=>{
//       res.json({
//         message : "Error"
//       })
//     }
//   )
// }

//get product using async await function


// export async function getProduct(req,res){

//   try{
//     const productList = await Product.find()

//     res.json({
//       list : productList
//     })
//   }catch(e){
//     res.json({
//       message : "Error"
//     })
//   }
// }

export function getProduct(req, res) {
  Product.find({}).then((products) => {
    res.json(products);
  });
}

export function createProduct(req,res){



  if(!isAdmin(req)){

    res.json({
      message : "Please login as administrator"
    })
    return
  }

  const newProductData = req.body;

  // Log the product details to the console
  console.log("Request Product Details:", newProductData);

  const product = new Product(newProductData);

  product.save().then(()=>{
    res.json({
      message: "Product created"
    })
  }).catch((error)=>{
    res.status(403).json({
      message: error
    })
  })
}

export function deleteProduct(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "Please login as administrator",
    });
    return;
  }

  const productId = req.params.productId;

  Product.deleteOne({ productId: productId })
    .then(() => {
      res.json({
        message: "Product deleted",
      });
    })
    .catch((error) => {
      res.status(403).json({
        message: error,
      });
    });
}


//(Special GET request name attached to json body)
export function getProductByName(req,res){

  const name = req.body.name;

  Product.find({name : name}).then(
    (productList)=>{
      res.status(200).json({
        list : productList
      }) 
    }
  ).catch(
    (err)=>{
      res.json({
        message : "Error"
      })
    }
  )
}

//(Special GET request name attached with link)
export function getProductByLinkName(req,res){

  const name = req.params.name;

  Product.find({name : name}).then(
    (productList)=>{
      res.status(200).json({
        list : productList
      }) 
    }
  ).catch(
    (err)=>{
      res.json({
        message : "Error"
      })
    }
  )
}

export function updateProduct(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "Please login as administrator",
    });
    return;
  }

  const productId = req.params.productId;
  const updatedProductData = req.body;

  Product.updateOne({ productId: productId }, updatedProductData)
    .then(() => {
      res.json({
        message: "Product updated",
      });
    })
    .catch((error) => {
      res.status(403).json({
        message: error,
      });
    }); 
  }


