const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const requestLib = require('../Request');
const fs = require('fs');

const { IncomingMessage, ServerResponse } = require("http");

module.exports = (function(){

    let databaseFile = fs.realpathSync('./') + '/database.db';

    function DataController(){
        //sqlite.open
    }

    /**
     * List data 
     * @param {IncomingMessage} request 
     * @param {ServerResponse} response 
     */
    DataController.prototype.list = function (request, response) {
        response.setHeader('Content-Type', 'application/json');
        sqlite.open({
            filename: databaseFile,
            driver: sqlite3.Database
        }).then(function (db) {
            let time = new Date().getTime();
            let sql = `SELECT * FROM data;`;
            db.all(sql).then(function (data) {
                response.end(JSON.stringify(data));
            }).catch(e => {
                response.end(JSON.stringify(e))
                console.log(e);
            });
        });
        response.writeHead(200);
        response.write(JSON.stringify({
            'data': []
        }));
    };

    /**
     * Save some data 
     * @param {IncomingMessage} request 
     * @param {ServerResponse} response 
     */
    DataController.prototype.save = function (request, response) {
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.writeHead(200);

        requestLib.postData(request, function(data){
            sqlite.open({
                filename: databaseFile,
                driver: sqlite3.Database
            }).then(function (db) {
                let time = new Date().getTime();
                let sql = `INSERT INTO data(name, data, time) VALUES ('${data.name}', '${data.data}', '${time}')`;
                db.exec(sql).then(function(data){
                    response.end(JSON.stringify({
                        'message': 'Data saved successfully.'
                    }));
                }).catch(e => {
                    response.end(JSON.stringify(e))
                    console.log(e);
                });
            });
        });
    };

    /**
     * Save some data 
     * @param {IncomingMessage} request 
     * @param {ServerResponse} response 
     */
    DataController.prototype.update = function (request, response) {
        response.setHeader('Content-Type', 'application/json');
        response.writeHead(200);

        requestLib.postData(request, function (data) {
            requestLib.getData(request, function(param){
                console.log(JSON.stringify(param));
                sqlite.open({
                    filename: databaseFile,
                    driver: sqlite3.Database
                }).then(function (db) {
                    let time = new Date().getTime();
                    let sql = `UPDATE data SET name = '${data.name}', data = '${data.data}', time ='${time}' WHERE id = ${param.id};`;
                    db.exec(sql).then(function (data) {
                        response.end(JSON.stringify({
                            'message': 'Data updated successfully.'
                        }));
                    }).catch(e => {
                        response.end(JSON.stringify(e))
                        console.log(e);
                    });
                });
            })
        });
    };

    /**
     * Delete data
     * @param {IncomingMessage} request 
     * @param {ServerResponse} response 
     */
    DataController.prototype.delete = function (request, response) {
        response.setHeader('Content-Type', 'application/json');
        response.writeHead(200);
            requestLib.getData(request, function (data) {
            sqlite.open({
                filename: databaseFile,
                driver: sqlite3.Database
            }).then(function (db) {
                let sql = `DELETE FROM data WHERE id = '${data.id}';`;
                db.exec(sql).then(function (data) {
                    response.end(JSON.stringify({
                        'message': 'Data saved successfully.'
                    }));
                }).catch(e => {
                    response.end(JSON.stringify(e))
                    console.log(e);
                });
            });
        });
    };

    return DataController;
})();