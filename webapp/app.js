$(document).ready(function() {
  certify_init();
});

function hashForFile(callback) {
  input = document.getElementById("certi");
  if (!input.files[0]) {
    alert("Please select a file first");
  }
  else {
    file = input.files[0];
    fr = new FileReader();
    fr.onload = function (e) {
      content = e.target.result;
      var shaObj = new jsSHA("SHA-256", "ARRAYBUFFER");
      shaObj.update(content);
      var hash = "0x" + shaObj.getHash("HEX");
      callback(null, hash);
    };
    fr.readAsArrayBuffer(file);
  }
};

function send () {
  hashForFile(function (err, hash) {
  	insti = document.getElementById("insti");
  	reci = document.getElementById("reci");
  	course = document.getElementById("course");
  	marks = document.getElementById("marks");
  	doc = document.getElementById("doc");
  	uniqueID = document.getElementById("uniqueID");
  	
  	//check whether uniqueID is valid or not
  	// and if valid, are there any entries or not
    
    certify_send(hash, insti, reci, course, marks, doc, uniqueID, function(err, tx) {
      $("#responseText").html("<p>Certificate successfully fingreprinted onto Ethereum blockchain.</p>"
        + "<p>File Hash Value: " + hash +"</p>"
        + "<p>Transaction ID: " + tx +"</p>"
        + "<p>Available at contract address: " + address +"</p>"
        + "<p><b>Please alow a few minutes for transaction to be mined.</b></p>"
      );
      
      //this part is for adding hash and uniqueID to mongodb 
    
    });
  });
};

function find () {
  hashForFile(function (err, hash) {
    certify_find(hash, function(err, resultObj) {
      if (resultObj.blockNumber != 0) {
        $("#responseText").html(
            "<p>Institute: " + resultObj.instituteName + "</p>"
          + "<p>Recipient: " + resultObj.recipientName + "</p>"
          + "<p>Course: " + resultObj.courseName + "</p>"
          + "<p>Marks/Grade: " + resultObj.marks + "</p>"
          + "<p>Date of Completion: " + resultObj.dateOfCompletion + "</p>"
        );
      } else {
        $("#responseText").html("<p>File fingerprint not found on Ethereum blockchain.</p>"
          + "<p>File Hash Value: " + hash + "</p>"
        );
      }
    });
  });
};
