# Academic Certificate Issuing and Global Search using Private Ethereum Blockchain and SQLite

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
- Ethereum
- NodeJS
- MetaMask
- SQLite

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
- Setup private blockchain using geth, create account and generate fake Ether for your account
- Start your node using:
```console
foo@bar:~$ geth --port 3000 --networkid 143 --nodiscover --rpc --rpcport 8545 --rpcaddr 127.0.0.1 --datadir=~/blockchain --maxpeers=0 --rpccorsdomain "*" --rpcapi "eth,net,web3,personal,miner" --allow-insecure-unlock --password <(echo password) --unlock 0

```
- Deploy Contract and note the contract address
```console
foo@bar:~/blockchain-academic-certificate-global-verify$ truffle migrate 
```
- Write the contract address at line 3 in app.js
> var address = "0xd121f94184Da71908123a1e08F72cAB8573b9363";
- Setup MetaMask and import account from blockchain directory
- Open geth console and start mining:
```console
foo@bar:~$ geth attach ipc:/$HOME/blockchain/geth.ipc
Welcome to the Geth JavaScript console!

instance: Geth/v1.9.14-stable-6d74d1e5/linux-amd64/go1.14.2
coinbase: 0x7c5c723cd38eeb2d2975dc241fa0a54a9f0ff3da
at block: 2931 (Sun Jun 07 2020 14:27:14 GMT+0530 (IST))
datadir: /home/sampatghosh/blockchain
modules: admin:1.0 debug:1.0 eth:1.0 ethash:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0
> miner.start() 
```
- Run database API
```console
foo@bar:~$ python3 /blockchain-academic-certificate-global-verify/webapp/api/api.py 
```
- Run Node.js server and click on main.html
```console
foo@bar:~$ http-server blockchain-academic-certificate-global-verify/webapp/frontend/ -c-1 
```
