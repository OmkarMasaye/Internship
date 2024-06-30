const express = require('express');
const router = require('./routes/blog.js');
const app = express();
const port = 3000;


app.use(express.static("public"))

app.use('/blog', router);


app.get("/index", (req, res) => {
    res.json({a:1,b:3})
})
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})