const http = require('http');
const Route = require('./routes.js');

const CONTROLLER_PATH = './app/Http/Controllers/';

const fs = require('fs');

const ROOT_DIR = fs.realpathSync('./') + '/';

http.createServer(function (request, response) {
    let routes = Route.getRoutes()[request.method.toLowerCase()];
    let url = request.url.split('?')[0];
    if (url in routes) {
        let providedController = routes[url];
        let splited = providedController.split('@');
        let controllerName = splited[0];
        let controllerMethodName = splited[1];

        //Include provided controller
        let requiredController = require(CONTROLLER_PATH + controllerName + '.js');
        //Initialise the controller class
        let controller = new requiredController();

        //We can do something before the method has been executed here.
        response.setHeader('X-Company-Name', 'TestCompany');
        
        //Execute method provided from the routes
        controller[controllerMethodName](request, response);
        
        //We can do something after the method has been executed
        //Something like append data to the actual controller response data if the url returns html source
        if (response.getHeader('Content-Type') === 'text/html') {
            //response.write('<div style="margin-top:15px;color:green">&copy Copyright - TestCompany ' + (new Date()).getFullYear() + '</div>');
        }
        //End the response
        return;// response.end();
    }

    response.writeHead(404);
    response.end(http.STATUS_CODES[404]);
}).listen(1333);