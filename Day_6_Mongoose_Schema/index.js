const express=require('express')
const mongoose=require('mongoose')
const db=require('./db')
const Person=require('./models/person')

const app=express();
const port = 3000;
app.use(express.json());


app.get('/',(req,res)=>{
    res.send("Welcome to TAJ hotel ")
})
app.post('/person',async (req,res)=>{
    try{
        const data =req.body;

        const newPerson=new Person(data);
        const response=await newPerson.save();

        console.log("Data Saved");
        res.status(201).json(response)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server error'});
    }

})
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})