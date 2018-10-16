
# Hyperledger Fabric EVM chaincode plugin setup

>**Note** This guide follows and is inspired from the steps provided in the example for fabric-chaincode-evm repository [EVM Smart Contracts](https://github.com/hyperledger/fabric-chaincode-evm/blob/master/examples/EVM_Smart_Contracts.md)

In this guide, we will setup fabric locally using docker containers. Next we will install and instantiate the evm chaincode on our fabric peers.


### Clean docker and set GOPATH

This will remove all your docker containers and images!
```
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images -q) -f
```

Set GOPATH and GOBIN
```
export GOPATH=$HOME/go
export GOBIN=$HOME/go/bin
export PATH=$PATH:$HOME/go/bin
```

### Get Fabric Samples and download Fabric images

Clone the `fabric-samples` repo in your GOPATH directory.
```
cd $GOPATH/src/github.com/hyperledger/
git clone https://github.com/hyperledger/fabric-samples.git
```

Checkout `release-1.3`
```
cd fabric-samples
git checkout release-1.3
```

Download the docker images
```
./scripts/bootstrap.sh
```

### Mount the EVM Chaincode

Clone the `fabric-chaincode-evm` repo in your GOPATH directory.
```
cd $GOPATH/src/github.com/hyperledger/
git clone https://github.com/hyperledger/fabric-chaincode-evm
```

Now navigate back to your fabric-samples folder.  Here we will use first-network to launch the network.
```
cd $GOPATH/src/github.com/hyperledger/fabric-samples/first-network
```

Update the `docker-compose-cli.yaml` with the volumes to include the fabric-chaincode-evm.

```
  cli:
    volumes:
      - ./../../fabric-chaincode-evm:/opt/gopath/src/github.com/hyperledger/fabric-chaincode-evm
```

Generate certificates and bring up the network
```
./byfn.sh generate
./byfn.sh up
```

## Install EVM Chaincode

Navigate into the cli docker container
```
docker exec -it cli bash
```

If successful, you should see the following prompt
```
root@0d78bb69300d:/opt/gopath/src/github.com/hyperledger/fabric/peer#
```

To change which peer is targeted change the following environment variables:
```
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=peer0.org1.example.com:7051
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
```

Next install the EVM chaincode on all the peers
```
peer chaincode install -n evmcc -l golang -v 0 -p github.com/hyperledger/fabric-chaincode-evm/evmcc
```

## Instantiate the chaincode

```
peer chaincode instantiate -n evmcc -v 0 -C mychannel -c '{"Args":[]}' -o orderer.example.com:7050 --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
```


Great.
You are now ready to [setup fab proxy and interact with the contract using web3](./proxy-web3-commands.md)
