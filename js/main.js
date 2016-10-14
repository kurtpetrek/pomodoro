(function(){

"use strict";

var workTimerAdjust = 25,
	workTimer = 1000 * 60 * workTimerAdjust,
	workLength = workTimer,
	breakTimerAdjust = 5,
	breakTimer = 1000 * 60 * breakTimerAdjust,
	breakLength = breakTimer,
	timerRunning = false,
	inWorkTime = false,
	inBreakTime = false;

function convertTime(time) {
	var minutes = Math.floor(time / 1000 / 60);
	var seconds = time / 1000 - minutes * 60;
	minutes = minutes.toString();
	seconds = seconds.toString();
	if (seconds < 10) {
		seconds = "0" + seconds
	}
	return minutes + ":" + seconds;
}

var countDown = setInterval(function () {
	if (timerRunning) {
		if (inWorkTime) {
			workTimer -= 1000;
			$("#timer").html(convertTime(workTimer));

			if (workTimer === workLength - 1000) {
				$("body").css({
					background: "rgb(100,100,200)",
					transition: "background linear " + workLength / 2000 + "s"
				});
			}

			if (workTimer === workLength / 2) {
				$("body").css({
					background: "rgb(0,0,200)",
					transition: "background linear " + workLength / 2000 + "s"
				});
			}

		}
		if (workTimer === 0){
            $('#break-start-sound').prop("volume", 0.3);
			$("#break-start-sound").get(0).play();
		}
		if (workTimer <= -100) {
			inWorkTime = false;
			inBreakTime = true;
			workTimer -= 1000
		}
		if (inBreakTime) {
			breakTimer -= 1000;
			$("#timer").html(convertTime(breakTimer));

			if (breakTimer == breakLength - 1000) {
				
				$("body").css({
					background: "rgb(0,0,0)",
					transition: "background linear " + breakLength / 2000 + "s"
				});
			}

			if (breakTimer == breakLength / 2) {
				$("body").css({
					background: "rgb(0,0,200)",
					transition: "background linear " + breakLength / 2000 + "s"
				});
			}

		}
		if (breakTimer <= 0) {
			inWorkTime = true;
			inBreakTime = false;
			workTimer = workLength;
			breakTimer = breakLength;
            $('#work-start-sound').prop("volume", 0.3);
			$("#work-start-sound").get(0).play();
			$("#timer").html(convertTime(workTimer));
		}		
	}
	if (inWorkTime) {
		$("#work-adjustment h2").css("animation", "active infinite 2s");
		$("#break-adjustment h2").css("animation", "none");		
	}
	if (inBreakTime) {
		$("#break-adjustment h2").css("animation", "active infinite 2s");
		$("#work-adjustment h2").css("animation", "none");		
	}
	if(!inBreakTime && !inWorkTime){
		$("#work-adjustment h2").css("animation", "none");	
		$("#break-adjustment h2").css("animation", "none");		
	}
}, 1000);


$("#control").click(function () {
	if (!inBreakTime && !inWorkTime) {
		inWorkTime = true;
	}
	if (!timerRunning) {
		timerRunning = true;		
		$("#control").html("Stop");		
		countDown;
	} else {
		timerRunning = false;
		$("#control").html("Start");
		inBreakTime = false;
		inWorkTime = false;
		breakTimer = breakLength;
		workTimer = workLength;
		$("#timer").html(convertTime(workLength));
		
		$("body").css({
					background: "rgb(0,0,200)",
					transition: "background linear 2s"
				});
	}
	
	highlightClick($("#control"));
  $('#control-start-sound').prop("volume", 0.2);
	$("#control-start-sound").get(0).play();
});

$("#work-time-up").click(function () {
	if (!timerRunning) {
		workLength += 1000 * 60;
		$("#work-time-display").html(convertTime(workLength));
		workTimer = workLength;
		$("#timer").html(convertTime(workTimer));
		highlightClick($("#work-time-up"));
	} else {
		highlightClick($("#control"));
	}
});

$("#work-time-down").click(function () {
	if (!timerRunning && workLength > 1000 * 60) {
		workLength -= 1000 * 60;
		$("#work-time-display").html(convertTime(workLength));
		workTimer = workLength;
		$("#timer").html(convertTime(workTimer));
		highlightClick($("#work-time-down"));
	} if(timerRunning) {
		highlightClick($("#control"));
	}
});

$("#break-time-up").click(function () {
	if (!timerRunning) {
		breakLength += 1000 * 60;
		breakTimer = breakLength;
		$("#break-time-display").html(convertTime(breakLength));
		highlightClick($("#break-time-up"));
	} else {
		highlightClick($("#control"));
	}
});

$("#break-time-down").click(function () {
	if (!timerRunning && breakLength > 1000 * 60) {
		breakLength -= 1000 * 60;
		breakTimer = breakLength;
		$("#break-time-display").html(convertTime(breakLength));
		highlightClick($("#break-time-down"));
	} 
	if(timerRunning){
		highlightClick($("#control"));
	}
});

function highlightClick(item) {
	item.css({
		background: '#111',
		color: '#eee',
		borderColor: '#eee'
	});

	setTimeout(
		function () {
			item.css({
				background: '#eee',
				color: '#111',
				borderColor: '#111'
			});
		}, 150);
}

function hoverIn(obj) {
	obj.css({
		background: '#eee',
		color: '#111',
		borderColor: '#111',
		borderRadius: '20px'
	});
}

function hoverOut(el) {
	el.css({
		background: '#111',
		color: '#eee',
		borderColor: '#eee',
		borderRadius: '10px'
	});
}

$("#break-time-down").hover(function () {
	if(!timerRunning){
	hoverIn($("#break-time-down"));
	} else {
		$("#break-time-down").css("background", "#400");		
	}
}, function () {
	if(!timerRunning){
	hoverOut($("#break-time-down"));
	} else {
		$("#break-time-down").css("background", "#000");		
	}
});

$("#break-time-up").hover(function () {
	if(!timerRunning){
	hoverIn($("#break-time-up"));
	} else {
		$("#break-time-up").css("background", "#400");		
	}
}, function () {
	if(!timerRunning){
	hoverOut($("#break-time-up"));
	} else {
		$("#break-time-up").css("background", "#000");		
	}
});

$("#work-time-up").hover(function () {
	if(!timerRunning){
	hoverIn($("#work-time-up"));
	} else {
		$("#work-time-up").css("background", "#400");		
	}
}, function () {
	if(!timerRunning){
	hoverOut($("#work-time-up"));
	} else {
		$("#work-time-up").css("background", "#000");		
	}
});

$("#work-time-down").hover(function () {
	if(!timerRunning){
	hoverIn($("#work-time-down"));
	} else {
		$("#work-time-down").css("background", "#400");		
	}
}, function () {
	if(!timerRunning){
	hoverOut($("#work-time-down"));
	} else {
		$("#work-time-down").css("background", "#000");		
	}
});

$("#control").hover(function () {
	hoverIn($("#control"));
}, function () {
	hoverOut($("#control"));
});


$("#grass").css("height", $(window).innerHeight - $('#grass').position().top + "px");
  
$("#grass img").css("top", "-" + $("#grass img").height() / 3 +"px");

$(window).resize(function(){
    $("#grass").css("height", $(window).innerHeight - $('#grass').position().top + "px");
  $("#grass img").css("top", "-" + $("#grass img").height() / 3 + "px" );
});

})();
