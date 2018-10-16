'use strict';

//get libraries
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path')

//create express web-app
const app = express();
const router = express.Router();

//get the libraries to call
var dapp = require('./dapp.js');

//bootstrap application settings
app.use(express.static('./public'));
app.use('/scripts', express.static(path.join(__dirname, '/public/scripts')));
app.use(bodyParser.json());

//get home page
app.get('/home', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

//get member page
app.get('/member', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/member.html'));
});

//get member registration page
app.get('/registerMember', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/registerMember.html'));
});

//get partner page
app.get('/partner', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/partner.html'));
});

//get partner registration page
app.get('/registerPartner', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/registerPartner.html'));
});

//get about page
app.get('/about', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/about.html'));
});


//post call to register member on the network
app.post('/api/registerMember', function(req, res) {

  console.log('registerMember');

  //declare variables to retrieve from request
  var accountNumber = req.body.accountnumber;
  var proxy = req.body.proxy;
  var firstName = req.body.firstname;
  var lastName = req.body.lastname;
  var email = req.body.email;
  var contractAddress = req.body.contractaddress;

  //print variables
  console.log('Using param - firstname: ' + firstName + ' lastname: ' + lastName + ' email: ' + email + ' accountNumber: ' + accountNumber + ' proxy: ' + proxy + ' contractAddress: ' + contractAddress);

  var response = dapp.registerMember(accountNumber, firstName, lastName, email, proxy, contractAddress);

  res.json({
                success: response
              });

});

//post call to register partner on the network
app.post('/api/registerPartner', function(req, res) {

  //declare variables to retrieve from request
  var name = req.body.name;
  var partnerId = req.body.partnerid;
  var proxy = req.body.proxy;
  var contractAddress = req.body.contractaddress;

  //print variables
  console.log('Using param - name: ' + name + ' partnerId: ' + partnerId + ' proxy: ' + proxy + ' contractAddress: ' + contractAddress);

  var response = dapp.registerPartner(partnerId, name, proxy, contractAddress);

  res.json({
                success: response
              });
});


//post call to retrieve member data, transactions data and partners
app.post('/api/memberData', function(req, res) {

  var proxy = req.body.proxy;
  var contractAddress = req.body.contractaddress;

  //declare return object
  var returnData = {};

  //get member's data
  returnData.memberData = dapp.memberData(proxy, contractAddress);
  returnData.partnersData = dapp.partnersData(proxy, contractAddress);
  returnData.transactionsData = dapp.transactionsData(proxy, contractAddress);
  console.log("app.js returnData");
  console.log(returnData);

  //return returnData
  res.json(returnData);

});

//post call to perform earnPoints transaction on the network
app.post('/api/earnPoints', function(req, res) {

  //declare variables to retrieve from request
  var points = req.body.points;
  var partnerId = req.body.partnerid;
  var proxy = req.body.proxy;
  var contractAddress = req.body.contractaddress;

  //print variables
  console.log('Using param - points: ' + points + ' partnerId: ' + partnerId + ' proxy: ' + proxy + ' contractAddress: ' + contractAddress);

  var response = dapp.earnPoints(points, partnerId, proxy, contractAddress);

  res.json({
                success: response
              });
});

//post call to perform UsePoints transaction on the network
app.post('/api/usePoints', function(req, res) {

  //declare variables to retrieve from request
  var points = req.body.points;
  var partnerId = req.body.partnerid;
  var proxy = req.body.proxy;
  var contractAddress = req.body.contractaddress;

  //print variables
  console.log('Using param - points: ' + points + ' partnerId: ' + partnerId + ' proxy: ' + proxy + ' contractAddress: ' + contractAddress);

  var response = dapp.usePoints(points, partnerId, proxy, contractAddress);

  res.json({
                success: response
              });

});


//post call to retrieve partner data and transactions data from the network
app.post('/api/partnerData', function(req, res) {

  var proxy = req.body.proxy;
  var contractAddress = req.body.contractaddress;

  //declare return object
  var returnData = {};

  //get member's data
  returnData.partnerData = dapp.partnerData(proxy, contractAddress);
  returnData.transactionsData = dapp.transactionsData(proxy, contractAddress);
  console.log("app.js returnData");
  console.log(returnData);

  //return returnData
  res.json(returnData);
});

//declare port
var port = process.env.PORT || 8000;
if (process.env.VCAP_APPLICATION) {
  port = process.env.PORT;
}

//run app on port
app.listen(port, function() {
  console.log('app running on port: %d', port);
});
