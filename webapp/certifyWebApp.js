var contract = undefined;
var customProvider = undefined;
var address = "0xd121f94184Da71908123a1e08F72cAB8573b9363";
var abi = undefined;

function certify_init () {
  //set up network
  if (typeof web3 !== 'undefined') {
    // Use existing gateway
    window.web3 = new Web3(web3.currentProvider);
  } else {
    alert("No Ethereum interface injected into browser. Read-only access");
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
};

//sends a hash to the blockchain
function certify_send (hash, insti, reci, course, grade, doc, callback) {
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
