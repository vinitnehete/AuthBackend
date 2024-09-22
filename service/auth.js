const jwt = require("jsonwebtoken")
require('dotenv').config();

const scret = process.env.JWT_SECRET;


function setUser(user ){
   const payload = {user}

    return jwt.sign(payload , scret)
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token , scret)
}


module.exports = {setUser , getUser}