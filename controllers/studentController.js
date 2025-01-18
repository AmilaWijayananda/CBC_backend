import Student from "../models/student.js";


// function to get all students
export function getStudents(req, res){
    
    Student.find().then(
        (studentList) => {
            res.json({
                List: studentList
            });
        }

    )
};

//function to create student
export function createStudent(req, res){
    
    const student = new Student(req.body);
    student.save().then(() => {
        res.json({
            message: "Student saved successfully"
        });
    }).catch((err) => {
        res.json({
            message: "Error creating student"
        })
    })
};

//function to delete student
export function deleteStudent(req, res){
    Student.deleteOne({name:req.body.name}).then(
        () => {
        res.json(
            {
            message: "Student deleted successfully"
        }
    );
    }).catch((err) => {
        res.json({
            message: "Error deleting student"
        })
    })
};