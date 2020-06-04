var CertifyContract = artifacts.require("Certify.sol");

module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(CertifyContract);
};
