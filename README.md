# Academic Certificate Issuing and Global Search using Private Ethereum Blockchain and MongoDB

## Features
- Issue UniqueID to recipients
- Publish Certificate in Blockchain
- Get all the certificate issued to a particular recipient at on click
### Issue UniqueID

### Publish Certificate
- The institution will ask the recipient for their UniqueID, without which the certificate cannot be published.
- The institution will have to enter some details and the PDF of the certificate along with the UniqueID and click __Publish__.
- If the UniqueID is valid, the certificate along with all the details will be published onto the blockchain.
### Search using UniqueID
- Enter the valid UniqueID and click __Search__ and all the issued certificates will be listed.

## Tools Used 
- Truffle
- Ganache
- Rinkeby Test Network
- NodeJS
- MetaMask
- MongoDB

## Languages Used
- Solidity
- JavaScript

## Steps to replicate result
- Clone the directory 
```console
foo@bar:~$ git clone git@github.com:sampatghosh/blockchain-academic-certificate-global-verify.git 
```
- Set up Truffle
```console
foo@bar:~$ npm install -g truffle
```
- Navigate to the project directory:
```console
foo@bar:~$ cd blockchain-academic-certificate-global-verify
```
- Compile Contract
```console
foo@bar:~/blockchain-academic-certificate-global-verify$ truffle compile
```
- Setup private blockchain node using geth, create account and generate fake Ether for your account
- Start your node using:
```console
foo@bar:~$ geth --port 3000 --networkid 58343 --nodiscover --datadir=~/blockchain --maxpeers=0 --rpc --rpcport 8543 --rpcaddr 127.0.0.1 --rpccorsdomain "*" --rpcapi "eth,net,web3,personal,miner" --allow-insecure-unlock
```
- Deploy Contract and note the contract address
```console
foo@bar:~/blockchain-academic-certificate-global-verify$ truffle migrate 
```
- Write the contract address at line 3 in app.js
> var address = "0xd121f94184Da71908123a1e08F72cAB8573b9363";
- Setup MetaMask
