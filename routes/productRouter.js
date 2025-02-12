import express from 'express';
import { createProduct, deleteProduct, getProduct, getProductByName, getProductByLinkName } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get('/',getProduct);     //link : localhost:5000/api/products (normal GET request)
productRouter.post('/',createProduct);  //link : localhost:5000/api/products (normal POST request)
productRouter.delete("/",deleteProduct);  //link : localhost:5000/api/products (normal DELETE request)
productRouter.get("/ByName",getProductByName);  //link : localhost:5000/api/products/ByName (Special GET request name attached to json body)
productRouter.get("/:name",getProductByLinkName);  //link : localhost:5000/api/products/Tab A9 (Special GET request namme attached with link)

export default productRouter;