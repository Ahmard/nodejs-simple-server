const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

sqlite.open({
    filename: './database.db',
    driver: sqlite3.Database
}).then(function(db){
    db.exec(
        'CREATE TABLE data('+
        '    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,'+
        '    name VARCHAR(100) NOT NULL,' +
        '    data VARCHAR(1000) NOT NULL,' +
        '    time INT(15) NOT NULL'+
        ');'
    ).then(() => console.log('Table Created')).catch((e) => console.log(e));
});