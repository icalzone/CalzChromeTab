var main = true;

// Set date, time, date alerts & welcome messages
var nday;
var nmonth;
var ndate;
var strdndth;
var hourtf;
var tday = new Array ("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
var tmonth = new Array ("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
setInterval(clock, 100);
function clock() {
  var d = new Date();
  nday = d.getDay()
  nmonth = d.getMonth()
  ndate = d.getDate();
  var nhour = d.getHours(), nmin = d.getMinutes(), ap;
  var thour = d.getHours();
  if (nhour === 0) {
    ap = " AM";
    nhour = 12;
  } else if (nhour < 12) {
    ap = " AM";
  } else if (nhour === 12) {
    ap = " PM";
  } else if (nhour > 12) {
    ap = " PM";
    nhour -= 12;
  };
  if (nmin <= 9) {
    nmin = "0" + nmin;
  };
  if (ndate === 1 || ndate === 21 || ndate === 31) {
    strdndth = "st";
  } else if (ndate === 2 || ndate === 22) {
    strdndth = "nd";
  } else if (ndate === 3 || ndate === 23) {
    strdndth = "rd";
  } else {
    strdndth = "th";
  };

  if (main) {
    if (getCookie("opTwntyFrHrTm") === "24") {
      hourtf = nhour + 12;
      innerHTML("clockBox", hourtf + ":" + nmin);
    } else {
      if (getCookie("opAMPM") === "show") {
        innerHTML("clockBox", nhour + ":" + nmin + ap);
      } else {
        innerHTML("clockBox", nhour + ":" + nmin);
      };
    };
  } else {
    if (getCookie("opTwntyFrHrTm") === "24") {
      hourtf = nhour + 12;
      innerHTML("clockBox", hourtf + ":" + nmin);
    } else {
      innerHTML("clockBox", nhour + ":" + nmin);
    };
  };

  //if (getCookie("opDteFom") === "1") {
    innerHTML("dateBox", tday[nday] + ", " + tmonth[nmonth] + " " + ndate + "<sup>" + strdndth + "</sup>");
  //} else if (getCookie("opDteFom") === "2") {
    //innerHTML("dateBox", tmonth[nmonth] + " " + ndate + "<sup>" + strdndth + "</sup>");
  //} else if (getCookie("opDteFom") === "3") {
    //innerHTML("dateBox", tday[nday] + ", " + ndate + " " + tmonth[nmonth]);
  //} else if (getCookie("opDteFom") === "4") {
    //innerHTML("dateBox", tmonth[nmonth] + " " + ndate + "<sup>" + strdndth + "</sup>");
  //};
};