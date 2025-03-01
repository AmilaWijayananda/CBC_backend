import express from "express";
import { creatUser, getCustomers, getMe, getUser, googleLogin, loginUser, updateCustomerStatus } from "../controllers/userController.js";


const userRouter = express.Router();

userRouter.get("/",getUser);
userRouter.post("/",creatUser);
userRouter.post("/login",loginUser);
userRouter.post("/google",googleLogin);
userRouter.get("/me",getMe);
userRouter.get("/customers",getCustomers);
userRouter.put("/customers/:customerEmail",updateCustomerStatus)


export default userRouter