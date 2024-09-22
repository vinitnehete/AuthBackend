const express = require("express")
const {handleUserSignUp , handleLogin , addfavorite } = require("../controllers/user")
const router = express.Router();


router.post("/signup" , handleUserSignUp)

router.post("/login" , handleLogin)

router.post("/add" , addfavorite)
module.exports = router 