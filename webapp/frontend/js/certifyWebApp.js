var contract = undefined;
var customProvider = undefined;
var address = "0xA5FB32b226ECC34fF4AA81D0DB1F2eF324378C31";
var abi = undefined;
// var acc = "0x7c5c723cd38eeb2d2975dc241fa0a54a9f0ff3da";

function certify_init () {
  //set up network
  // if (typeof web3 !== 'undefined') {
    // Use existing gateway
    // window.web3 = new Web3(web3.currentProvider);
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    window.ethereum.enable();
  } else {
    alert("No Ethereum interface injected into browser.");
  }
  //contract abi
  let abi = [
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
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
    }
  ];

  //init contract
  contract = new web3.eth.Contract(abi, address);
  // console.log(contract);
  // console.log(contract.address);
  // contract = new web3.eth.Contract(abi, address, {
  //   from: acc, // default from address
  //   gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
  // });
  // console.log(contract.methods);
};

//sends a hash to the blockchain
function certify_send (hash, insti, reci, course, grade, doc, callback) {
    web3.eth.getAccounts(function (error, accounts) {
      // console.log("Account="+accounts[0]);
      web3.eth.getBlock("latest", false, (error, result) => {      
        contract.methods.addDocHash(hash, insti, reci, course, grade, doc).send({
      	 from: accounts[0],
      	 gas: 10000000
         //gas: result.gasLimit-1000000,
        },function(error, tx) {
          if (error) callback(error, null);
          else callback(null, tx);
        });
      });
    });  
};

//looks up a hash on the blockchain
function certify_find (hash, callback) {
  contract.methods.findDocHash(hash).call( function (error, result) {
    if (error) { 
      console.log("Returned ERROR from findDocHash");
      console.log("Error = "+error);
      console.log(error);
      callback(error, null);
    }else {
      console.log("blockNumber = "+result[0]);
      console.log("instituteName = "+result[1]);
      console.log("recipientName = "+result[2]);
      console.log("courseName = "+result[3]);
      console.log("marks = "+result[4]);
      console.log("dateOfCompletion = "+result[5]);
      let resultObj = {
        blockNumber: result[0],
        instituteName: result[1],
        recipientName: result[2],
        courseName: result[3],
        marks: result[4],
        dateOfCompletion: result[5]
      }
      callback(null, resultObj);
    }
  });
};
