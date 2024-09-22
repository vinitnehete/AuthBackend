const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config();
const cors = require("cors")
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
const cookieParser = require('cookie-parser');

app.use(cookieParser());

const DB_URI = process.env.DB_URI;




mongoose
    .connect(DB_URI)
        .then(()=>console.log("Mongo Connected"))
            .catch((error) => console.log("Error" , error))


const userRoute = require("./routes/user"); 
app.use("/user" , userRoute)









app.listen(8000 , () =>{
    console.log("server started")
});
