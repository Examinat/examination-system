var mongoose = require('mongoose');
require('../model/registrationModel');
var registrationModel = mongoose.model('registrationModel');
var randomstring = require('randomstring');
var fs = require('fs');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
var secretKey = 'SRCEukzwWJybZkUpHVdA5PtdkFvWPmddyUwtb2';
var path = require('path');
var adminAcc={fullname:'admin',email:'rak@admin.com',password:'rakesh',access:'admin'};

var makeSave = new registrationModel(adminAcc);

registrationModel.find(adminAcc,function(err,docs){
    if (err || docs.length==0) {
        makeSave.save(function(err) {
            if (!err){
                console.log('admin account created:');
            }
            else{
                console.log('admin account failed:');
            }
        });
    }
    else{
        console.log('admin account already present');
    }
});




exports.saveRegistration = function(req, res) {
    console.log(req.body);
    var makeSave = new registrationModel(req.body);

    makeSave.save(function(err) {
        if (!err){
            res.status(200).send('OK');
        }
        else{
            res.status(500).send('Internal error_1');
        }
    });
}
exports.checkUser = function(req, res) {
    console.log(req.body);
    //var checkUser = new registrationModel();
    registrationModel.find({'email': req.body.email, 'password': req.body.password},function(err,docs){
        if (err || docs.length==0) {
            console.log('can\'t find the user1');
            res.status(500).send('Internal error_1');
        }
        else{
            console.log(docs);
            res.status(200).send(docs);
        }
    });
}
exports.checkUserById = function(req, res) {
    console.log(req.body);
    //var checkUser = new registrationModel();
    
    registrationModel.find({'_id':req.body.id},function(err,docs){
        if (err || docs.length==0) {
            console.log('can\'t find the user2');
            res.status(500).send('Internal error_2');
        }
        else{
            console.log(docs);
            res.status(200).send(docs);
        }
    });
}