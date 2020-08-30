module.exports = (function () {
    var routeList = {
        'get': {},
        'post': {},
        'patch': {},
        'delete': {}
    };

    function Router() {

    };

    let add = function (method, name, controller) {
        routeList[method][name] = controller;
        return Router;
    };

    Router.getRoutes = function () {
        return routeList;
    }

    /**
     * Add route to GET method
     * @param {string} name route name 
     * @param {string} controller
     * @returns {Router}
     */
    Router.get = function (name, controller) {
        return add('get', name, controller);
    };

    /**
     * Add route to POST method
     * @param {string} name route name
     * @param {string} controller
     * @returns {Router}
     */
    Router.post = function (name, controller) {
        return add('post', name, controller);
    };

    /**
     * Add route to DELETE method
     * @param {string} name route name
     * @param {string} controller
     * @returns {Router}
     */
    Router.delete = function (name, controller) {
        return add('delete', name, controller);
    };

    /**
     * Add route to PATCH method
     * @param {string} name route name
     * @param {string} controller
     * @returns {Router}
     */
    Router.patch = function (name, controller) {
        return add('patch', name, controller);
    };

    return Router;
})();