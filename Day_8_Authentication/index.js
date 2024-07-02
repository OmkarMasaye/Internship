const express=require('express')
const mongoose=require('mongoose')
const db=require('./db')
const passport=require('./auth')


require('dotenv').config();

const app=express();

const PORT=process.env.PORT||3000;

app.use(express.json());

const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}]: Request made to ${req.originalUrl}`);
    next();
}

//app.use(logRequest) //this will be applied for all api under index.js



app.use(passport.initialize());

const localAuthMiddleware=passport.authenticate('local',{session:false});


app.get('/',localAuthMiddleware,(req,res)=>{
    res.send("Welcome to TAJ hotel ")
});

const personroutes=require("./routes/personroutes")
app.use('/person',logRequest,personroutes); 

const menuroutes=require("./routes/menuroutes")
app.use('/menu',logRequest,menuroutes);


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});