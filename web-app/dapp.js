//github.com/IBM/hyperledger-fabric-evm-demo/blob/master/src/dapp.js
const Web3 = require('web3');
var contractAddress = '30a5c90d8593a94a89fdcb7a5e2aeb065f18b7af';
var provider = "http://localhost:5001";

var myContract;

function getContract() {
    console.log("Getting the Contract")

    var web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider(provider));
    web3.eth.defaultAccount = web3.eth.accounts[0];

    var address = contractAddress;

    console.log("Got address: " + address)

    var loyaltyABI = [
    	{
    		"constant": true,
    		"inputs": [
    			{
    				"name": "",
    				"type": "address"
    			}
    		],
    		"name": "members",
    		"outputs": [
    			{
    				"name": "memberAddress",
    				"type": "address"
    			},
    			{
    				"name": "firstName",
    				"type": "string"
    			},
    			{
    				"name": "lastName",
    				"type": "string"
    			},
    			{
    				"name": "email",
    				"type": "string"
    			},
    			{
    				"name": "points",
    				"type": "uint256"
    			},
    			{
    				"name": "isRegistered",
    				"type": "bool"
    			}
    		],
    		"payable": false,
    		"stateMutability": "view",
    		"type": "function"
    	},
    	{
    		"constant": true,
    		"inputs": [],
    		"name": "transactionsInfoLength",
    		"outputs": [
    			{
    				"name": "",
    				"type": "uint256"
    			}
    		],
    		"payable": false,
    		"stateMutability": "view",
    		"type": "function"
    	},
    	{
    		"constant": false,
    		"inputs": [
    			{
    				"name": "_firstName",
    				"type": "string"
    			},
    			{
    				"name": "_lastName",
    				"type": "string"
    			},
    			{
    				"name": "_email",
    				"type": "string"
    			}
    		],
    		"name": "registerMember",
    		"outputs": [],
    		"payable": false,
    		"stateMutability": "nonpayable",
    		"type": "function"
    	},
    	{
    		"constant": false,
    		"inputs": [
    			{
    				"name": "_points",
    				"type": "uint256"
    			},
    			{
    				"name": "_partnerAddress",
    				"type": "address"
    			}
    		],
    		"name": "usePoints",
    		"outputs": [],
    		"payable": false,
    		"stateMutability": "nonpayable",
    		"type": "function"
    	},
    	{
    		"constant": false,
    		"inputs": [
    			{
    				"name": "_points",
    				"type": "uint256"
    			},
    			{
    				"name": "_partnerAddress",
    				"type": "address"
    			}
    		],
    		"name": "earnPoints",
    		"outputs": [],
    		"payable": false,
    		"stateMutability": "nonpayable",
    		"type": "function"
    	},
    	{
    		"constant": true,
    		"inputs": [
    			{
    				"name": "",
    				"type": "uint256"
    			}
    		],
    		"name": "transactionsInfo",
    		"outputs": [
    			{
    				"name": "points",
    				"type": "uint256"
    			},
    			{
    				"name": "transactionType",
    				"type": "uint8"
    			},
    			{
    				"name": "memberAddress",
    				"type": "address"
    			},
    			{
    				"name": "partnerAddress",
    				"type": "address"
    			}
    		],
    		"payable": false,
    		"stateMutability": "view",
    		"type": "function"
    	},
    	{
    		"constant": true,
    		"inputs": [
    			{
    				"name": "",
    				"type": "address"
    			}
    		],
    		"name": "partners",
    		"outputs": [
    			{
    				"name": "partnerAddress",
    				"type": "address"
    			},
    			{
    				"name": "name",
    				"type": "string"
    			},
    			{
    				"name": "isRegistered",
    				"type": "bool"
    			}
    		],
    		"payable": false,
    		"stateMutability": "view",
    		"type": "function"
    	},
    	{
    		"constant": true,
    		"inputs": [
    			{
    				"name": "",
    				"type": "uint256"
    			}
    		],
    		"name": "partnersInfo",
    		"outputs": [
    			{
    				"name": "partnerAddress",
    				"type": "address"
    			},
    			{
    				"name": "name",
    				"type": "string"
    			},
    			{
    				"name": "isRegistered",
    				"type": "bool"
    			}
    		],
    		"payable": false,
    		"stateMutability": "view",
    		"type": "function"
    	},
    	{
    		"constant": true,
    		"inputs": [],
    		"name": "partnersInfoLength",
    		"outputs": [
    			{
    				"name": "",
    				"type": "uint256"
    			}
    		],
    		"payable": false,
    		"stateMutability": "view",
    		"type": "function"
    	},
    	{
    		"constant": false,
    		"inputs": [
    			{
    				"name": "_name",
    				"type": "string"
    			}
    		],
    		"name": "registerPartner",
    		"outputs": [],
    		"payable": false,
    		"stateMutability": "nonpayable",
    		"type": "function"
    	}
    ];
    var LoyaltyContract = web3.eth.contract(loyaltyABI);
    myContract = LoyaltyContract.at(address);
    return myContract;
}

function getAccountAddress() {
    console.log("Getting the Contract")

    var web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider(provider));

    //web3.eth.defaultAccount = '0x' + account;
    web3.eth.defaultAccount = web3.eth.accounts[0];

    //console.log("Account " + account)
    return web3.eth.defaultAccount;
}

//export module
module.exports = {

  registerMember: function (firstName, lastName, email) {
    try {
      var myContract = getContract();
      var response = myContract.registerMember(firstName, lastName, email);
      return response;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  registerPartner: function (name) {
    try {
      var myContract = getContract();
      var response = myContract.registerPartner(name);
      return response;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  memberData: function () {
    try {
      var myContract = getContract();
      var accountAddress = getAccountAddress();
      var memberData = myContract.members(accountAddress);

      if(memberData[5]) {
        return memberData;
      } else {
        throw new Error("Member not found")
      }

    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  partnersData: function (proxy) {
    try {
      var myContract = getContract();

      var partnersLength = myContract.partnersInfoLength();
      var partnersData = [];

      for (var i = 0; i < partnersLength; i++) {
        partnersData.push(myContract.partnersInfo(i));
      }

      return partnersData;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  transactionsData: function (proxy) {
    try {
      var myContract = getContract();

      var transactionsLength = myContract.transactionsInfoLength();
      var transactionsData = [];

      for (var i = 0; i < transactionsLength; i++) {
        transactionsData.push(myContract.transactionsInfo(i));
      }

      return transactionsData;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  earnPoints: function (points, partnerAddress, proxy) {
    try {
      var myContract = getContract();

      var response = myContract.earnPoints(points, partnerAddress);

      return response;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  usePoints: function (points, partnerAddress, proxy) {
    try {
      var myContract = getContract();
      var response = myContract.usePoints(points, partnerAddress);
      return response;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  partnerData: function (proxy) {
    try {
      var myContract = getContract();
      var accountAddress = getAccountAddress();
      var partnerData = myContract.partners(accountAddress);

      if(partnerData[2]) {
        return partnerData;
      } else {
        throw new Error("Partner not found")
      }
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  }

}
