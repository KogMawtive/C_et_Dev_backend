const express = require('express')
const app = express()
const port = 3000

//exercice avec GET

app.get('/', (req, res) => {
    res.send('hello World')
})

app.get("/some-html", (req,res) => {
    res.send(`<html><body><h1>bonjour html</h1></body></html>`)
})

app.get("/some-json", (req,res) => {
    const personne = {age: 22, nom: "Jane"};

    res.json(personne);
})

app.get("/transaction", (req,res) => {

    const tab = [100, 2000, 3000];

    res.json(tab);

    console.log(req.headers);
    console.log(req.body);
})

app.get("/exo-query-string", (req,res) => {
    console.log(req.query);
    
    const age = req.query.age;

    res.send(`<h1>Âge de la personne : ${age}</h1>`)
})


app.get('/get-user/:userId', (req, res) => {
  const userId = req.params.userId;

  console.log(req.params); 

  res.send(`<h1>Identifiant utilisateur : ${userId}</h1>`);
});

//Exercice avec POST

app.use(express.json());

app.post('/data', (req,res) => {
    console.log(req.body);

    res.json(req.body);
})


//liste ToDo
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

let tasks = [];
let NextId = 1;

app.get('/tasks', (req, res) => {
    res.json(tasks);
})

app.post('/new-task', (req, res) => {
    const { title, description, isDone } = req.body;

    const task = {
        id : NextId++,
        title,
        description,
        isDone
    }

    tasks.push(task)
})

add.put('/update-task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
    return res.status(404).json({ error: 'Tâche non trouvée' });
  }

    const { title, description, isDone } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (isDone !== undefined) task.isDone = isDone;

  res.json(task);
})

app.delete('/delete-task/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === taskId);

  if (index === -1) {
    return res.status(404).json({ error: 'Tâche non trouvée' });
  }

  const deletedTask = tasks.splice(index, 1);
  res.json(deletedTask[0]); 
});

