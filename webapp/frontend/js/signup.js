$(document).ready(function() {

	$(".cancelbtn").click(function(){
		location.reload(true);
	});

	$(".signupbtn").click(function(){
		//api call and insert data
		api_url = 'http://127.0.0.1:5000/api/v1/signup';


		//capture values
		user_email = $("#id_email").val();
		user_name = $("#id_name").val();
		user_pwd = $("#id_pwd").val();
		user_dob = "none";
		temp = $("#id_dob").val();
		if(temp.length > 0){
			user_dob = temp;
		}


		console.log("email: ",user_email)
		console.log("name: ",user_name)
		console.log("pwd: ",user_pwd)
		console.log("dob: ",user_dob)


//'email' in request.args and 'name' in request.args and 'pwd' in request.args and 'dob' in request.args:

		$.ajax({
        	url: api_url,
        	type: 'GET',
        	dataType: 'json',
        	data: {email:user_email, name:user_name, pwd:user_pwd, dob:user_dob},
        	success: function(result){
          		console.log("success");
          		// console.log(result.id_exists);
          		var unique_id = result.uniqueid;
          		if(unique_id==0){
            		console.log("Error: Insertion failed");
          		}
          		else{
            		console.log("Insertion successful");
            		console.log("unique_id: ",unique_id);
            		var modal = document.getElementById("myModal");

            		$("#the_unique_id").html("<h3><strong>"+unique_id+"</strong></h3>");
            		modal.style.display = "block";
          		}
        	}
      	})


	});


	var span = document.getElementsByClassName("close")[0];
	var modal = document.getElementById("myModal");
	span.onclick = function() {
 		modal.style.display = "none";
	}


});