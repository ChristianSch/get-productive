var timerIsOn = false;
var timer;
var timerSeconds = 0;
var timerMinutes = 0;
var timerHours = 0;

/* prevent multiple savings of the very same session */
var sessionIsSaved = false;

var startStamp = 0;
var endStamp = 0;

var debug = false;

$(document).ready(function() {
    document.getElementById('startTimerButton').onclick = startTimer;
    document.getElementById('stopTimerButton').onclick = stopTimer;
    document.getElementById('resetTimerButton').onclick = resetTimer;
    document.getElementById('saveSessionButton').onclick = saveSession;

    document.getElementById('sessionListButton').onclick = listSessions;
    document.getElementById('refreshSessionList').onclick = listSessions;
});

/* Timer methods */
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

        if (debug) console.log('start timer');

    } else {
        if (debug) console.log('timer already started!');
    }
}

function stopTimer() {
    if (timerIsOn === true) {
        endStamp = new Date().getTime();
        timerIsOn = false;
        clearInterval(timer);

        if (debug) console.log('stop timer: ' + timerHours + ":" + timerMinutes + ":" + timerSeconds);

    } else {
        if (debug) console.log('timer not running');
    }
}

function resetTimer() {
    if (timerIsOn === true) {
        timerIsOn = false;
        clearInterval(timer);
    }

    sessionIsSaved = false;

    startStamp = 0;
    endStamp = 0;
    timerHours = 0;
    timerMinutes = 0;
    timerSeconds = 0;

    redrawTime();

    if (debug === true) console.log('reset timer');
}

function postNewSession(startTime, endTime) {
    var jqxhr = $.ajax({
        type: "POST",
        url: "/api/add_session",
        dataType: "json",
        data: {
            start: startTime,
            end: endTime
        }

    }).done(function(response) {
        sessionIsSaved = true;

    }).fail(function() {
        /* TODO: save in local storage for later saving */
        alert("Error while saving session. Try it later.");
    });
}

function saveSession() {
    if (!sessionIsSaved) {
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
    $('#timerHours').html(timerHours);
    $('#timerMinutes').html(normalizeMinutes(timerMinutes));
    $('#timerSeconds').html(normalizeMinutes(timerSeconds));
}

/* list sessions */
function listSessions() {
    var spinnerMarkup = '<img src="/public/images/loader.gif" alt="" class="ajax-loader">';
    var noSessionsWarningMarkup = '<div class="alert alert-warning">No sessions! Try adding one now.</div>';
    var errorMarkup = '<div class="alert alert-danger">Sorry! There was an error while refreshing the data. Please try again later.</div>';
    /*
        Display the spinner to indicate that something is going on.
        Either there is old content that should not be overwritten
        or the spinner is the only content to display right now.
     */
    if (!$('#session-list').children().hasClass('list-group')) {
        // Don't replace actual content with the spinner
        $('#session-list').html(spinnerMarkup);
    } else {
        var oldContent = $('#session-list').html();
        $('#session-list').html(spinnerMarkup + oldContent);
    }

    var jqxhr = $.ajax({
        type: "GET",
        url: "/api/list_sessions",
        timeout: 5 * 1000 // 20s timeout
    }).done(function(response) {
        var sessionCount = response.length;
        var i = 0;
        var content = "";
        var id = 0;
        var startStamp = 0;
        var endStamp = 0;

        if (sessionCount > 0) {
            content += '<ul class="list-group">';

            for (i = 0; i < sessionCount; i++) {
                id = response[i]._id;
                startStamp = parseInt(response[i].start);
                endStamp = parseInt(response[i].end);

                content += '<li id="' + id + '" class="list-group-item">';

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
            content = noSessionsWarningMarkup;
        }

        $('#session-list').html(content);

    }).fail(function(response) {
        if (debug) console.log(response.responseText);

        if (!$('#session-list').children().hasClass('list-group')) {
            $('#session-list').html(errorMarkup);

        } else {
            var oldContent = $('#session-list').html();
            $('#session-list').html(errorMarkup + oldContent);
        }

        /* Now the spinner needs to be removed. Note that if there is no childen with
        class 'ajax-loader', nothing gets removed at all. */
        $('#session-list').children('.ajax-loader').remove();
    });
}
