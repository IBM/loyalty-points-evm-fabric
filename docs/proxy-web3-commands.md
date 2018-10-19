
# Setup Fab Proxy and using Web3

>**Note** This guide follows and is inspired from the steps provided in the example from fabric-chaincode-evm repository [EVM Smart Contracts - Using web3](https://github.com/hyperledger/fabric-chaincode-evm/blob/master/examples/EVM_Smart_Contracts.md#using-web3)


This guide assumes you have fabric network running using the `first-network` from `fabric-samples`, and evm chaincode installed on the peers.  We will be working with the `fabric-chaincode-evm` repo in our `GOPATH/src/github.com/hyperledger`.  We will now setup fab proxy which will allow us to deploy and execute our smart contract.


## Setting Fab Proxy

In a terminal, execute the following to set certain environment variables.

```
export FABPROXY_CONFIG=${GOPATH}/src/github.com/hyperledger/fabric-chaincode-evm/examples/first-network-sdk-config.yaml # Path to a compatible Fabric SDK Go config file
export FABPROXY_USER=User1 # User identity being used for the proxy (Matches the users names in the crypto-config directory specified in the config)
export FABPROXY_ORG=Org1  # Organization of the specified user
export FABPROXY_CHANNEL=mychannel # Channel to be used for the transactions
export FABPROXY_CCID=evmcc # ID of the EVM Chaincode deployed in your fabric network
export PORT=5000 # Port the proxy will listen on. If not provided default is 5000.
```

Navigate to our `fabric-chaincode-evm` cloned repo:
```
cd $GOPATH/src/github.com/hyperledger/fabric-chaincode-evm/
```
Run the following to build the fab proxy
```
go build -o fab3 ./fabproxy/cmd
```
You can then run the proxy:
```
./fab3
```

This will start fab proxy at `http://localhost:5000`

## Using web3

Next, we'll install web3 and use it for executing our smart contract. To install web3 run the following:
```
npm install web3@0.20.2
```

Now we'll enter node to set up our web3.
```
node
```
Assign Web3 library and use the fab proxy as provider
```
Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:5000'))
```
Check to see you account information
```
web3.eth.accounts
```
You should see something like:
  ```
  [ '0x2c045d4565e31cef1f6cd7368c3436a79f1cea4f' ]
  ```
Assign this account as defaultAccount
```
web3.eth.defaultAccount = web3.eth.accounts[0]
```

## Loyalty Points Contract

Now we are ready to deploy the LoyaltyPoints contract. We will assign the contract's ABI and byte code.  These can be generate through remix (http://remix.ethereum.org)

Assign loyalty abi and byte code
```
LoyaltyABI = [
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
]
```

Next we'll assign the really long byte code.  
```
LoyaltyByteCode = `608060405234801561001057600080fd5b50611c1e806100206000396000f3006080604052600436106100a4576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806308ae4b0c146100a957806309b569111461028257806349c81cc5146102ad5780634d11b26b146103a257806360bd2683146103ef578063674c70991461043c57806395c33652146104f8578063d5763aea146105f2578063e6a14a7c146106d6578063e7a96e0c14610701575b600080fd5b3480156100b557600080fd5b506100ea600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061076a565b604051808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200180602001806020018060200186815260200185151515158152602001848103845289818151815260200191508051906020019080838360005b83811015610174578082015181840152602081019050610159565b50505050905090810190601f1680156101a15780820380516001836020036101000a031916815260200191505b50848103835288818151815260200191508051906020019080838360005b838110156101da5780820151818401526020810190506101bf565b50505050905090810190601f1680156102075780820380516001836020036101000a031916815260200191505b50848103825287818151815260200191508051906020019080838360005b83811015610240578082015181840152602081019050610225565b50505050905090810190601f16801561026d5780820380516001836020036101000a031916815260200191505b50995050505050505050505060405180910390f35b34801561028e57600080fd5b5061029761099b565b6040518082815260200191505060405180910390f35b3480156102b957600080fd5b506103a0600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091929192905050506109a8565b005b3480156103ae57600080fd5b506103ed60048036038101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610cd3565b005b3480156103fb57600080fd5b5061043a60048036038101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061114b565b005b34801561044857600080fd5b506104676004803603810190808035906020019092919050505061150b565b6040518085815260200184600181111561047d57fe5b60ff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200194505050505060405180910390f35b34801561050457600080fd5b50610539600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611597565b604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018060200183151515158152602001828103825284818151815260200191508051906020019080838360005b838110156105b557808201518184015260208101905061059a565b50505050905090810190601f1680156105e25780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b3480156105fe57600080fd5b5061061d60048036038101908080359060200190929190505050611686565b604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018060200183151515158152602001828103825284818151815260200191508051906020019080838360005b8381101561069957808201518184015260208101905061067e565b50505050905090810190601f1680156106c65780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b3480156106e257600080fd5b506106eb611784565b6040518082815260200191505060405180910390f35b34801561070d57600080fd5b50610768600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050611791565b005b60006020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806001018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561083c5780601f106108115761010080835404028352916020019161083c565b820191906000526020600020905b81548152906001019060200180831161081f57829003601f168201915b505050505090806002018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108da5780601f106108af576101008083540402835291602001916108da565b820191906000526020600020905b8154815290600101906020018083116108bd57829003601f168201915b505050505090806003018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109785780601f1061094d57610100808354040283529160200191610978565b820191906000526020600020905b81548152906001019060200180831161095b57829003601f168201915b5050505050908060040154908060050160009054906101000a900460ff16905086565b6000600380549050905090565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060050160009054906101000a900460ff16151515610a92576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001807f4163636f756e7420616c72656164792072656769737465726564206173204d6581526020017f6d6265720000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900460ff16151515610b7d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260258152602001807f4163636f756e7420616c7265616479207265676973746572656420617320506181526020017f72746e657200000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b60c0604051908101604052803373ffffffffffffffffffffffffffffffffffffffff16815260200184815260200183815260200182815260200160008152602001600115158152506000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001019080519060200190610c66929190611b4d565b506040820151816002019080519060200190610c83929190611b4d565b506060820151816003019080519060200190610ca0929190611b4d565b506080820151816004015560a08201518160050160006101000a81548160ff021916908315150217905550905050505050565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060050160009054906101000a900460ff161515610d96576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f53656e646572206e6f742072656769737465726564206173204d656d6265720081525060200191505060405180910390fd5b600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900460ff161515610e5a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f506172746e65722061646472657373206e6f7420666f756e640000000000000081525060200191505060405180910390fd5b816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206004015410151515610f13576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260138152602001807f496e73756666696369656e7420706f696e74730000000000000000000000000081525060200191505060405180910390fd5b816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060040154036000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600401819055506003608060405190810160405280848152602001600180811115610fbc57fe5b81526020016000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff16815250908060018154018082558091505090600182039060005260206000209060030201600090919290919091506000820151816000015560208201518160010160006101000a81548160ff021916908360018111156110b157fe5b021790555060408201518160010160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060608201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050505050565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060050160009054906101000a900460ff16151561120e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f53656e646572206e6f742072656769737465726564206173204d656d6265720081525060200191505060405180910390fd5b600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900460ff1615156112d2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f506172746e65722061646472657373206e6f7420666f756e640000000000000081525060200191505060405180910390fd5b816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060040154016000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206004018190555060036080604051908101604052808481526020016000600181111561137c57fe5b81526020016000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff16815250908060018154018082558091505090600182039060005260206000209060030201600090919290919091506000820151816000015560208201518160010160006101000a81548160ff0219169083600181111561147157fe5b021790555060408201518160010160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060608201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050505050565b60038181548110151561151a57fe5b90600052602060002090600302016000915090508060000154908060010160009054906101000a900460ff16908060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905084565b60016020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806001018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156116695780601f1061163e57610100808354040283529160200191611669565b820191906000526020600020905b81548152906001019060200180831161164c57829003601f168201915b5050505050908060020160009054906101000a900460ff16905083565b60028181548110151561169557fe5b90600052602060002090600302016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806001018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156117675780601f1061173c57610100808354040283529160200191611767565b820191906000526020600020905b81548152906001019060200180831161174a57829003601f168201915b5050505050908060020160009054906101000a900460ff16905083565b6000600280549050905090565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060050160009054906101000a900460ff1615151561187b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001807f4163636f756e7420616c72656164792072656769737465726564206173204d6581526020017f6d6265720000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900460ff16151515611966576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260258152602001807f4163636f756e7420616c7265616479207265676973746572656420617320506181526020017f72746e657200000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b6060604051908101604052803373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200160011515815250600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001019080519060200190611a3d929190611b4d565b5060408201518160020160006101000a81548160ff02191690831515021790555090505060026060604051908101604052803373ffffffffffffffffffffffffffffffffffffffff168152602001838152602001600115158152509080600181540180825580915050906001820390600052602060002090600302016000909192909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001019080519060200190611b26929190611b4d565b5060408201518160020160006101000a81548160ff02191690831515021790555050505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10611b8e57805160ff1916838001178555611bbc565b82800160010185558215611bbc579182015b82811115611bbb578251825591602001919060010190611ba0565b5b509050611bc99190611bcd565b5090565b611bef91905b80821115611beb576000816000905550600101611bd3565b5090565b905600a165627a7a7230582010d8bf42da8665874197dade1ae8eb0a0bd0296a727494b56b95171658fe8d500029`
```
If you get issues, then break up the bytecode into variables and then concatenate those variables to store it under a single variable to be used next.

Assign loyalty contract and deployed contract
```
LoyaltyContract = web3.eth.contract(LoyaltyABI)
```

```
deployedContract = LoyaltyContract.new([], { data: LoyaltyByteCode })
```


Next get `myContract` as the deployed contract.  You can run as single command:
```
myContract = LoyaltyContract.at(web3.eth.getTransactionReceipt(deployedContract.transactionHash).ContractAddress)
```
or if any issues, then run one at a time, by finding the `ContractAddress` from the `transactionHash` of the deployedContract
```
web3.eth.getTransactionReceipt(..transactionHash..)
>web3.eth.getTransactionReceipt('6001c5fab58dbeb1efc990ce20a232522f5d1ea04bf8716357209a4d7e61e1e3')

myContract = LoyaltyContract.at(..ContractAddress..)
>myContract = LoyaltyContract.at('afc802a0cd407f826a782b448a9a5c8008114d3d')
```

This contract address will be used to interact with your contract through the application. At this point, you can move to [running the application](./run-application.md) and interact with the contract using the proxy and contract address.

## Interact with contract

Now we can register our account from the proxy as a loyalty points member on the network

### Partner

* Now we are ready to register this proxy account as Partner on the network:
  ```
  myContract.registerPartner("United", { from: web3.eth.accounts[0] })
  ```
  output:
  ```
  'b7f87cbd7b0f049ed89a1640f993ceaaace841309be92ece230bd5d24b747004'
  ```

* View partner's account:
  ```
  myContract.partners(web3.eth.accounts[0])
  ```
  output:
  ```
  [ '0xcbaeef47b719699a175117133de02f2af5085906', 'United', true ]
  ```

* Check partner's data on the network
  ```
  myContract.partnersInfo(0)
  ```
  output:
  ```
  [ '0xcbaeef47b719699a175117133de02f2af5085906', 'United', true ]
  ```

* the partnersInfo length should be 1 for for partner added on the network
  ```
  myContract.partnersInfoLength()
  ```
  output:
  ```
  BigNumber { s: 1, e: 0, c: [ 1 ] }
  ```


Now in order lets create a member account using a second proxy from Org2.

## Proxy Org2

First, lets create a new config yaml file for the proxy.  Duplicate the `first-network-sdk-config.yaml` present here `${GOPATH}/src/github.com/hyperledger/fabric-chaincode-evm/examples/`, as `first-network-sdk-config-org2.yaml`. Update the organization to be `org2`.

In a new terminal window, then provide environment variables for the second proxy with a new port number:
```
export FABPROXY_CONFIG=${GOPATH}/src/github.com/hyperledger/fabric-chaincode-evm/examples/first-network-sdk-config-org2.yaml # Path to a compatible Fabric SDK Go config file
export FABPROXY_USER=User1 # User identity being used for the proxy (Matches the users names in the crypto-config directory specified in the config)
export FABPROXY_ORG=Org2  # Organization of the specified user
export FABPROXY_CHANNEL=mychannel # Channel to be used for the transactions
export FABPROXY_CCID=evmcc # ID of the EVM Chaincode deployed in your fabric network
export PORT=5001 # Port the proxy will listen on. If not provided default is 5000.
```

Navigate to the `fabric-chaincode-evm` cloned repo:
```
cd $GOPATH/src/github.com/hyperledger/fabric-chaincode-evm/
```
Run the following to build the fab proxy
```
go build -o fab3-partner ./fabproxy/cmd
```
You can then run the proxy:
```
./fab3-partner
```

This will start fab proxy at `http://localhost:5001`


In a new terminal window, we'll set up our web3 to use this proxy.  Run the node console
```
node
```

In this console, we should see a new account using our second proxy port.
```
Web3 = require('web3')

web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:5001'))

web3.eth.accounts

web3.eth.defaultAccount = web3.eth.accounts[0]
```

Here again define the Loyalty ABI, and use it to define `LoyaltyContract`
```
LoyaltyContract = web3.eth.contract(LoyaltyABI)
```

Setup `myContract` with the deployed contract address from first proxy like the command below but replacing the contract address with your contract address.
```
myContract = LoyaltyContract.at('63500ee8b1303edb6a7ec8fcd40067ccd33836dd')
```

### Member

* We can use this proxy to register account as loyalty points member by passing an account number, first name, last name and email as args
  ```
  myContract.registerMember("Jerry", "Doe", "jerry@doe.com", { from: web3.eth.accounts[0] })
  ```
  output would be similar hash:
  ```
  'a9510d512703f1af5ef8b4f22b2c4eca35e199540b37e6dc143b30092bbd6479'
  ```

* View the member data stored for the account
  ```
  myContract.members(web3.eth.accounts[0])
  ```
  output:
  ```
  [ '0x61684d4039667210c9c5298b9ae29ba350d65278',
  'Jerry',
  'Doe',
  'jerry@doe.com',
  BigNumber { s: 1, e: 0, c: [ 0 ] },
  true ]

  ```

* earn `200` points from the Partner created on the second proxy using their account address
  ```
  myContract.earnPoints(200, '0xcbaeef47b719699a175117133de02f2af5085906', { from: web3.eth.accounts[0] })
  ```
  output would be a transaction hash:
  ```
  '799dbfbda90e1941c115c57372c1b6bca09eb032229a29f66eb69716f7e4c04b'
  ```

* view the updated member's account where points should be `200` now
  ```
  myContract.members(web3.eth.accounts[0])
  ```
  output:
  ```
  [ '0x61684d4039667210c9c5298b9ae29ba350d65278',
  'Jerry',
  'Doe',
  'jerry@doe.com',
  BigNumber { s: 1, e: 2, c: [ 200 ] },
  true ]
  ```

* view the transaction stored as the first instance of the array
  ```
  myContract.transactionsInfo(0)
  ```
  output:
  ```
  [ BigNumber { s: 1, e: 2, c: [ 200 ] },
  BigNumber { s: 1, e: 0, c: [ 0 ] },
  '0x61684d4039667210c9c5298b9ae29ba350d65278',
  '0xcbaeef47b719699a175117133de02f2af5085906' ]
  ```

* check transaction length, which should be equal to 1
  ```  
  myContract.transactionsInfoLength()
  ```
  output:
  ```
  BigNumber { s: 1, e: 0, c: [ 1 ] }
  ```

* use `50` points from the Partner created on the second proxy
  ```  
  myContract.usePoints(50, '0xcbaeef47b719699a175117133de02f2af5085906', { from: web3.eth.accounts[0] })
  ```
  output would be a transaction hash:
  ```
  'db88a42b54880278bad43ed284310f72091970da3b3e4ca119881fe5186f53fe'
  ```

* view the updated member's account where points should be updated to `150` now
  ```
  myContract.members(web3.eth.accounts[0])
  ```
  output:
  ```
  [ '0x61684d4039667210c9c5298b9ae29ba350d65278',
  'Jerry',
  'Doe',
  'jerry@doe.com',
  BigNumber { s: 1, e: 2, c: [ 150 ] },
  true ]
  ```

* view the second transaction stored
  ```
  myContract.transactionsInfo(1)
  ```
  output:
  ```
  [ BigNumber { s: 1, e: 1, c: [ 50 ] },
  BigNumber { s: 1, e: 0, c: [ 1 ] },
  '0x61684d4039667210c9c5298b9ae29ba350d65278',
  '0xcbaeef47b719699a175117133de02f2af5085906' ]
  ```

* we should see transactions length to be `2` now
  ```
  myContract.transactionsInfoLength()
  ```
  output:
  ```
  BigNumber { s: 1, e: 0, c: [ 2 ] }
  ```
