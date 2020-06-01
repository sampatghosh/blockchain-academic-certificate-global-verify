const certify = require('./certifyLib.js');
const commandLineArgs = require('command-line-args');

const cmdOptions = [
  {
    name: "add",
    alias: "a",
    type: String
  },
  {
    name: "find",
    alias: "f",
    type: String
  }
];
const options = commandLineArgs(cmdOptions);

certify.init();

if (options.add) {
  console.log("Sending hash for file: " + options.add);
  let hash = certify.calculateHash(options.add);
  console.log("SHA-256 hash value: " + hash);
  certify.sendHash(hash, "NITK", "Sampat Kr Ghosh", "MTech in Information Technology", "7.5", "31/05/2021", function(error, tx) {
    console.log("Transaction ID: " + tx);
  });
}
else if (options.find) {
  console.log("Looking up hash for file: " + options.find);
  let hash = certify.calculateHash(options.find);
  console.log("SHA-256 hash value: " + hash);
  certify.findHash(hash, function (error, result) {
    if (result.blockNumber!=0) {
      console.log("Has value found at block No.: " + result.blockNumber);
      console.log("Mine time: " + result.mineTime);
      console.log("Institute: " + result.instituteName);
      console.log("Recipient: " + result.recipientName);
      console.log("Course: " + result.courseName);
      console.log("Marks/Grade: " + result.marks);
      console.log("Date of Completion: "+ result.dateOfCompletion);
    }
    else console.log("Hash value not found on blockchain");
  });
}
else {
  console.log("Illegal command line options");
}