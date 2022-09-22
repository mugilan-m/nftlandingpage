const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
require('dotenv').config();
const mongoose = require("mongoose");
const port=process.env.PORT||3000;
const app= express();
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({
    extended:true
}));
const DB ="mongodb+srv://mugilan:19csr111@cluster0.jcb36.mongodb.net/datadb?retryWrites=true&w=majority";
mongoose.connect(DB 
 ).then(()=>{
    console.log("connection successfull");
}).catch((err)=>console.log(err));

const userSchema =new mongoose.Schema({

    name:String,
    email:String,
    password:String
    
});

const User = new mongoose.model("user",userSchema);

app.get("/",function(req,res){
    res.render("home");
})
app.get("/main",function(req,res){
    res.render("main");
})
app.get("/login",function(req,res){
    res.render("login");
})
app.get("/signup",function(req,res){
    res.render("signup");
})
app.post("/register",function(req,res){
    const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    newUser.save(function(err)
    {
        if(err)
        {
            console.log(err);
            res.redirect("error");
        }
        else{
            res.render("login");
        }
    })
})
app.post("/login",function(req,res){
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email:email},function(err,foundUser){
        if(err)
        {
            console.log(err);
            res.redirect("error");
        }
        else{
            if(foundUser)
            {
                if(foundUser.password === password)
                {
                    console.log(foundUser);
                    res.render("admin");
                }

            }
        }
    })
})
app.listen(port,()=> 
console.log("server run on port at http://localhost:3000"));






