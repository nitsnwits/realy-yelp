/*

	Set all routes of the cmpe 280 application

*/

var userController = require('../../controllers/userController')
	, baseurl = ''
;

module.exports = function(app, env) {
	app.get('/', userController.getRoot);
	
	// User routes
	app.post(baseurl + '/users', userController.postUser);
	app.get(baseurl + '/users/:user_id', userController.getUser);
	
}
