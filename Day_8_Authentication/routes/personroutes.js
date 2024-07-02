const express=require("express")
const router=express.Router();
const Person=require('./../models/person')
const {jwtAuthMiddleware, generateToken} = require('./../jwt');



//POST route to add a person
router.post('/signup', async (req, res) =>{
    try{
        const data = req.body // Assuming the request body contains the person data

        // Create a new Person document using the Mongoose model
        const newPerson = new Person(data);

        // Save the new person to the database
        const response = await newPerson.save();
        console.log('data saved');

        const payload = {
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload));
        const token = await generateToken(payload);
        console.log("Token is : ", token);

        res.status(200).json({response: response, token: token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})
// Login Route
router.post('/login', async(req, res) => {
    try{
        // Extract username and password from request body
        const {username, password} = req.body;

        // Find the user by username
        const user = await Person.findOne({username: username});

        // If user does not exist or password does not match, return error
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // generate Token 
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = await generateToken(payload);

        // resturn token as response
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        console.log("User Data: ", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


//get method to get the person
// GET method to get the person
router.get('/', jwtAuthMiddleware, async (req, res) =>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


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