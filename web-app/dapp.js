//import Web3 from "web3";
const Web3 = require('web3');

var myContract;
var provider; // get from app i.e "http://localhost:5001";
var contractAddress; // get from app i.e "0d1a55141966923bb21388aa8233b5d3be901b9e";


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
    				"name": "accountNumber",
    				"type": "uint256"
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
    				"name": "_accountNumber",
    				"type": "uint256"
    			},
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
    				"name": "_partnerId",
    				"type": "uint256"
    			}
    		],
    		"name": "usePoints",
    		"outputs": [],
    		"payable": false,
    		"stateMutability": "nonpayable",
    		"type": "function"
    	},
    	{
    		"constant": true,
    		"inputs": [],
    		"name": "transactionsLength",
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
    				"name": "id",
    				"type": "uint256"
    			},
    			{
    				"name": "name",
    				"type": "string"
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
    		"name": "transactions",
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
    				"name": "memberAccountNumber",
    				"type": "uint256"
    			},
    			{
    				"name": "partnerId",
    				"type": "uint256"
    			}
    		],
    		"payable": false,
    		"stateMutability": "view",
    		"type": "function"
    	},
    	{
    		"constant": true,
    		"inputs": [],
    		"name": "partnerInfosLength",
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
    				"name": "_id",
    				"type": "uint256"
    			},
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
    				"name": "id",
    				"type": "uint256"
    			},
    			{
    				"name": "name",
    				"type": "string"
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
    				"name": "_points",
    				"type": "uint256"
    			},
    			{
    				"name": "_partnerId",
    				"type": "uint256"
    			}
    		],
    		"name": "earnPoints",
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

  registerMember: function (accountNumber, firstName, lastName, email, proxy, contractAddressApp) {
  //export function registerMember(accountNumber, name) {

      console.log("register member from dapp");
      provider = proxy;
      contractAddress = contractAddressApp;
      var myContract = getContract();
      myContract.registerMember(accountNumber, firstName, lastName, email);

  },

  registerPartner: function (partnerId, name, proxy, contractAddressApp) {
  //export function registerMember(accountNumber, name) {

      console.log("register partner from dapp");
      provider = proxy;
      contractAddress = contractAddressApp;
      var myContract = getContract();
      myContract.registerPartner(partnerId, name);

  },

  memberData: function (proxy, contractAddressApp) {
      provider = proxy;
      contractAddress = contractAddressApp;
      var myContract = getContract();
      var accountAddress = getAccountAddress();
      var memberData = myContract.members(accountAddress);
      //console.log(memberData);
      return memberData;
  },

  partnersData: function (proxy, contractAddressApp) {
      provider = proxy;
      contractAddress = contractAddressApp;
      var myContract = getContract();

      var partnersLength = myContract.partnerInfosLength();
      var partnersData = [];

      for (var i = 0; i < partnersLength; i++) {
        partnersData.push(myContract.partnersInfo(i));
      }

      console.log('partnersData')
      console.log(partnersData);

      return partnersData;
  },

  transactionsData: function (proxy, contractAddressApp) {
      provider = proxy;
      var myContract = getContract();
      contractAddress = contractAddressApp;

      var transactionsLength = myContract.transactionsLength();
      var transactionsData = [];

      for (var i = 0; i < transactionsLength; i++) {
        transactionsData.push(myContract.transactions(i));
      }

      console.log('transactionsData')
      console.log(transactionsData);

      return transactionsData;
  },

  earnPoints: function (points, partnerId, proxy, contractAddressApp) {
      provider = proxy;
      var myContract = getContract();
      contractAddress = contractAddressApp;

      var response = myContract.earnPoints(points, partnerId);

      console.log("earnPoints response");
      console.log(response);
      return response;
  },

  usePoints: function (points, partnerId, proxy, contractAddressApp) {
      provider = proxy;
      contractAddress = contractAddressApp;

      var myContract = getContract();

      var response = myContract.usePoints(points, partnerId);

      console.log("usePoints response");
      console.log(response);
      return response;
  },

  partnerData: function (proxy, contractAddressApp) {
      provider = proxy;
      contractAddress = contractAddressApp;

      var myContract = getContract();
      var accountAddress = getAccountAddress();
      var partnerData = myContract.partners(accountAddress);

      return partnerData;
  }

}
