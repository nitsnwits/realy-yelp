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
			return callback(null, null);
		}
		hotels = hotels.toObject();
		//Return the information from database
		return callback(null, _.omit(hotels, ['_id', '__v']));
 	});
}

moduleExports = {}
moduleExports.dbGetHotel = dbGetHotel;

module.exports = moduleExports;