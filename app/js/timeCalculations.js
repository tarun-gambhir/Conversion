$(function() {
	//From Timestamp to human readable
	$(".toReadable").click(function() {
		var timeUnit = "";
		
		var timeVal = $("#timeInput").val();
		
		// clear content on every click
		$("#time").find("#resultFromTimestamp").html("").removeAttr("style");
		
		if (timeVal != "") {

			var inputLength = $("#timeInput").val().length;;
			var error = 0;
			if(timeVal < 0)
			{
				//All lengths will be length of timestamp + 1 (for the negative sign upfront)
				if(inputLength > 15)
				{
					$("#time").find("#resultFromTimestamp").append("Invalid Entry").css("color","red");
					error = 1;
				}
				else
				{
					var warning = "It is advised not to use negative timestamps. Using large negative enteries may result in unexpected results.";
					$("#time").find("#resultFromTimestamp").append("<span id='warning'>");
					
					$("#warning").append(warning).css({
						"color": "#2E2E2E",
						"background-color": "#F4FA58"
					})
					.append('</span>')
					.append('<br>');
				}
				
			}	
			else
			{
				//If milliseconds, truncate to length 13
				if (inputLength <= 14 && inputLength >= 11)
				{
					timeVal = timeVal.substring(0,13);
					timeUnit = "milliseconds";
				}
				//If microseconds, truncate to length 13
				else if (inputLength > 14)
				{
					timeVal = timeVal.substring(0,13);
					timeUnit = "microseconds";
				}
				//If seconds, extend to length 13
				else
				{
					timeVal = Number(timeVal) * 1000; 
				}
			}
			
			var timeMoment = moment(Number(timeVal));
			var timeMomentUtc = moment.utc(Number(timeVal));

			if(timeUnit){
				$("#time").find("#resultFromTimestamp")
				.append("Assuming the timestamp is in " + timeUnit + "<br>");
			}
			if(!error)
			{
				$("#time").find("#resultFromTimestamp")
				.append('<b>GMT: </b>')
				.append('<span>' + timeMomentUtc.format('ddd MMM DD YYYY hh:mm:ss a') + '</span>')
				.append('<br>')
				.append('<b>Your Timezone: </b>')
				.append('<span>' +timeMoment.format('ddd MMM DD YYYY hh:mm:ss a') + '</span>');
			}
		}
		else {
			$("#time").find("#resultFromTimestamp").append("Please enter a timestamp for conversion").css("color","red");
		}
	});		//From Timestamp to human readable End
	
	//From date to timestamp
	$("#toTimeStamp").click(function() {
		var inputDiv = $('.toTimestampDiv'); 
		
		$("#time").find("#resultToTimestamp").html("");
		
		//convert to two digits if user inputs single digit
		var mm = ("0" + inputDiv.find('input[name=month]').val()).slice(-2);
		var dd = ("0" + inputDiv.find('input[name=day]').val()).slice(-2);
		var hr = ("0" +inputDiv.find('input[name=hour]').val()).slice(-2);
		var min = ("0" + inputDiv.find('input[name=minute]').val()).slice(-2);
		var sec = ("0" + inputDiv.find('input[name=seconds]').val()).slice(-2);

		var yy =  inputDiv.find('input[name=year]').val();
		
		var dateString = yy + '-'  +mm + '-' + dd + ' ' + hr + ':' + min + ':' + sec;
		
		var result = "";
		if($("#time").find('#timezoneSelect').val() == "gmt")
			result = moment.utc(dateString).format('X');
		else
			result = moment(dateString).format('X')
		
		$("#time").find("#resultToTimestamp")
		.append('<b>Timestamp (' +  $("#time").find('#timezoneSelect option:selected').text() + '): </b>')
		.append('<span>' + result + '</span>')
		.append('<br>')
		.append('<b> Timestamp in milliseconds: </b>')
		.append('<span>' + result * 1000 + '</span>');
	});		//From date to timestamp End
	
});