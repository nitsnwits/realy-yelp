/*
 *	Mongo db set up file for freedoor
 *
 */

var mongoose = require('mongoose')
	, schema = require('mongoose').Schema
;

// blank schema to make req/res schema less
var userSchema = new schema({}, { strict: false });
var businessSchema = new schema({}, { strict: false });

module.exports = function(app, env) {
	// mongoose gives default pool of 100 connections
	var mongoUrl = env.config.mongo.url;
	env.db = mongoose.connect(mongoUrl);
	env.Users = mongoose.model('Users', userSchema);
	env.Business = mongoose.model('Business', businessSchema);
}
