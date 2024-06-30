const express=require('express')
const mongoose=require('mongoose')
const db=require('./db')
const Person=require('./models/person')
const Menu=require('./models/menu')

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
});


app.get('/person', async (req,res)=>{
    try{
        const data= await Person.find();
        console.log('Data Fetch');
        res.status(200).json(data)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server error'});
    }
});

app.get('/person/:work',async (req,res)=>{
    try{
        const work =req.params.work;
        if(work=='chef'||work=='waiter'||taste=='manager'){
            const data=await Person.find({work:work});
            console.log('Data Fetch');
            res.status(200).json(data)
        }
        else{
            res.status(400).json({error:"Invalid work"});
        }      
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server error'});
    }
});


app.post('/menu',async (req,res)=>{
    try{
        const data =req.body;

        const newMenu=new Menu(data);
        const response=await newMenu.save();

        console.log("Data Saved");
        res.status(201).json(response)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server error'});
    }
});

app.get('/menu', async (req,res)=>{
    try{
        const data= await Menu.find();
        console.log('Data Fetch');
        res.status(200).json(data)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server error'});
    }
});
app.get('/menu/:taste',async (req,res)=>{
    try{
        const taste =req.params.taste;
        if(taste=='sweet'||taste=='spicy'||taste=='sour'){
            const data=await Menu.find({taste:taste});
            console.log('Data Fetch');
            res.status(200).json(data)
        }
        else{
            res.status(400).json({error:"Invalid taste"});
        }      
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server error'});
    }
});



app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});