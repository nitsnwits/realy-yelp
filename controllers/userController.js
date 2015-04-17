/*
 *  http handlers for user objects
 */

var env = require("../config/environment")
	, validator = require("validator")
	, _ = require("underscore")
	, async = require('async')
	, logger = env.logger
	, crypto = require('crypto')
;

// encryption algorithm
var algo = 'md5';

//set datamodels based on datastoreMode
var userModel = require("../models/userModel");

module.exports.getRoot = function(req, res) {
	res.render('../views/Landing.html');
}

module.exports.postUser = function(req, res) {
	// check if body is empty
	if (_.isEmpty(req.body)) {
		logger.log("Empty request body received in POST user.");
		return res.send(400, env.errorMessages.code400);
	}
	
	//encrypt information
	// req.body.userName.firstName = crypto.createHash(algo).update(req.body.userName.firstName).digest('hex');
	// req.body.userName.lastName = crypto.createHash(algo).update(req.body.userName.lastName).digest('hex');
	// req.body.email = crypto.createHash(algo).update(req.body.email).digest('hex');
	req.body.password = crypto.createHash(algo).update(req.body.password).digest('hex');
	userModel.dbCreateUser(req.body, function(error, newUser) {
		if (error) {
			logger.error('Error from database in POST user. ' + error);
			return res.send(500, env.errorMessages.code500);
		}
		if (validator.isNull(newUser)) {
			logger.debug('Null object received from database in POST user. ');
			return res.send(400, env.errorMessages.code400);
		}
		console.log('POST /user response: ' + JSON.stringify(newUser));
		return res.send(200, newUser);
	});
}

module.exports.getUser = function(req, res) {
	var userId = req.params.user_id;
	userModel.dbGetUser(userId, function(error, user) {
		if (error) {
			logger.error('Error from database: ' + error);
			return res.send(500, env.errorMessages.code500);
		}
		if (validator.isNull(user)) {
			logger.debug('Null object received in get User controller, userId: ' + userId);
			return res.send(404, env.errorMessages.code404);

		}
		console.log('GET /user response ' + JSON.stringify(user));
		return res.send(200, user);
	});
}