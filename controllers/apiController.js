/*
 *  http handlers for recommendation api's
 */

var env = require("../config/environment")
	, validator = require("validator")
	, _ = require("underscore")
	, async = require('async')
	, logger = env.logger
	, apiModel = require('../models/apiModel')
	,postFiltering = require('../recommendation/postFiltering')
	,url = require('url');
;

module.exports.renderTemplate = function(req, res) {
	res.render('../views/List.html');
}

module.exports.getTableau = function(req, res) {
	res.render('../views/tableau.html');
}

module.exports.getBusiness = function(req, res) {
	if (!req.query.business_id) {
		return res.status(200).send([]);
	}
	env.io.emit('request', 'Received request: ' + req.method + ': ' + req.baseUrl + req.path);
	var businesses = req.query.business_id.split(',');
	console.log()
	var responseArray = [];
	function findBusiness(businessId, cb) {
		apiModel.dbGetBusiness(businessId, function(err, business) {
			if (err) {
				logger.log('Error from database: ' + error);
				cb(err);
			}
			if(!validator.isNull(business)) {
				responseArray.push(business);
			}
			cb(null, business);
		});
	}
	async.each(businesses, findBusiness, function(err) {
		if (err) {
			return res.sendStatus(500);
		}
		return res.status(200).send(responseArray);
	});
}


///

////

module.exports.getHotelJson = function(req, res) {
	var hotelId = req.params.hotel_id;
	
	var queryData = url.parse(req.url, true).query;
	var data = {
		"lat" : queryData.lat,
		"longi" : queryData.longi
	};
	env.io.emit('request', 'Received request: ' + req.method + ': ' + req.baseUrl + req.path);
	apiModel.dbGetHotel(hotelId, function(error, hotels) {
		if (error) {
			logger.log('Error from database: ' + error);
			return res.render('Errorpage', {error: error});
		}
		postFiltering.generateFinalReco(hotels,data,function(finalResponse){

			return res.status(200).send(finalResponse);
			//return finalResponse;
		});
		//return res.status(200).send(hotels);
	});
}

module.exports.getGymJson = function(req, res) {
	var gymId = req.params.gym_id;
	env.io.emit('request', 'Received request: ' + req.method + ': ' + req.baseUrl + req.path);
	apiModel.dbGetGym(gymId, function(error, gyms) {
		if (error) {
			logger.log('Error from database: ' + error);
			return res.render('Errorpage', {error: error});
		}
		postFiltering.generateFinalReco(gyms,function(finalResponse){

			return res.status(200).send(finalResponse);
			//return finalResponse;
		});
		//return res.status(200).send(gyms);
	});
}

module.exports.getBarJson = function(req, res) {
	var barId = req.params.bar_id;
	var queryData = url.parse(req.url, true).query;
	var data = {
		"lat" : queryData.lat,
		"longi" : queryData.longi
	};

	env.io.emit('request', 'Received request: ' + req.method + ': ' + req.baseUrl + req.path);
	apiModel.dbGetBar(barId, function(error, bars) {
		if (error) {
			logger.log('Error from database: ' + error);
			return res.render('Errorpage', {error: error});
		}
		postFiltering.generateFinalReco(bars,data,function(finalResponse){

			return res.status(200).send(finalResponse);
			//return finalResponse;
		});
		//return res.status(200).send(bars);
	});	
}

module.exports.getBookJson = function(req, res) {
	var bookId = req.params.book_id;
	env.io.emit('request', 'Received request: ' + req.method + ': ' + req.baseUrl + req.path);
	apiModel.dbGetBook(bookId, function(error, books) {
		if (error) {
			logger.log('Error from database: ' + error);
			return res.render('Errorpage', {error: error});
		}
		postFiltering.generateFinalReco(books,function(finalResponse){

			return res.status(200).send(finalResponse);
			//return finalResponse;
		});
		//return res.status(200).send(books);
	});	
}