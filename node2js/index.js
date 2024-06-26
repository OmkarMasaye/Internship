const express = require("express")

const server = express();
const port = 3000;
// Middleware to parse JSON bodies
server.use(express.json());

server.get('/', (req, res) => {
    res.send('My First Program');
});

server.post('/user', (req, res) => {
    const { name } = req.body;
    // console.log(req.body)
    res.json({ name });
});



server.listen(port, () => {
    console.log(`Server is running on http:/localhost:${port}`);
});

