var loginForm = $("form.login");
var emailInput = $("input#email-input");
var passwordInput = $("input#password-input");
var leafletData;

loginForm.on("submit", function(event) {
  event.preventDefault();
  var userData = {
    email: emailInput.val().trim(),
    password: passwordInput.val().trim()
  };

  if (!userData.email || !userData.password) {
    return;
  }

  loginUser(userData.email, userData.password);
  emailInput.val("");
  passwordInput.val("");
});

function loginUser(email, password) {
  $.post("/api/login", {
    email: email,
    password: password
  }).then(function(data) {
    window.location.replace(data);
  }).catch(function(err) {
    console.log(err);
  });
};

function pctToPCT(elementID) {
  // takes a data-nonPct element and turns it into a percentage string
  $(elementID).text(function() {
    return ($(this).attr("data-nonPct") * 100).toFixed(2) + "%";
  });
};

$(document).ready(function() {
   $(".button-collapse").sideNav();
   leafData();

   if ($('#county-name')) {
     getData($('#county-name').attr("data-fips"));
     pctToPCT('#turnout');
     pctToPCT('#pie-legend-total-turn')
   };
});
