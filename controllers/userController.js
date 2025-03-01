import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";
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


  export async function googleLogin(req,res){
  //console.log(req.body)
  const Gtoken = req.body.token
  //'https://www.googleapis.com/oauth2/v3/userinfo'
  try{
    const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',{
      headers: {
        Authorization: `Bearer ${Gtoken}`
      }
    })
    const email = response.data.email
    //console.log(response.data)
    //check if user exists
    const usersList = await User.find({email: email})
    //console.log(usersList)
    if(usersList.length >0){
      const user = usersList[0]
      const token = jwt.sign({
        email : user.email,
        firstName : user.firstName,
        lastName : user.lastName,
        isBlocked : user.isBlocked,
        type : user.type,
        profilePicture : user.profilePicture
      } , process.env.JWT_KEY)
      
      res.json({
        message: "User logged in",
        token: token,
        user : {
          firstName : user.firstName,
          lastName : user.lastName,
          type : user.type,
          profilePicture : user.profilePicture,
          email : user.email
        }
      })
    }else{
      //create new user
      const newUserData = {
        email: email,
        firstName: response.data.given_name,
        lastName: response.data.family_name,
        type: "customer",
        password: "ffffff",
        profilePicture: response.data.picture
      }
      const user = new User(newUserData)
      user.save().then(()=>{
        res.json({
          message: "User created"
        })
      }).catch((error)=>{
        res.json({      
          message: "User not created"
        })
      })

    }

  }catch(e){
    res.json({
      message: "Google login failed"
    })
  }
}

export async function getUser(req,res){
  if(req.user==null){
    res.status(404).json({
      message: "User not found"
    })
    return
  }

  res.json(req.user)
}

export function getMe(req, res) {
  // Extract the token from the Authorization header
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Find the user by email (or ID, depending on what's stored in the token)
    User.findOne({ email: decoded.email })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        // Return the user's details (excluding sensitive data like password)
        res.json({
          message: "User details fetched successfully",
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            type: user.type,
            profilePicture: user.profilePicture,
            isBlocked: user.isBlocked,
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
      });
  } catch (error) {
    console.error("Invalid token:", error);
    res.status(400).json({ message: "Invalid token" });
  }
}

export async function getCustomers(req, res) {
  // Check if the user is an admin
  if (!isAdmin(req)) {
      return res.status(403).json({
          message: "Unauthorized: Only admins can access this resource"
      });
  }

  try {
      // Fetch all customers (users with type "Customer")
      const customers = await User.find({ type: "Customer" }).select('-password'); // Exclude passwords from the response

      // Return the list of customers
      res.status(200).json(customers);
  } catch (error) {
      // Handle any errors that occur during the database query
      res.status(500).json({
          message: "An error occurred while fetching customers",
          error: error.message
      });
  }
}