import express from "express";
import { creatUser, getUser, googleLogin, loginUser } from "../controllers/userController.js";


const userRouter = express.Router();

userRouter.get("/",getUser);
userRouter.post("/",creatUser);
userRouter.post("/login",loginUser);
userRouter.post("/google",googleLogin);


export default userRouter