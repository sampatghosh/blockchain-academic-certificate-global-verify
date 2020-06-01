const Web3 = require('web3');
const jsSHA = require("jssha");
const fs = require("fs");

let web3 = undefined;
let contract = undefined;

function init () {
  //set up network
  let provider = new Web3.providers.HttpProvider("http://localhost:7545");
  web3 = new Web3(provider);

  //contract abi
  let abi = [
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "hash",
          "type": "bytes32"
        },
        {
          "internalType": "string",
          "name": "insti",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "reci",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "course",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "grade",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "doc",
          "type": "string"
        }
      ],
      "name": "addDocHash",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "hash",
          "type": "bytes32"
        }
      ],
      "name": "findDocHash",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    }
  ];

  //assign contract address
  let address = "0x1a1F692B247F0FB8D71d2B6359BF29524C7b9bB3";

  //init contract
  contract = new web3.eth.Contract(abi, address);
};

//get a SHA-256 hash from a file --> works synchronously
function calculateHash (fileName) {
  let fileContent = fs.readFileSync(fileName);
  return calculateHashBytes(fileContent);
};

//get a SHA-256 hash from a data Buffer --> works synchronously
function calculateHashBytes (data) {
  let  shaObj = new jsSHA("SHA-256", "ARRAYBUFFER");
  shaObj.update(data);
  let hash = "0x" + shaObj.getHash("HEX");
  return hash;
};

//sends a hash to the blockchain
function sendHash (hash, insti, reci, course, grade, doc, callback) {
    web3.eth.getAccounts(function (error, accounts) {
      contract.methods.addDocHash(hash, insti, reci, course, grade, doc).send({
        from: accounts[0]
      },function(error, tx) {
        if (error) callback(error, null);
        else callback(null, tx);
      });
    });
};

//looks up a hash on the blockchain
function findHash (hash, callback) {
  contract.methods.findDocHash(hash).call( function (error, result) {
    if (error) callback(error, null);
    else {
      let resultObj = {
        mineTime:  new Date(result[0] * 1000),
        blockNumber: result[1],
        instituteName: result[2],
        recipientName: result[3],
        courseName: result[4],
        marks: result[5],
        dateOfCompletion: result[6]
      }
      callback(null, resultObj);
    }
  });
};

let CertifyExports = {
  findHash : findHash,
  sendHash : sendHash,
  calculateHash : calculateHash,
  init : init,
  calculateHashBytes : calculateHashBytes,
};

module.exports = CertifyExports;
