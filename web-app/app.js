'use strict';

//get libraries
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');

//create express web-app
const app = express();
const router = express.Router();

//get the libraries to call
var dapp = require('./dapp.js');
var validate = require('./validate.js');

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
  var firstName = req.body.firstname;
  var lastName = req.body.lastname;
  var email = req.body.email;

  //print variables
  console.log('Using param - firstname: ' + firstName + ' lastname: ' + lastName + ' email: ' + email);

  var validateResponse = validate.validateMemberRegistration(firstName, lastName, email);

  if (validateResponse.error != null) {
    res.json({
      error: validateResponse.error
    });
  } else {

    var response = dapp.registerMember(firstName, lastName, email);

    if (response.error != null) {
      res.json({
        error: response.error
      });
    } else {
      res.json({
        success: response
      });
    }
  }

});

//post call to register partner on the network
app.post('/api/registerPartner', function(req, res) {

  //declare variables to retrieve from request
  var name = req.body.name;

  //print variables
  console.log('Using param - name: ' + name );

  var validateResponse = validate.validatePartnerRegistration(name);

  if (validateResponse.error != null) {
    res.json({
      error: validateResponse.error
    });
  } else {

    var response = dapp.registerPartner(name);

    if (response.error != null) {
      res.json({
        error: response.error
      });
    } else {
      res.json({
        success: response
      });
    }
  }

});


//post call to retrieve member data, transactions data and partners
app.get('/api/memberData', function(req, res) {

  //declare return object
  var returnData = {};

  //get member's data
  var memberData = dapp.memberData();
  if (memberData.error != null) {
    res.json({
      error: memberData.error
    });
  } else {
    returnData.memberData = memberData;
  }

  var partnersData = dapp.partnersData();
  if (partnersData.error != null) {
    res.json({
      error: partnersData.error
    });
  } else {
    returnData.partnersData = partnersData;
  }

  var transactionsData = dapp.transactionsData();
  if (transactionsData.error != null) {
    res.json({
      error: transactionsData.error
    });
  } else {
    returnData.transactionsData = transactionsData;
  }

  res.json(returnData);

});

//post call to perform earnPoints transaction on the network
app.post('/api/earnPoints', function(req, res) {

  //declare variables to retrieve from request
  var points = req.body.points;
  var partnerAddress = req.body.partneraddress;

  //print variables
  console.log('Using param - points: ' + points + ' partnerAddress: ' + partnerAddress);

  var validateResponse = validate.validatePoints(points);

  if (validateResponse.error != null) {
    res.json({
      error: validateResponse.error
    });
  } else {

    var response = dapp.earnPoints(points, partnerAddress);

    if (response.error != null) {
      res.json({
        error: response.error
      });
    } else {
      res.json({
        success: response
      });
    }
  }

});

//post call to perform UsePoints transaction on the network
app.post('/api/usePoints', function(req, res) {

  //declare variables to retrieve from request
  var points = req.body.points;
  var partnerAddress = req.body.partneraddress;

  //print variables
  console.log('Using param - points: ' + points + ' partnerAddress: ' + partnerAddress);

  var validateResponse = validate.validatePoints(points);

  if (validateResponse.error != null) {
    res.json({
      error: validateResponse.error
    });
  } else {

    var response = dapp.usePoints(points, partnerAddress);

    if (response.error != null) {
      res.json({
        error: response.error
      });
    } else {
      res.json({
        success: response
      });
    }
  }

});


//post call to retrieve partner data and transactions data from the network
app.get('/api/partnerData', function(req, res) {

  //declare return object
  var returnData = {};

  //get member's data
  var partnerData = dapp.partnerData();
  if (partnerData.error != null) {
    res.json({
      error: partnerData.error
    });
  } else {
    returnData.partnerData = partnerData;
  }

  var transactionsData = dapp.transactionsData();
  if (transactionsData.error != null) {
    res.json({
      error: transactionsData.error
    });
  } else {
    returnData.transactionsData = transactionsData;
  }

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
