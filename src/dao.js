const sqlite3 = require('sqlite3').verbose();

class SqliteDAO {
    constructor(dbFilePath) {
        this.db = new sqlite3.Database(dbFilePath, (err) => {
            if (err) {
                console.log('Could not connect to database: ', err);
            }
            else {
                console.log('Connected to database');
            }
        });
    }

    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            // @TODO CHANGE BACK TO RUN
            this.db.exec(sql, function(err) {
                if (err) {
                    console.log('Error running sql ' + sql);
                    console.log(err);
                    reject(err);
                }
                else {
                    console.log(this.changes);
                    // resolve({id: this.lastID});
                    resolve();
                }
            });
        });
        
    }

    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    console.log('Error runnning sql: ' + sql);
                    console.log(err);
                    reject(err);
                }
                else {
                    return resolve(rows);
                }
            });
        });
    }
}

module.exports = SqliteDAO;