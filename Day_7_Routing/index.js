const express=require('express')
const mongoose=require('mongoose')
const db=require('./db')

require('dotenv').config();

const app=express();

const PORT=process.env.PORT||3000;

app.use(express.json());


app.get('/',(req,res)=>{
    res.send("Welcome to TAJ hotel ")
});

const personroutes=require("./routes/personroutes")
app.use('/person',personroutes);

const menuroutes=require("./routes/menuroutes")
app.use('/menu',menuroutes);


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});