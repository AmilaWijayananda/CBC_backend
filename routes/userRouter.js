import express from "express";
import { creatUser, getAdmins, getCustomers, getMe, getUser, googleLogin, loginUser, updateUserStatus } from "../controllers/userController.js";


const userRouter = express.Router();

userRouter.get("/",getUser);
userRouter.post("/",creatUser);
userRouter.post("/login",loginUser);
userRouter.post("/google",googleLogin);
userRouter.get("/me",getMe);
userRouter.get("/customers",getCustomers);
userRouter.put("/:userEmail",updateUserStatus)
userRouter.get("/admins",getAdmins);


export default userRouter