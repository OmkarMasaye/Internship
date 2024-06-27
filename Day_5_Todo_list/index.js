const express = require('express');
const bodyparser = require('body-parser')

const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let todos = [];

app.get('/', (req, res) => {
    res.json(todos);
});

app.post('/newtodo', (req, res) => {
    const { title, description } = req.body;
    const newTodo = { id: todos.length + 1, title, description, completed: false };
    todos.push(newTodo);
    res.json({ newTodo, todos });
});

app.put('/updatetodo/:id', (req, res) => {
    const { id } = req.params;
    const todo = todos.find(todo => todo.id === parseInt(id));
    if (!todo) {
        res.status(404).json({ message: 'Todo not found' })
    }
    todo.completed = !todo.completed;
    res.json(todo);
})

app.delete('/deletetodo/:id', (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex(todo => todo.id === parseInt(id));
    if (index === -1) {
        return res.status(201).json({ message: 'Todo not found' });
    }
    const data = todos.splice(index, 1);
    res.json({ todos, data })
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});