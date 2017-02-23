// // Options button click
// // if (main) {
// //   document.getElementById("options").addEventListener("click", function() {
// //     clearMenu("false");
// //     styleVisibility(300, "opM", "visible");
// //     styleOpacity(300, "opM", 0.9);
// //   }, false);
// // };

// // Options close
// // document.getElementById("opMclose").addEventListener("click", function() {
// //   clearMenu("true");
// // }, false);

// // Option menu options
//   // Show & hide the AM/PM
// // if (getCookie("opAMPM") === "") {
// //   setCookie("opAMPM", "show", 365);
// // };
// // var opAMPM = function(value) {
// //   if (value === "show") {
// //     setCookie("opAMPM", "show", 365);
// //     innerHTML("opAMPM", "Hide the AM/PM");
// //   } else if (value === "hide") {
// //     setCookie("opAMPM", "hide", 365);
// //     innerHTML("opAMPM", "Show the AM/PM");
// //   } else if (value === "pageLoad") {
// //     if (getCookie("opAMPM") === "show") {
// //       opAMPM("show");
// //     } else {
// //       opAMPM("hide");
// //     };
// //   };
// // };
// // document.getElementById("opAMPM").addEventListener("click", function() {
// //   if (getCookie("opAMPM") === "show") {
// //     opAMPM("hide");
// //   } else {
// //     opAMPM("show");
// //   };
// // }, false);
// // opAMPM("pageLoad");
// //   // Change your name
// // document.getElementById("opChngNme").addEventListener("click", function() {
// //   retriveUserName();
// // }, false);
// //   // Change the date format
// // document.getElementById("opChngeDteFrmt").addEventListener("click", function() {
// //   clearMenu("true");
// //   styleVisibility(300, "dteFom", "visible");
// //   styleOpacity(300, "dteFom", 0.9);
// // }, false);
// // document.getElementById("dteFomclose").addEventListener("click", function() {
// //   styleOpacity(0, "dteFom", 0);
// //   styleVisibility(300, "dteFom", 0);
// // }, false);
// // if (getCookie("opDteFom") === "") {
// //   setCookie("opDteFom", 1, 365);
// // };
// // setTimeout(function() {
// //   innerHTML("opDteFom1", tday[nday] + ", " + tmonth[nmonth] + " " + ndate + "<sup>" + strdndth + "</sup>");
// //   innerHTML("opDteFom2", tmonth[nmonth] + " " + ndate + "<sup>" + strdndth + "</sup>");
// //   innerHTML("opDteFom3", tday[nday] + ", " + ndate + " " + tmonth[nmonth]);
// //   innerHTML("opDteFom4", tmonth[nmonth] + " " + ndate + "<sup>" + strdndth + "</sup>");
// // }, 200);
// // document.getElementById("opDteFom1").addEventListener("click", function() {
// //   setCookie("opDteFom", 1, 365);
// // }, false);
// // document.getElementById("opDteFom2").addEventListener("click", function() {
// //   setCookie("opDteFom", 2, 365);
// // }, false);
// // document.getElementById("opDteFom3").addEventListener("click", function() {
// //   setCookie("opDteFom", 3, 365);
// // }, false);
// // document.getElementById("opDteFom4").addEventListener("click", function() {
// //   setCookie("opDteFom", 4, 365);
// // }, false);
//   // Hide or show the welcome messages
// // if (getCookie("opWlcmMsgs") === "") {
// //   setCookie("opWlcmMsgs", "show", 365);
// //   innerHTML("opWlcmMsgs", "Hide the welcome message");
// // } else if (getCookie("opWlcmMsgs") === "show") {
// //   innerHTML("opWlcmMsgs", "Hide the welcome message");
// // } else {
// //   innerHTML("opWlcmMsgs", "Show the welcome message");
// // };
// // document.getElementById("opWlcmMsgs").addEventListener("click", function() {
// //   if (getCookie("opWlcmMsgs") === "show") {
// //     setCookie("opWlcmMsgs", "hide", 365);
// //       innerHTML("opWlcmMsgs", "Show the welcome message");
// //     styleOpacity(0, "alertBox", 0);
// //   } else {
// //     setCookie("opWlcmMsgs", "show", 365);
// //       innerHTML("opWlcmMsgs", "Hide the welcome message");
// //     styleOpacity(0, "alertBox", 1);
// //   };
// // }, false);

//   // 24 hour time option
// if (getCookie("opTwntyFrHrTm") === "") {
//   setCookie("opTwntyFrHrTm", "12", 365);
//   innerHTML("opTwntyFrHrTm", "Change to 24 hour time");
// } else if (getCookie("opTwntyFrHrTm") === "12") {
//   setCookie("opTwntyFrHrTm", "12", 365);
//   innerHTML("opTwntyFrHrTm", "Change to 24 hour time");
// } else {
//   setCookie("opTwntyFrHrTm", "24", 365);
//   innerHTML("opTwntyFrHrTm", "Change to 12 hour time");
// };
// document.getElementById("opTwntyFrHrTm").addEventListener("click", function() {
//   if (getCookie("opTwntyFrHrTm") === "12") {
//     setCookie("opTwntyFrHrTm", "24", 365);
//     innerHTML("opTwntyFrHrTm", "Change to 12 hour time");
//   } else {
//     setCookie("opTwntyFrHrTm", "12", 365);
//     innerHTML("opTwntyFrHrTm", "Change to 24 hour time");
//   };
// }, false);
// if (getCookie("opGryscl") === "") {
//   setCookie("opGryscl", false, 365);
// } else if (getCookie("opGryscl") === "true") {
//   styleGrayscale(0, "header", "true");
// };
// var opGryscl = function() {
//   if (getCookie("opGryscl") === "true") {
//     setCookie("opGryscl", "false", 365);
//     styleGrayscale(0, "header", "false");
//   } else {
//     setCookie("opGryscl", "true", 365);
//     styleGrayscale(0, "header", "true");
//   };
// };
// document.getElementById("opGryscl").addEventListener("click", function() {
//   opGryscl();
// }, false);

// // Online/offline & Unsplash credit
// var onlineYN = function() {
//   if (main) {
//     styleOpacity(0, "dText", "1");
//     styleOpacity(2000, "dText", "0");
//     setTimeout(function() {
//       innerHTML("dText", "Not connected");
//       var i = new Image();
//       i.onload = function() {innerHTML("dText", "Connected")};
//       i.src = 'http://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png?d=' + escape(Date());
//     }, 2501);
//     styleOpacity(4000, "dText", "1");
//     styleOpacity(6000, "dText", "0");
//   };
// };