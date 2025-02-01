import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Student from "./models/student.js";
import studentRouter from "./routes/studentRouter.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import orderRouter from "./routes/orderRouter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();

const app = express();

//DB link use directly in code
//const mongoUrl = "mongodb+srv://admin:admin123@cluster0.tc3c9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

//DB link hide in .env file and use as below
const mongoUrl = process.env.MONGO_DB_URL

app.use(cors())
mongoose.connect(mongoUrl, {})

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("Database connected");
})

app.use(bodyParser.json());

//create middleware to decaode user token
app.use(
    (req, res, next) => {
        
        //console.log(req.header("Authorization"));
        const token = req.header("Authorization")?.replace("Bearer ","")
        console.log(token)

        if(token != null){
            jwt.verify(token,process.env.JWT_KEY, (error, decoded) => {

                if(!error){
                    console.log(decoded)
                    req.user = decoded
                }
                
            })
        }

        next()
    }
)

app.use("/api/students", studentRouter);  //create students path to studentRouter (localhost:5000/api/students), as a starnded use "/api/students"
app.use ("/api/products", productRouter); //create products path to productRouter
app.use("/api/users", userRouter); //create users path to userRouter
app.use("/api/orders", orderRouter) //create order path to orderRouter


//app.get("/",(req, res) => {
//    console.log(req);
//    console.log("This is GET Request");
//    res.json({
//        message: "This is respose to GET request"
//    });
//});


//app.post("/",(req, res) => {
//    console.log(req.body);
//    console.log("This is POST Request");
//    res.json({
//        message: "This is respose to POST request"
//    });
//});


//app.post("/",(req, res) => {
    
//    const studentSchema = mongoose.Schema({
//        name: String,
//        age: Number,
//        gender: String
//    });

//    const Student = mongoose.model("student", studentSchema);

//    const newStudent = new Student(req.body)

//    newStudent.save().then(
//        () => {
//        res.json({
//            message: "Student created"
//        })
//    }
//    ).catch(()=> {
//    res.json({
//        message: "Error creating student"
//        })
//    }
//)}
//);

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});