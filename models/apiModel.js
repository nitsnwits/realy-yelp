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


/*
Blog.find().where("author", username).
          exec(function(err, blogs) {
*/

function dbGetHotel(hotelId, callback) {
	env.Hotels.find().where("key",hotelId).exec(function(error, hotels) {
		if(error) {
			logger.error('Error from database: ' + error);
			return callback(error);
		}
		// check if a null object is received
		if(validator.isNull(hotels)) {
			logger.debug('Null object received from database, hotelId: ' + hotelId);
			return callback(null, []);
		}
		//hotels = hotels.toObject();
		//Return the information from database
		return callback(null, _.omit(hotels, ['_id', '__v']));
 	});
}

function dbGetGym(gymId, callback) {
	env.Gyms.find().where("key",gymId).exec(function(error, gyms) {
		if(error) {
			logger.error('Error from database: ' + error);
			return callback(error);
		}
		// check if a null object is received
		if(validator.isNull(gyms)) {
			logger.debug('Null object received from database, gymId: ' + gymId);
			return callback(null, []);
		}
		//gyms = gyms.toObject();
		//Return the information from database
		return callback(null, _.omit(gyms, ['_id', '__v']));
 	});	
}

function dbGetBar(barId, callback) {
	env.Bars.find().where("key",barId).exec(function(error, bars) {
		if(error) {
			logger.error('Error from database: ' + error);
			return callback(error);
		}
		// check if a null object is received
		if(validator.isNull(bars)) {
			logger.debug('Null object received from database, barId: ' + barId);
			return callback(null, []);
		}
		//bars = bars.toObject();
		//Return the information from database
		return callback(null, _.omit(bars, ['_id', '__v']));
 	});	
}

function dbGetBook(bookId, callback) {
	env.Books.find().where("key", bookId).exec(function(error, books) {
		if(error) {
			logger.error('Error from database: ' + error);
			return callback(error);
		}
		// check if a null object is received
		if(validator.isNull(books)) {
			logger.debug('Null object received from database, bookId: ' + bookId);
			return callback(null, []);
		}
		//books = books.toObject();
		//Return the information from database
		return callback(null, _.omit(books, ['_id', '__v']));
 	});	
}

function dbGetBusiness(businessId, callback) {
	env.Business.find().where("business_id", businessId).exec(function(error, business) {
		if(error) {
			logger.error('Error from database: ' + error);
			return callback(error);
		}
		// check if a null object is received
		if(validator.isNull(business)) {
			logger.debug('Null object received from database, businessId: ' + businessId);
			return callback(null, {});
		}
		//business = business.toObject();
		return callback(null, _.omit(business, ['_id', '__v']));
	});
}

moduleExports = {}
moduleExports.dbGetHotel = dbGetHotel;
moduleExports.dbGetGym = dbGetGym;
moduleExports.dbGetBar = dbGetBar;
moduleExports.dbGetBook = dbGetBook;
moduleExports.dbGetBusiness = dbGetBusiness;

module.exports = moduleExports;