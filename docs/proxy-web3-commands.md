
# Setup Fab Proxy and using Web3

>**Note** This guide follows and is inspired from the steps provided in the example for fabric-chaincode-evm repository [EVM Smart Contracts - Using web3](https://github.com/hyperledger/fabric-chaincode-evm/blob/master/examples/EVM_Smart_Contracts.md#using-web3)


This guide assumes you have fabric network running using the `first-network` from `fabric-samples`, and evm chaincode installed on the peers.  We will be working with the `fabric-chaincode-evm` repo in our `GOPATH/src/github.com/hyperledger path`.  We will now setup fab proxy which will allow us to deploy and execute our smart contract.


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
]
```

Next we'll assign the really long byte code.  
```
LoyaltyByteCode = `608060405234801561001057600080fd5b50610fbf806100206000396000f3006080604052600436106100a4576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806308ae4b0c146100a95780632f6d1fb31461024b5780634c81c28f1461034a5780638c32a0d31461038157806395c33652146103ac5780639ace38c21461046f5780639c4c17c1146104d3578063c2971e9a146104fe578063d5763aea14610571578063e44da3d01461061e575b600080fd5b3480156100b557600080fd5b506100ea600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610655565b60405180868152602001806020018060200180602001858152602001848103845288818151815260200191508051906020019080838360005b8381101561013e578082015181840152602081019050610123565b50505050905090810190601f16801561016b5780820380516001836020036101000a031916815260200191505b50848103835287818151815260200191508051906020019080838360005b838110156101a4578082015181840152602081019050610189565b50505050905090810190601f1680156101d15780820380516001836020036101000a031916815260200191505b50848103825286818151815260200191508051906020019080838360005b8381101561020a5780820151818401526020810190506101ef565b50505050905090810190601f1680156102375780820380516001836020036101000a031916815260200191505b509850505050505050505060405180910390f35b34801561025757600080fd5b5061034860048036038101908080359060200190929190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610853565b005b34801561035657600080fd5b5061037f600480360381019080803590602001909291908035906020019092919050505061092e565b005b34801561038d57600080fd5b50610396610aa0565b6040518082815260200191505060405180910390f35b3480156103b857600080fd5b506103ed600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610aad565b6040518083815260200180602001828103825283818151815260200191508051906020019080838360005b83811015610433578082015181840152602081019050610418565b50505050905090810190601f1680156104605780820380516001836020036101000a031916815260200191505b50935050505060405180910390f35b34801561047b57600080fd5b5061049a60048036038101908080359060200190929190505050610b69565b604051808581526020018460018111156104b057fe5b60ff16815260200183815260200182815260200194505050505060405180910390f35b3480156104df57600080fd5b506104e8610bb5565b6040518082815260200191505060405180910390f35b34801561050a57600080fd5b5061056f60048036038101908080359060200190929190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610bc2565b005b34801561057d57600080fd5b5061059c60048036038101908080359060200190929190505050610cb0565b6040518083815260200180602001828103825283818151815260200191508051906020019080838360005b838110156105e25780820151818401526020810190506105c7565b50505050905090810190601f16801561060f5780820380516001836020036101000a031916815260200191505b50935050505060405180910390f35b34801561062a57600080fd5b506106536004803603810190808035906020019092919080359060200190929190505050610d7b565b005b6000602052806000526040600020600091509050806000015490806001018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156107075780601f106106dc57610100808354040283529160200191610707565b820191906000526020600020905b8154815290600101906020018083116106ea57829003601f168201915b505050505090806002018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156107a55780601f1061077a576101008083540402835291602001916107a5565b820191906000526020600020905b81548152906001019060200180831161078857829003601f168201915b505050505090806003018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108435780601f1061081857610100808354040283529160200191610843565b820191906000526020600020905b81548152906001019060200180831161082657829003601f168201915b5050505050908060040154905085565b60a06040519081016040528085815260200184815260200183815260200182815260200160008152506000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000015560208201518160010190805190602001906108e0929190610eee565b5060408201518160020190805190602001906108fd929190610eee565b50606082015181600301908051906020019061091a929190610eee565b506080820151816004015590505050505050565b816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060040154036000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206004018190555060036080604051908101604052808481526020016001808111156109d757fe5b81526020016000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154815260200183815250908060018154018082558091505090600182039060005260206000209060040201600090919290919091506000820151816000015560208201518160010160006101000a81548160ff02191690836001811115610a8057fe5b021790555060408201518160020155606082015181600301555050505050565b6000600380549050905090565b6001602052806000526040600020600091509050806000015490806001018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610b5f5780601f10610b3457610100808354040283529160200191610b5f565b820191906000526020600020905b815481529060010190602001808311610b4257829003601f168201915b5050505050905082565b600381815481101515610b7857fe5b90600052602060002090600402016000915090508060000154908060010160009054906101000a900460ff16908060020154908060030154905084565b6000600280549050905090565b604080519081016040528083815260200182815250600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082015181600001556020820151816001019080519060200190610c3c929190610eee565b50905050600260408051908101604052808481526020018381525090806001815401808255809150509060018203906000526020600020906002020160009091929091909150600082015181600001556020820151816001019080519060200190610ca8929190610eee565b505050505050565b600281815481101515610cbf57fe5b9060005260206000209060020201600091509050806000015490806001018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610d715780601f10610d4657610100808354040283529160200191610d71565b820191906000526020600020905b815481529060010190602001808311610d5457829003601f168201915b5050505050905082565b816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060040154016000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060040181905550600360806040519081016040528084815260200160006001811115610e2557fe5b81526020016000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154815260200183815250908060018154018082558091505090600182039060005260206000209060040201600090919290919091506000820151816000015560208201518160010160006101000a81548160ff02191690836001811115610ece57fe5b021790555060408201518160020155606082015181600301555050505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610f2f57805160ff1916838001178555610f5d565b82800160010185558215610f5d579182015b82811115610f5c578251825591602001919060010190610f41565b5b509050610f6a9190610f6e565b5090565b610f9091905b80821115610f8c576000816000905550600101610f74565b5090565b905600a165627a7a72305820fd3918f3884cd2146e5592323bc63748044ee3c4999dcf0226df23e84ed907be0029`
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
>web3.eth.getTransactionReceipt('106b0cba26bbb08719313d713d969bf5d9f8a7fed55ee65db98443b8bf69a2af')

