import express from 'express';
import { createProduct, deleteProduct, getProduct, getProductByName, getProductByLinkName, updateProduct, getProductById, searchProducts } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get('/',getProduct);     //link : localhost:5000/api/products (normal GET request)
productRouter.post('/',createProduct);  //link : localhost:5000/api/products (normal POST request)
productRouter.get("/search/:query",searchProducts);
productRouter.delete("/:productId",deleteProduct);  //link : localhost:5000/api/products ( DELETE by Id request)
productRouter.get("/ByName",getProductByName);  //link : localhost:5000/api/products/ByName (Special GET request name attached to json body)
//productRouter.get("/:name",getProductByLinkName);  //link : localhost:5000/api/products/Tab A9 (Special GET request namme attached with link)
productRouter.put("/:productId",updateProduct);  //link : localhost:5000/api/products ( update by Id request)
productRouter.get("/:productId",getProductById); 
export default productRouter;