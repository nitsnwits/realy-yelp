/*
 statically create users using yelp dataset
 */

var env = require("../config/environment")
var validator = require('validator');
var _ = require('underscore');
var logger = env.logger;
var async = require('async');
var userModel = require('../models/userModel');


var baseUser1 = {
  "first_name" : "Neeraj",
  "last_name" : "Sharma",
  "email" : "nitsnwits@gmail.com",
  "password" : "password",
  "password_confirmation" : "password",
  "userId": "1"
}

var baseUser2 = {
  "first_name" : "Dhruv",
  "last_name" : "Sojitra",
  "email" : "sojitradhruv2008@gmail.com",
  "password" : "password",
  "password_confirmation" : "password",
  "userId": "2"
}

var baseUser3 = {
  "first_name" : "Rutul",
  "last_name" : "Amin",
  "email" : "rutul591@gmail.com",
  "password" : "password",
  "password_confirmation" : "password",
  "userId": "3"
}

function processUserArray(userObj) {
  var responseArray = [];
  function extractBusiness(elem, index, array) {
    responseArray.push(elem.business_id);
  }
  userObj.forEach(extractBusiness);
  return responseArray;
}



module.exports.createUser = function(req, res) {
  // wipe out users collection first:
  userModel.removeUsers(function(error, numRemoved) {
    if (error) {
      return res.sendStatus(500);
    }

    // run-time processing
    var user1 = require('../assets/user11.json');
    var user2 = require('../assets/user12.json');
    var user3 = require('../assets/user13.json');
    var user1businesses = processUserArray(user1);
    var user2businesses = processUserArray(user2);
    var user3businesses = processUserArray(user3);

    var newUser1 = _.extend(baseUser1, {businesses: user1businesses});
    var newUser2 = _.extend(baseUser2, {businesses: user2businesses});
    var newUser3 = _.extend(baseUser3, {businesses: user3businesses});
    var usersArray = [];

    function createOneUser(userObj, cb) {
      userModel.dbCreateUser(userObj, function(error, newUser) {
        if(error) {
          logger.log('Error from database in POST user: ' + error);
          return cb(err);
        }
        if (validator.isNull(newUser)) {
          logger.log('Null object received from database in POST user.');
          return cb(err);
        }
        usersArray.push(newUser);
        cb(null, null);
      });
    }

    async.each([newUser1, newUser2, newUser3], createOneUser, function(err) {
      if (err) {
        return res.render('Errorpage');
      }
      return res.status(200).send(usersArray);
    });

  });

}