myContract = LoyaltyContract.at(..ContractAddress..)
>myContract = LoyaltyContract.at('0d1a55141966923bb21388aa8233b5d3be901b9e')
```

This contract address will be used to interact with your contract through the application. At this point, you can move to [running the application](./run-application.md) and interact with the contract using the proxy and contract address.

## Interact with contract

Now we can register our account from the proxy as a loyalty points member on the network

### Member

* Register account as loyalty points member and passing an account number, first name, last name and email as args
  ```
  myContract.registerMember(111111, "Jerry", "Doe", "jerry@doe.com", { from: web3.eth.accounts[0] })
  myContract.members(web3.eth.accounts[0])
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
  [ BigNumber { s: 1, e: 5, c: [ 111111 ] },
    'Jerry',
    'Doe',
    'jerry@doe.com',
    BigNumber { s: 1, e: 0, c: [ 0 ] } ]
  ```

Now in order to earn points from a Partner, lets create a partner using a second proxy from Org2.

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
myContract = LoyaltyContract.at('0d1a55141966923bb21388aa8233b5d3be901b9e')
```

#### Partner

* Now we are ready to register this proxy account as Partner on the network:
  ```
  myContract.registerPartner(100, "United", { from: web3.eth.accounts[0] })
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
  [ { [String: '100'] s: 1, e: 2, c: [ 100 ] }, 'United' ]
  ```

* Check partner's data on the network
  ```
  myContract.partnersInfo.call(0)
  ```
  output:
  ```
  [ { [String: '100'] s: 1, e: 2, c: [ 100 ] }, 'United' ]
  ```

* the partnersInfo length should be 1 for for partner added on the network
  ```
  myContract.partnerInfosLength()
  ```
  output:
  ```
  { [String: '1'] s: 1, e: 0, c: [ 1 ] }
  ```

### Member

Go back to your node console for the first proxy as member and execute smart contract to earn points, use points and retrieve transaction data.

* earn `200` points from the Partner created on the second proxy with id `100`
  ```
  myContract.earnPoints(200, 100, { from: web3.eth.accounts[0] })
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
  [ BigNumber { s: 1, e: 5, c: [ 111111 ] },
  'Jerry',
  'Doe',
  'jerry@doe.com',
  BigNumber { s: 1, e: 2, c: [ 200 ] } ]
  ```

* view the transaction stored as the first instance of the array
  ```
  myContract.transactions(0)
  ```
  output:
  ```
  [ BigNumber { s: 1, e: 2, c: [ 200 ] },
  BigNumber { s: 1, e: 0, c: [ 0 ] },
  BigNumber { s: 1, e: 5, c: [ 111111 ] },
  BigNumber { s: 1, e: 2, c: [ 100 ] } ]
  ```

* check transaction length, which should be equal to 1
  ```  
  myContract.transactionsLength()
  ```
  output:
  ```
  BigNumber { s: 1, e: 0, c: [ 1 ] }
  ```

* use `50` points from the Partner created on the second proxy with id `100`
  ```  
  myContract.usePoints(50, 100, { from: web3.eth.accounts[0] })
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
  [ BigNumber { s: 1, e: 5, c: [ 111111 ] },
  'Jerry',
  'Doe',
  'jerry@doe.com',
  BigNumber { s: 1, e: 2, c: [ 150 ] } ]
  ```

* view the second transaction stored
  ```
  myContract.transactions.call(1)
  ```
  output:
  ```
  [ BigNumber { s: 1, e: 1, c: [ 50 ] },
  BigNumber { s: 1, e: 0, c: [ 1 ] },
  BigNumber { s: 1, e: 5, c: [ 111111 ] },
  BigNumber { s: 1, e: 2, c: [ 100 ] } ]
  ```

* we should see transactions length to be `2` now
  ```
  myContract.transactionsLength()
  ```
  output:
  ```
  BigNumber { s: 1, e: 0, c: [ 2 ] }
  ```
