const querystring = require('querystring');
const url = require('url');
module.exports = {
    /**
     * @param {IncomingMessage} request
     */
    postData: function (request, callback) {
        let data = '';
        let parsedData;
        request.on('data', function (chunk) {
            data += chunk.toString();
        });
        request.on('end', function () {
            parsedData = querystring.parse(data);
            callback(parsedData);
        });
    },

    /**
     * @param {IncomingMessage} request
     */
    getData: function (request, callback){
        let parsedData = url.parse(request.url, true).query;
        callback(parsedData);
    }
};