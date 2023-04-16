// set the target stop time to 12PM in the user's timezone
var targetStopTime = new Date();
targetStopTime.setHours(-1,0,0,0);

// calculate the time remaining in milliseconds
var timeRemaining = targetStopTime.getTime() - new Date().getTime();

// update the countdown timer every second
var countdownTimer = setInterval(function () {
  // get the remaining time in hours, minutes, and seconds
  var hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  // display the remaining time in HH:MM:SS format
  var countdownElement = document.getElementById("countdown");
  countdownElement.innerHTML = hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");

  // decrement the remaining time by one second
  timeRemaining -= 1000;

  // if the countdown has finished, stop the timer and display a message
  if (timeRemaining < 0) {
      clearInterval(countdownTimer);
      countdownElement.innerHTML = "投票已结束。";
      document.getElementById('vote-select').style.display = "none"
      document.getElementById('vote-button').style.display = "none"
  }
}, 1000);
