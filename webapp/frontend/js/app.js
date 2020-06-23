$(document).ready(function() {

  $("#form_fieldset").attr('disabled', 'disabled');
  certify_init(); //this one should be uncommented


  //activity on Check button click

  $("#check_id_button").click(function(){
    $("#form_fieldset").attr('disabled', 'disabled');
    var id = $("#id_text_box").val();
    console.log("ID="+id);

    api_url = 'http://127.0.0.1:5000/api/v1/queries/hashvalue';
    // parameter = '?id='+id;
    // req_url = api_url+parameter;
    // alert("requrl: "+api_url);


    //api call to check if uniqueid is valid
    $.ajax({
      url: api_url,
      type: 'GET',
      dataType: 'json',
      data: {id: id},
      success: function(result){
        console.log("success");
        console.log(result.id_exists);
        var id_exists = result.id_exists;
        if(id_exists){
          $("#form_fieldset").removeAttr('disabled');
          $("#uniqueID").val(id);
          $("#uniqueID").attr('disabled', 'disabled');
          console.log("enabled");
        }
        else{
          alert("Error: invalid unique id.")
        }
      }
    })
  });


  //activity on Publish button click

  $("#sendHashButton").click(function(event) {
    hashForFile(function (err, hash) {
      insti = $("#insti").val();
      reci = $("#reci").val();
      course = $("#course").val();
      marks = $("#marks").val();
      doc = $("#doc").val();
      //uniqueID = $("#uniqueID").val();
      
    //check whether uniqueID is valid -- It is valid.
    certify_find(hash, function(err, resultObj) {
    	if(err || resultObj.blockNumber == 0) {
	      	certify_send(hash, insti, reci, course, marks, doc, function(err, tx) {
    	    	console.log("Transaction ID="+tx);
        		console.log("Contract Address="+address);
        		console.log("Available at contract address: " + address);
        		$("#responseText").html("<p><b>Certificate successfully fingreprinted onto Ethereum blockchain.</b></p>"
          			+ "<p>File Hash Value: " + hash +"</p>"
          			+ "<p>Transaction ID: " + tx +"</p>"
          			+ "<p>Available at contract address: " + address +"</p>"
        		);
        		if(!tx) {
        			$("#responseText").html("<p><b>Certificate failed to get fingreprinted onto Ethereum blockchain</b></p>");
        		}
        		else {
          			uniqueid = $("#uniqueID").val();
          			insertIntoDB(hash, uniqueid);
        		}
      		});
	    }
	    else {
	    	alert("Certificate already present in Blockchain");
	    }
    });

      // uniqueid = $("#uniqueID").val();
      // insertIntoDB(hash, uniqueid);

    });

  });


  //activity on search button click in search.html

  $("#searchBtn").click(function(event) {
    /* Act on the event */
    var id = $("#searchTextBox").val().trim();

    console.log("ID="+id);

    api_url = 'http://127.0.0.1:5000/api/v1/queries/hashvalue';
    // parameter = '?id='+id;
    // req_url = api_url+parameter;
    // alert("requrl: "+api_url);


    //api call to check if uniqueid is valid
    $.ajax({
      url: api_url,
      type: 'GET',
      dataType: 'json',
      data: {id: id},
      success: function(result){
        console.log("success");
        console.log(result.id_exists);
        var id_exists = result.id_exists;
        if(id_exists){
          console.log("student id: "+result.student_id);
          console.log("hash entry: "+result.total_hash);
          hashValArr = result.hash_values;
          console.log(hashValArr);
          find(hashValArr);
        }
        else{
          $("#responseText").html("<p>Error: Invalid Unique ID.</p>");
        }
      }
    })

  });


});


//utility functions


function insertIntoDB(hash, uniqueid){
      //hash = $("#insti").val();
      console.log("UniqueID="+uniqueid);
      console.log("Hash="+hash);

      api_url = 'http://127.0.0.1:5000/api/v1/insert/hashvalue';
      console.log("requrl: "+api_url);

      // api call to send hash value
      $.ajax({
        url: api_url,
        type: 'GET',
        dataType: 'json',
        data: {id:uniqueid, hash:hash},
        success: function(result){
          console.log("success");
          // console.log(result.id_exists);
          var status = result.status;
          if(status==0){
            console.log("successful insert");
          }
          else{
            console.log("Error: Insert failed")
          }
        }
      })
      // end of ajax api call
      alert("api function complete.");
}

function hashForFile(callback) {
  //input = document.getElementById("certi");
   input = $("#certi").prop('files')[0];
  
  if (!input) {
    alert("Please select a file first");
  }
  else {
    file = input;
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



//activity on Publish button click
// function send () {
//   hashForFile(function (err, hash) {
//   	insti = document.getElementById("insti");
//   	reci = document.getElementById("reci");
//   	course = document.getElementById("course");
//   	marks = document.getElementById("marks");
//   	doc = document.getElementById("doc");
//   	uniqueID = document.getElementById("uniqueID");
  	
//   	//check whether uniqueID is valid
    
//     certify_send(hash, insti, reci, course, marks, doc, function(err, tx) {
//       $("#responseText").html("<p>Certificate successfully fingreprinted onto Ethereum blockchain.</p>"
//         + "<p>File Hash Value: " + hash +"</p>"
//         + "<p>Transaction ID: " + tx +"</p>"
//         + "<p>Available at contract address: " + address +"</p>"
//         + "<p><b>Please alow a few minutes for transaction to be mined.</b></p>"
//       );
//     });

//     //this part is for adding hash and uniqueID to mongodb


//   });
// };

function find (hashValArr) {

  var hash;
  $("#responseText").html('');
  for (hash of hashValArr){
    // $("#responseText").append('<p>'+hash+'</p>');
    certify_find(hash, function(err, resultObj) {
    	console.log(resultObj);

      if (err || resultObj.blockNumber == 0) {
        $("#responseText").append("<p><b>File fingerprint not found on Ethereum blockchain.</p>"
          + "<p>File Hash Value: " + hash + "</b></p>"
        );
      } else {
        $("#responseText").append(
            "<p>Institute: " + resultObj.instituteName + "</p>"
          + "<p>Recipient: " + resultObj.recipientName + "</p>"
          + "<p>Course: " + resultObj.courseName + "</p>"
          + "<p>Marks/Grade: " + resultObj.marks + "</p>"
          + "<p>Date of Completion: " + resultObj.dateOfCompletion + "</p>"
        );
      }
    });
  }

};