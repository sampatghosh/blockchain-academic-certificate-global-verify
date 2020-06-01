pragma solidity >= 0.5.0 < 0.7.0;

contract Certify {
	
	struct Record {
    	uint mineTime;
    	uint blockNumber;
    	string instituteName;
    	string recipientName;
    	string courseName;
    	string marks;
    	string dateOfCompletion;
  	}
  	
  	mapping (bytes32 => Record) private docHashes;
  	
  	constructor() public {
  	
  	}
  	
  	// function that is used to store records on the blockchain
  	function addDocHash(bytes32 hash, string memory insti, string memory reci, string memory course, string memory grade, string memory doc ) public {
    	Record memory newRecord = Record(now, block.number,insti,reci,course,grade,doc);
    	docHashes[hash] = newRecord;
  	}
  	
  	// verify weather a hash exists on the blockchain and retrieve the corresponding record
  	function findDocHash(bytes32 hash) public view returns(uint, uint, string memory, string memory, string memory, string memory, string memory) {
    	return (docHashes[hash].mineTime, docHashes[hash].blockNumber, docHashes[hash].instituteName, 
    				docHashes[hash].recipientName, docHashes[hash].courseName, docHashes[hash].marks, docHashes[hash].dateOfCompletion);
  	}
}
