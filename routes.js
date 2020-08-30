const Route = require('./app/Router.js');
module.exports = Route;

Route.get('/', 'MainController@index');
Route.get('/help', 'MainController@help');
Route.get('/json', 'MainController@json');

Route.get('/data/list', 'DataController@list');
Route.post('/data/save', 'DataController@save');
Route.post('/data/update', 'DataController@update');
Route.get('/data/delete', 'DataController@delete');