const express = require("express")
const {connection}=require("./config/db")
const {userRouter}=require("./backend/routes/User.route")
const {noteRouter}=require("./backend/routes/Note.route")
const {authenticate}=require("./middlewares/authenticate.middleware")
// const jwt = require("jsonwebtoken")
// const bcrypt = require('bcrypt')

const app=express()
app.use(cors({
    origin:"*"
}))
app.use(express.json())

app.get("/",(req,res)=>{
   res.send("Home Page")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)

app.get("/about",(req,res)=>{
    res.send("About API")
 })

 app.get("/contact",(req,res)=>{
    res.send("About API")
 })

 app.get("/data",(req,res)=>{
    // const token=req.query.token;
    const token=req.headers.authorization;
    jwt.verify(token, 'masai',(err,decoded)=>{
        if(err){
            res.send("Invalid token")
            console.log(err)
        }
        else{
            res.send("Data...")
        }
    });
 })

 app.get("/cart",(req,res)=>{
    const token=req.query.token;
    jwt.verify(token, 'masai',(err,decoded)=>{
        if(err){
            res.send("Invalid token")
            console.log(err)
        }
        else{
            res.send("Cart Page")
        }
    });
 })

app.listen(8080,async()=>{
    try{
        await connection
        console.log("Connected to the DB")
    }
    catch(err){
        console.log("Trouble connecting to the DB")
        console.log(err)
    }
    console.log("Server is running on 8080")
})