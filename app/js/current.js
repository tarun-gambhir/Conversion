$(document).ready(function() {
	$("#currentTime").ready(function(){
		var now = "";
		
		$("#time").find('#currentTime').html("").removeAttr("style");
		$("#time").find('#currentTime').append("<div class='boxStyle'><div id='timestamp'>" + now + "</div></div>");
		
		function timerFunc() {
			now = moment().format('X');
			$("#time").find('#currentTime').html("").removeAttr("style");
			$("#time").find('#currentTime').append("<div class='boxStyle'><div id='timestamp'>" + now + "</div></div>");
		}
		
		var begin = null;
		function startTimer() {
			begin = setInterval(timerFunc,1000);
		}
		
		$("#currentTime").on({
			mouseenter: function(){
				$("#time").find('#currentTime').append("<div id='stop' style='font-size: 12px;'> [stopped] </div>");
				clearInterval(begin);
			},
			mouseleave: function() {
				$("#stop").remove();
				startTimer();
			}
		}).trigger('mouseleave');
		
	});
});


