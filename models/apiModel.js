/*
 *
 * Database functionalities for recommendation api's
 *
 */

var env = require("../config/environment")
	, validator = require("validator")
	, _ = require("underscore")
	, logger = env.logger
;

function dbGetHotel(hotelId, callback) {
	env.Hotels.findOne({ "key": hotelId }, function(error, hotels) {
		if(error) {
			logger.error('Error from database: ' + error);
			return callback(error);
		}
		// check if a null object is received
		if(validator.isNull(hotels)) {
			logger.debug('Null object received from database, hotelId: ' + hotelId);
			return callback(null, []);
		}
		hotels = hotels.toObject();
		//Return the information from database
		return callback(null, _.omit(hotels, ['_id', '__v']));
 	});
}

function dbGetGym(gymId, callback) {
	env.Gyms.findOne({ "key": gymId }, function(error, gyms) {
		if(error) {
			logger.error('Error from database: ' + error);
			return callback(error);
		}
		// check if a null object is received
		if(validator.isNull(gyms)) {
			logger.debug('Null object received from database, gymId: ' + gymId);
			return callback(null, []);
		}
		gyms = gyms.toObject();
		//Return the information from database
		return callback(null, _.omit(gyms, ['_id', '__v']));
 	});	
}

function dbGetBar(barId, callback) {
	env.Bars.findOne({ "key": barId }, function(error, bars) {
		if(error) {
			logger.error('Error from database: ' + error);
			return callback(error);
		}
		// check if a null object is received
		if(validator.isNull(bars)) {
			logger.debug('Null object received from database, barId: ' + barId);
			return callback(null, []);
		}
		bars = bars.toObject();
		//Return the information from database
		return callback(null, _.omit(bars, ['_id', '__v']));
 	});	
}

function dbGetBook(bookId, callback) {
	env.Books.findOne({ "key": bookId }, function(error, books) {
		if(error) {
			logger.error('Error from database: ' + error);
			return callback(error);
		}
		// check if a null object is received
		if(validator.isNull(books)) {
			logger.debug('Null object received from database, bookId: ' + bookId);
			return callback(null, []);
		}
		books = books.toObject();
		//Return the information from database
		return callback(null, _.omit(books, ['_id', '__v']));
 	});	
}

moduleExports = {}
moduleExports.dbGetHotel = dbGetHotel;
moduleExports.dbGetGym = dbGetGym;
moduleExports.dbGetBar = dbGetBar;
moduleExports.dbGetBook = dbGetBook;

module.exports = moduleExports;