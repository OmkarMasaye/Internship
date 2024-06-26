const express=require('express');
const app=express();
const port=2000;

app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).end('Hello World');
});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});