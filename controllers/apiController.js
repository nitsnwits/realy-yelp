/*
 *  http handlers for recommendation api's
 */

var env = require("../config/environment")
	, validator = require("validator")
	, _ = require("underscore")
	, async = require('async')
	, logger = env.logger
	, apiModel = require('../models/apiModel')
;

module.exports.renderTemplate = function(req, res) {
	res.render('../views/List.html');
}

module.exports.getHotelJson = function(req, res) {
	var hotelId = req.params.hotel_id;
	apiModel.dbGetHotel(hotelId, function(error, hotels) {
		if (error) {
			logger.log('Error from database: ' + error);
			return res.render('Errorpage', {error: error});
		}
		return res.status(200).send(hotels);
	});
}

module.exports.getGymJson = function(req, res) {
	var gymId = req.params.gym_id;
	apiModel.dbGetGym(gymId, function(error, gyms) {
		if (error) {
			logger.log('Error from database: ' + error);
			return res.render('Errorpage', {error: error});
		}
		return res.status(200).send(gyms);
	});
}

module.exports.getBarJson = function(req, res) {
	var barId = req.params.bar_id;
	apiModel.dbGetBar(barId, function(error, bars) {
		if (error) {
			logger.log('Error from database: ' + error);
			return res.render('Errorpage', {error: error});
		}
		return res.status(200).send(bars);
	});	
}

module.exports.getBookJson = function(req, res) {
	var bookId = req.params.book_id;
	apiModel.dbGetBook(bookId, function(error, books) {
		if (error) {
			logger.log('Error from database: ' + error);
			return res.render('Errorpage', {error: error});
		}
		return res.status(200).send(books);
	});	
}