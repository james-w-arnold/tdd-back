# TDD Todo backend
This is a simple backend to store and return todos for the front-end application. This was created for use in the TDD workshop to identify the different strategies that can be utilised to tests a simple TODO app

## Install:
```bash
npm install
```

## Run
```bash
node src/server.js
```

## Endpoints:
### Retrieve all todos: /
Returns a list of todos in the format:
```json
{
    "todos": [
        "title": "",
        "body": ""
    ]
}
```

### Add a todo: /todo
Post in the format:
```json
{
    "title": "",
    "body": ""
}
```