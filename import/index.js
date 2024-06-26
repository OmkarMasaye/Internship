const express=require("express")
const app=express();
const port=3000;
const fs = require("fs")


app.use((req,res,next)=>{
    fs.appendFileSync("logs.txt", `${Date.now()} is a ${req.method}\n`)
    console.log(`${Date.now()} is a ${req.method}`);
    req.harry="i am happy"
    next();
});

app.get('/',(req,res)=>{
    res.send("HIii"+ req.harry);
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
