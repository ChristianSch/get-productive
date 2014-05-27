var timerIsOn = false;
var timer;
var timerSeconds = 0;
var timerMinutes = 0;
var timerHours = 0;

/* prevent multiple savings of the very same session */
var sessionIsSaved = false;

var startStamp = 0;
var endStamp = 0;

var debug = true;

$( document ).ready(function() {
	document.getElementById('startTimerButton').onclick = startTimer;
	document.getElementById('stopTimerButton').onclick = stopTimer;
	document.getElementById('resetTimerButton').onclick = resetTimer;
	document.getElementById('saveSessionButton').onclick = saveSession;

	document.getElementById('sessionListButton').onclick = listSessions;
	document.getElementById('refreshSessionList').onclick = listSessions;
});

/*
	Timer methods
 */
function startTimer() {
	startStamp = new Date().getTime();
	if (timerIsOn !== true) {
		timerIsOn = true;
		timer = setInterval(function() {
			if (timerSeconds === 59) {
				if (timerMinutes === 59) {
					/* one hour more */
					timerHours++;
					timerMinutes = 0;
					timerSeconds = 0;

				} else {
					/* just one minute more */
					timerMinutes++;
					timerSeconds = 0;
				}

			} else {
				timerSeconds++;
			}

			redrawTime();
		}, 1000);

		if (debug === true) alert('start timer');

	} else {
		if (debug === true) alert('timer already started!');
	}
}

function stopTimer() {
	if (timerIsOn === true) {
		endStamp = new Date().getTime();
		timerIsOn = false;
		clearInterval(timer);

		if (debug === true) alert('stop timer: ' + timerHours + ":" + timerMinutes + ":" + timerSeconds);

	} else {
		if (debug === true) alert('timer not running');
	}
}

function resetTimer() {
	if (timerIsOn === true) {
		timerIsOn = false;
		clearInterval(timer);
	}

	sessionIsSaved = 

	startStamp = 0;
	endStamp = 0;
	timerHours = 0;
	timerMinutes = 0;
	timerSeconds = 0;

	redrawTime();

	if (debug === true) alert('reset timer');
}

function postNewSession(startTime, endTime) {
	var jqxhr = $.ajax({
		type: "POST",
		url: "/api/add_session",
		dataType: "json",
		data: { start: startTime, end: endTime }

	}).done(function(response) {
		sessionIsSaved = true;
    	alert("Session successfully saved.");

  	}).fail(function() {
    	alert( "Error while saving session. Try it later." );
  	});
}

function saveSession() {
	if (sessionIsSaved !== true) {
		if (startStamp !== 0) {
			if (timerIsOn === true) {
				stopTimer();
			}

			postNewSession(startStamp, endStamp);

		} else {
			alert("Nothing to save.");
		}

	} else {
		alert('Already saved. Don\'t panic.');
	}
}

function redrawTime() {
	document.getElementById('timerHours').innerHTML = timerHours;
	document.getElementById('timerMinutes').innerHTML = normalizeMinutes(timerMinutes);
	document.getElementById('timerSeconds').innerHTML = normalizeMinutes(timerSeconds);
}

/* list sessions */
function listSessions() {
	var jqxhr = $.ajax({
		type: "GET",
		url: "/api/list_sessions"
	}).done(function(response) {
		var sessionCount = response.length;
		var i = 0;
		var content = "";
		var startStamp = 0;
		var endStamp = 0;

		if (sessionCount > 0) {
			content += '<ul class="list-group">';

			for (i = 0; i < sessionCount; i++) {
				startStamp = parseInt(response[i].start);
				endStamp = parseInt(response[i].end);

				content += '<li class="list-group-item">';

				content += '<b>' + minuteDiffWithStamps(startStamp, endStamp) + ' min</b>';

				content += '<span class="align-right">';

				content += '<em>' + hoursAndMinutesWithStamp(startStamp) + '</em>';
				content += ' — ';
				content += '<em>' + hoursAndMinutesWithStamp(endStamp) + '</em>';

				content += ', ';

				content += '<em>' + dateWithStamp(startStamp) + '</em>';

				content += '</span>';

				content += '</li>';
			}

			content += '</ul>';

		} else {
			content = '<div class="alert alert-warning">No sessions! Try adding one now.</div>';
		}

		document.getElementById('session-list').innerHTML = content;

	}).fail(function() {
		alert("Error while retrieving sessions!");
});}
