const express=require("express")
const router=express.Router();
const Person=require('./../models/person')

//POST route to add a person
router.post('/',async (req,res)=>{
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

//get method to get the person
router.get('/', async (req,res)=>{
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

router.get('/:work',async (req,res)=>{
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
router.put('/:id',async (req,res)=>{
    try{
        const personId =req.params.id;
        const updatePersonData  =req.body;

        const response=await Person.findByIdAndUpdate(personId,updatePersonData,{
            new:true,
            runValidators:true
        });
        if(!response){
            res.status(404).json({error:"Person not found"});
        }
        console.log("Data Updated")
        res.status(201).json(response);
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server error'});
    }
});

router.delete('/:id',async (req,res)=>{
    try{
        const personId =req.params.id;

        const response=await Person.findByIdAndDelete(personId);
        if(!response){
            res.status(404).json({error:"Person not found"});
        }
        console.log("Data Deleted")
        res.status(201).json({message:"Person Deleted succcessfully"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server error'});
    }
});

module.exports=router;