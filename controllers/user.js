const User = require('../models/')
const {setUser , getUser} = require("../service/auth")

async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;
   

    try {
        const newUser = await User.create({ name, email, password });

        return res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);

        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already exists" });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
}


const handleLogin = async(req , res) =>{

    const {email , password} = req.body
    try {
        const user = await User.findOne({email,password})
        if(!user) {
            res.status(404).json("Invalid UserName and Password")
        }
        const token = setUser(user)
        res.cookie("token" , token)
        
        return res.status(200).json(user)
    }catch(error){
        console.log(error)
    }
}
 
const addfavorite = async(req , res) =>{
    const token = req.cookies.token 
   
   
    
    const data = getUser(token)

    
    const id = data.user._id
    const {movieid} = req.body
    try {
        const user = await User.findById(id);
        if (user) {
            // Push the movie ID into the favorites array
            user.favtories.push(movieid);
            // Save the updated user document
            await user.save();
            return res.status(200).json({ message: 'Movie added to favorites' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {
    handleUserSignUp,
    handleLogin,
    addfavorite
}