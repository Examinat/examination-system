var mongoose = require('mongoose');
require('../model/registrationModel');
var registrationModel = mongoose.model('registrationModel');
var randomstring = require('randomstring');
var fs = require('fs');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
var secretKey = 'SRCEukzwWJybZkUpHVdA5PtdkFvWPmddyUwtb2';
var path = require('path');

exports.saveRegistration = function(req, res){
	
}