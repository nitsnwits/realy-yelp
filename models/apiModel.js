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
//db.rest_sim.find( { $and: [ { key : "-xFO1E3OiDMmdqdjwUM_DA"}, {'val.1' :{$gt: 0.25}} ] } )

	env.Hotels.find( { $and: [ { key : hotelId}, {'val.1' :{$gt: 0}} ] } ).sort({ 'val.1' : -1}).limit(100).exec(function(error, hotels) {
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
	env.Gyms.find( { $and: [ { key : gymId}, {'val.1' :{$gt: 0}} ] } ).sort({ 'val.1' : -1}).limit(100).exec(function(error, gyms) {
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
	env.Bars.find( { $and: [ { key : barId}, {'val.1' :{$gt: 0}} ] } ).sort({ 'val.1' : -1}).limit(100).exec(function(error, bars) {
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
	env.Books.find( { $and: [ { key : bookId}, {'val.1' :{$gt: 0}} ] } ).sort({ 'val.1' : -1}).limit(100).exec(function(error, books) {
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