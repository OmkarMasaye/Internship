const express=require("express");
const regis=express();
const port=8000;

regis.use(express.json());

let users=[];

regis.post('/api/register/:username/:email/:password',(req,res)=>{
    const{username,email,password}=req.params;
    

    if(!username||!email||!password){
       return res.status(400).json({message:`Please provide username, email, and password`});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: 'Password must be at least 8 characters long and contain at least one uppercase letter and one special character (!@#$%^&*)'
        });
    }

    const existingUser=users.find(user=>user.email==email)
    if(existingUser){
       return res.status(400).json({message:`User with this email already exists`});
    }

    const newUser={id:users.length+1,username,email,password};
    users.push(newUser);

    res.status(201).json({message: `User registered successfully`, user: newUser });
});

regis.listen(port,() =>{
    console.log(`Server is running on http:/localhost:${port}`);
})

