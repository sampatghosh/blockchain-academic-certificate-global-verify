var contract = undefined;
var customProvider = undefined;
var address = "0xfBB02839E0DFCaFd6ca4784399E28F3091b8F072";
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

  //init contract
  contract = new web3.eth.Contract(abi, address);
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
        console.log(result.gasLimit)
      
        contract.methods.addDocHash(hash, insti, reci, course, grade, doc).send({
      	 from: accounts[0],
          // gas: result.gasLimit-100000,
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
