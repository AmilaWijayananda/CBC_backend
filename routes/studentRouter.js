import express from "express";
import Student from "../models/student.js";
import { getStudents, createStudent, deleteStudent } from "../controllers/studentController.js";




//creat student router
const studentRouter = express.Router();


//initial get request for student router
//studentRouter.get("/",(req, res) => {
//    console.log(req);
//    console.log("This is GET Request for student router");
//    res.json({
//        message: "This is respose to GET request from student router"
//    });
//});


//get request to quary data from DB
//studentRouter.get("/",(req, res) => {   
//    Student.find().then(
//        (studentList) => {
//            res.json({
//                List: studentList
//            });
//        }
//    )
//});


//get request to quary data from DB via controller
studentRouter.get("/", getStudents);


//initial post request for student router
//studentRouter.post("/",(req, res) => {
//    console.log(req);
//    console.log("This is POST Request for student router");
//    res.json({
//        message: "This is respose to POST request from student router"
//    });
//});


//post request connect with student model to save data in DB
//studentRouter.post("/",(req, res) => {  
//    const student = new Student(req.body);
//    student.save().then(() => {
//        res.json({
//            message: "Student saved successfully"
//        });
//    }).catch((err) => {
//        res.json({
//            message: "Error creating student"
//        })
//    })
//});


//post request connect with student model to save data in DB via controller
studentRouter.post("/", createStudent);

//delete request to delete data from DB via controller
studentRouter.delete("/",deleteStudent);

//export student router
export default studentRouter