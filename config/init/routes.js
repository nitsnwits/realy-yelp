/*

	Set all routes of the cmpe 280 application

*/

var userController = require('../../controllers/userController')
	, errorController = require('../../controllers/errorController')
	, baseurl = ''
	, apiController = require('../../controllers/apiController')
;

module.exports = function(app, env) {
	app.get('/', userController.getRoot);
	
	// User routes
	app.post(baseurl + '/users', userController.postUser);
	app.get(baseurl + '/users/:user_id', userController.getUser);
	app.post(baseurl + '/login', userController.postLogin);

	// errors
	app.get(baseurl + '/errors', errorController.getErrors);
	app.get(baseurl + '/errors.json', errorController.getErrorsJson);

	// cpu status
	app.get(baseurl + '/cpu', errorController.getCpu);
	app.get(baseurl + '/cpu.json', errorController.getCpuJson);

	//api's
	app.get(baseurl + '/business/hotels/:hotel_id/similar', apiController.renderTemplate);
	app.get(baseurl + '/business/hotels/:hotel_id/similar.json', apiController.getHotelJson);

	// app.get(baseurl + '/business/gym/:gym_id/similar', apiController.renderTemplate);
	// app.get(baseurl + '/business/gym/:gym_id/similar.json', apiController.getGymJson);

	// app.get(baseurl + '/business/bars/:bar_id/similar', apiController.renderTemplate);
	// app.get(baseurl + '/business/bars/:bar_id/similar.json', apiController.getBarJson);

	// app.get(baseurl + '/business/books/:book_id/similar', apiController.renderTemplate);
	// app.get(baseurl + '/business/books/:book_id/similar', apiController.getBookJson);

}
