import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function creatUser(req, res){

    const newUserData = req.body

    newUserData.password = bcrypt.hashSync(newUserData.password, 10)

    //console.log(newUserData)

    const user = new User(newUserData)

    user.save().then(()=>{
        res.json({
            message: "User created"
        })
    }).catch(()=>{
        res.json({
            message: "User not created"
        })
    })
}


export function loginUser(req, res){

    User.find({email : req.body.email}).then(
        (users)=>{
            //res.json(users) //print all users in postman
            
            if (users.length == 0){
                res.json({
                    message: "User not found"
                })
            }else{
                const user = users[0]

                const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)
                
                if (isPasswordCorrect){

                    const token = jwt.sign({
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        isBlocked: user.isBlocked,
                        type: user.type,
                        profilePicture: user.profilePicture
                    }, process.env.JWT_KEY)

                    res.json({
                        message: "User logged in",
                        token: token,
                        user: {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            type: user.type,
                            email: user.email,
                            profilePicture: user.profilePicture
                        }
                    })
                }else{
                    res.json({
                        message: "Password is incorrect"
                    })
                }
                
            }
        }
    )
}

// admin cx check function

export function isAdmin(req){
    if(req.user==null){
      return false
    }
  
    if(req.user.type != "admin"){
      return false
    }
  
    return true
  }
  
  export function isCustomer(req){
    if(req.user==null){
      return false
    }
  
    if(req.user.type != "Customer"){
      return false
    }
  
    return true
  }