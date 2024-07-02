const express=require("express")
const router=express.Router();
const Menu=require('./../models/menu')


router.post('/',async (req,res)=>{
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

router.get('/', async (req,res)=>{
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
router.get('/:taste',async (req,res)=>{
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

module.exports=router;