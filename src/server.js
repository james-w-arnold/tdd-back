const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const config = require('./config');
const sqliteDAO = require('./dao');
const TodoRepository = require('./todo');
// parse json through body parser
app.use(bodyParser.json());
app.use(cors());

//Setup database connection and repository 
const dao = new sqliteDAO(config.db.name);
const todoRepo = new TodoRepository(dao);

//setup request logging middleware
app.use((req, res, next) => {
    let date = new Date();
    console.log(`${date} - ${req.method} - ${JSON.stringify(req.body)}`);
    next();
});

app.get('/', (req, res) => {
    todoRepo.createTable()
        .then(() => todoRepo.list())
        .then((data) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send({todos: data});
        })
        .catch(error => {
            res.setHeader('Content-Type', 'application/json');
            res.status(500).send({"error": error});
        });
});

app.post('/todo', (req, res) => {
    todoRepo.createTable()
        .then(() => todoRepo.create({title: req.body.title, body: req.body.body}))
        .then(data => {
            res.setHeader('Content-Type', 'application/json');
            res.status(201).send({
                // id: data.id,
                title: req.body.title,
                body: req.body.body
            });
        })
        .catch(error => {
            console.error(error);
            res.setHeader('Content-Type', 'application/json');
            res.status(500).send({"error": "application/json"})
        })
});

app.listen(config.server.port, () => console.log('App listening on port ' + config.server.port));