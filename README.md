# Loyalty Points with Fabric EVM

A customer loyalty program allows companies to reward customers who frequently make purchases. Program members are able to earn points on purchases, which can translate into some type of reward such as discount, freebie or special customer treatment.  The members work toward a certain amount of points to redeem their reward.  These programs can have multiple companies as partners on the program, to cater to a customer base.  However, current loyalty program systems are restraint on relations between partners, and with visibility to members. These restraints can be removed by creating the customer loyalty program on a blockchain network.

This blockchain model for a customer loyalty program enhances the value of points to loyalty program members and brings in new value to the partners by creating trusted transactions. Participants in this network have a more level relation among each other and points are in the centric position to connect all participants.

This code pattern is for developers looking to start writing Solidity smart contracts and building blockchain applications with Hyperledger Fabric EVM. When the reader has completed this code pattern, they will understand how to:

* Creating a smart contract with Solidity using Truffle and Ganache
* Deploying an instance of Hyperledger Fabric locally with EVM chaincode and starting a Fabric proxy
* Interacting with the network through web3 library
* Build a Node.js web application to interact with the blockchain network


# Architecture Flow

<p align="center">
  <img width="650" height="200" src="docs/doc-images/arch-flow.png">
</p>

**Note** The blockchain network will have multiple members and partners

1. Member is registered on the network
2. Member can sign-in to make transactions to earn points, redeem points and view their transactions
3. Partner is registered on the network
4. Partner can sign-in to view their transactions and display dashboard


# Included Components

* [Hyperledger Fabric](https://hyperledger.github.io/composer/latest/) Hyperledger Fabric is a platform for distributed ledger solutions, underpinned by a modular architecture delivering high degrees of confidentiality, resiliency, flexibility and scalability
* [Hyperledger Fabric EVM chaincode plugin](https://github.com/hyperledger/fabric-chaincode-evm) This project enables one to use the Hyperledger Fabric permissioned blockchain platform to interact with Ethereum smart contracts written in an EVM compatible language such as Solidity or Vyper.
* [web3](https://web3js.readthedocs.io/en/1.0/) web3.js is a collection of libraries which allow you to interact with a local or remote ethereum node, using a HTTP or IPC connection.
* [Solidity](https://solidity.readthedocs.io/en/v0.4.25/) Solidity is a contract-oriented, high-level language for implementing smart contracts

## Featured technology
+ [Nodejs](https://www.python.org/) Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code server-side
+ [Bootstrap](https://getbootstrap.com/) Bootstrap is an open source toolkit for developing with HTML, CSS, and JS


# Running the Application

Install the prerequisites and go through each section to learn about developing and interacting with the solidity contract using Ethereum development tools, setting up Hyperledger Fabric with EVM chaincode and starting a proxy to interact with the network, go through web3 commands to execute contract functions and retrieve data, and finally run and go through the application.

## Prerequisite
- [Go](https://golang.org/dl/)
- [Docker](https://www.docker.com/)
- [npm](https://www.npmjs.com/)  
- [Node](https://nodejs.org/en/)


## Sections
1. [Solidity contract with Truffle](./docs/truffle-commands.md)
2. [Hyperledger Fabric EVM chaincode plugin setup](./docs/evm-fabric-setup.md)
3. [Setup Fab Proxy and using Web3](./docs/proxy-web3-commands.md)
4. [Running the web application](./docs/run-application.md)

<div style='border: 2px solid #f00;'>
  <img width="1000" src="docs/doc-images/app.png">
</div>

## Links
* [Fabric Chaincode EVM](https://github.com/hyperledger/fabric-chaincode-evm)
* [Hyperledger Fabric Docs](http://hyperledger-fabric.readthedocs.io/en/latest/)
* [Solidity](https://solidity.readthedocs.io/en/v0.4.25/index.html)


## License
[Apache 2.0](LICENSE)
