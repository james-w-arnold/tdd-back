const sqlite3 = require('sqlite3').verbose();
const config  = require('./config');

class TodoRepository {
    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT CHECK(title IS null or length(title) < 31),
            body TEXT,
            dateadded DATETIME DEFAULT CURRENT_TIMESTAMP
        )`;

        return this.dao.run(sql);
    }

    //@TODO: REMOVE SECURITY VULNERABILITY
    create(todo) {
        // return this.dao.run(
        //     'INSERT INTO todos (title, body) VALUES (?,?)',
        //     [todo.title, todo.body]
        // );
        return this.dao.run(
            "INSERT INTO todos (title, body) VALUES ('" + todo.title + "', '" + todo.body + "')"
        );
    }

    list() {
        return this.dao.all(
            'SELECT * FROM todos'
        );
    }
}

module.exports = TodoRepository;