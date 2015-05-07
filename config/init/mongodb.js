/*
 *	Mongo db set up file for freedoor
 *
 */

var mongoose = require('mongoose')
	, schema = require('mongoose').Schema
;

// blank schema to make req/res schema less
var userSchema = new schema({}, { strict: false });
var hotelSchema = new schema({}, { strict: false });
var gymSchema = new schema({}, {strict: false});
var barSchema = new schema({}, {strict: false});
var bookSchema = new schema({}, {strict: false});
var businessSchema = new schema({}, {strict: false});

// gym bar book

module.exports = function(app, env) {
	// mongoose gives default pool of 100 connections
	var mongoUrl = env.config.mongo.url;
	env.db = mongoose.connect(mongoUrl);
	env.Users = mongoose.model('Users', userSchema);
	env.Hotels = mongoose.model('Hotels', hotelSchema, 'rest_sim');
	env.Gyms = mongoose.model('Gyms', gymSchema, 'gym_sim');
	env.Bars = mongoose.model('Bars', barSchema, 'bar_sim');
	env.Books = mongoose.model('Books', bookSchema, 'books_sim');
	env.Business = mongoose.model('Business', businessSchema, 'business_meta');
}
