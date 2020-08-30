const { IncomingMessage, ServerResponse } = require("http");

module.exports = (function () {

    function MainController() {

    }

    /**
     * Homepage
     * @param {IncomingMessage} request 
     * @param {ServerResponse} response 
     */
    MainController.prototype.index = function (request, response) {
        response.setHeader('Content-Type', 'text/html');
        response.writeHead(200);
        response.end('Hello, this is homepage.');
    };

    /**
     * Help page :)
     * @param {IncomingMessage} request 
     * @param {ServerResponse} response 
     * @returns ServerResponse
     */
    MainController.prototype.help = function (request, response) {
        response.writeHead(200);
        response.end('Hello, this is help page.');
    };

    /**
     * Testing json response
     * @param {IncomingMessage} request
     * @param {ServerResponse} response
     */
    MainController.prototype.json = function (request, response) {
        response.setHeader('Content-Type', 'application/json');
        response.writeHead(200);
        response.end(JSON.stringify({
            'message': 'Hello There, Welcome.',
            'time': (new Date()).getTime()
        }));
    };

    return MainController;
})();