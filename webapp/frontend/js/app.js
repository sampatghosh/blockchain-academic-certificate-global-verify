$(document).ready(function() {

  $("#form_fieldset").attr('disabled', 'disabled');
  certify_init(); //this one should be uncommented


  //activity on Check button click

  $("#check_id_button").click(function(){
    $("#form_fieldset").attr('disabled', 'disabled');
    var id = $("#id_text_box").val();
    alert(id);

    api_url = 'http://127.0.0.2:5000/api/v1/queries/hashvalue';
    // parameter = '?id='+id;
    // req_url = api_url+parameter;
    alert("requrl: "+api_url);


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
          alert("enabled");
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
      uniqueID = $("#uniqueID").val();
    
    //check whether uniqueID is valid -- It is valid.
    
      certify_send(hash, insti, reci, course, marks, doc, uniqueID, function(err, tx) {
        $("#responseText").html("<p>Certificate successfully fingreprinted onto Ethereum blockchain.</p>"
          + "<p>File Hash Value: " + hash +"</p>"
          + "<p>Transaction ID: " + tx +"</p>"
          + "<p>Available at contract address: " + address +"</p>"
          + "<p><b>Please alow a few minutes for transaction to be mined.</b></p>"
        );
      });

      //this part is for adding hash and uniqueID to database

      uniqueID = $("#uniqueID").val();
      hash = $("#insti").val();
      

      // api call to send hash value
      
      // end of ajax api call

      insert_in_table(hash, uniqueID);
    });

  });


});


//utility functions


function insert_in_table(hash, uniqueId){

	alert(uniqueID);
    alert(hash);

    api_url = 'http://127.0.0.2:5000/api/v1/insert/hashvalue';
    alert("requrl: "+api_url);

	$.ajax({
        url: api_url,
        type: 'GET',
        dataType: 'json',
        data: {id:uniqueID, hash:hash},
        success: function(result){
          console.log("success");
          console.log(result.id_exists);
          var status = result.status;
          if(status==0){
            alert("successful insert");
          }
          else{
            alert("Error: Insert failed")
          }
        }
      })

	console.log("Api call complete");
}



function hashForFile(callback) {
  // input = document.getElementById("certi");
  input = $("#certi");
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
    
//     certify_send(hash, insti, reci, course, marks, doc, uniqueID, function(err, tx) {
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
