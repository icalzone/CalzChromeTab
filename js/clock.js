// Finds current time and date, formats it properly
function startTime() {
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var strdndth = "th";
  var now = new Date();
  var time = [now.getHours(), now.getMinutes(), now.getSeconds()];
  var date = [now.getDate(), now.getDay(), now.getMonth(), now.getFullYear()];
  var hour = time[0];
  var mins = time[1];
  var secs = time[2];
  var ampm = hour >= 12 ? 'PM' : 'AM';
  var day = date[0];
  var weekday = dayNames[date[1]];
  var month = monthNames[date[2]];
  var year = date[3];
  strdndth = (day === 1 || day === 21 || day === 31) ? "st" : strdndth;
  strdndth = (day === 2 || day === 22) ? "nd" : strdndth;
  strdndth = (day === 3 || day === 23) ? "rd" : strdndth;
  hour = hour % 12;
  hour = hour ? hour : 12;
  mins = mins < 10 ? '0' + mins : mins;
  secs = secs < 10 ? '0' + secs : secs;
  document.getElementById('time').innerHTML = hour + ':' + mins + ':' + secs + ' ' + ampm;
  document.getElementById('date').innerHTML = weekday + ', ' + month + ' ' + day + ', ' + year;
  var t = setTimeout(startTime, 500);
}