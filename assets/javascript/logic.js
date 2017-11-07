$(document).ready(function() {

  var config = {
    apiKey: "AIzaSyAH08gCmyuhWsZ-2HLKIatrYzH3iRYbnyc",
    authDomain: "mytravelpal-ebf41.firebaseapp.com",
    databaseURL: "https://mytravelpal-ebf41.firebaseio.com",
    projectId: "mytravelpal-ebf41",
    storageBucket: "mytravelpal-ebf41.appspot.com",
    messagingSenderId: "287994305952"
  };

  firebase.initializeApp(config);

  var database = firebase.database();
  var auth = firebase.auth();
  var user = firebase.auth().currentUser;
  var email = $("#email");
  var password = $("#password");
  var login = $("#login");
  var signup = $("#signup");
  var logout = $("#logout");
  var submit = $("#submit");
  var signupsub = $("#signupsubmit");
  var loginsub = $("#loginsubmit");
  var userlocation = $("#userlocation");
  var calendar = $("#calendar");
  var events = $("#events");
  var attractions = $("#attractions");
  var restaurants = $("#restaurants");
  var eventfulAPI = "app_key=Qm9xNFv7PP2fqZVZ";
  var eventfulURL = "http://api.eventful.com/json/events/search?"
  //var queryURL = "http://api.eventful.com/rest/events/search?" + "app_key=Qm9xNFv7PP2fqZVZ&" + "Houston" + "&" + "books";
  var eventfulQuery = "http://api.eventful.com/json/events/search?keywords=music&location=" + userlocation + "&app_key=Qm9xNFv7PP2fqZVZ";
  console.log(eventfulQuery);

  $("#submit").on("click", function(event) {
    event.preventDefault();
    $.ajax({
      url: eventfulQuery,
      method: "GET"
    }).done(function(response) {
      console.log(response);
    });
  });

  logout.hide();

  login.on('click', function(event) {
    console.log("login ran");
    //get email and password
    event.preventDefault();
    var emailval = email.val();
    var pass = password.val();
    var auth = firebase.auth();
    //var displayname = username.val();

    console.log(emailval);
    console.log(pass)
    //console.log(displayname)
    //Sign-in
    auth.signInWithEmailAndPassword(emailval, pass).then(function() {
        window.location.href = "locationselector.html";
      })
      .catch(function(error) {
        console.log('sign-in error', error.code)
      })

  });

  //sign-up event
  signup.on('click', function(event) {
    console.log("logout ran");
    //get email and password
    event.preventDefault();
    var emailval = email.val();
    var pass = password.val();
    var auth = firebase.auth();
    //var displayname = username.val();

    console.log(emailval);
    console.log(pass);
    //console.log(displayname);
    //Sign-in
    auth.createUserWithEmailAndPassword(emailval, pass).then(function() {
        window.location.href = "locationselector.html";
      })
      .catch(function(error) {
        console.log('sign-in error', error)
      })
    //window.location.href="locationselector.html";
  });

  //logout event
  logout.on('click', function() {
    firebase.auth().signOut();
  });

  //make sure the user is a user
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("They're a user");
      var email = user.email;
      var uid = user.uid;
      console.log(email);
      console.log(uid);
      logout.show();
      //window.location.href="locationselector.html";

    } else {
      console.log("not a user");
      logout.hide();
      // login.show();
      // $("#signin-page").show();
      // $("#game-page").hide();
    };
  });

  //Location Selector Page

  var googleQuery = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCmuGjtB5AKU9b4DFOD3c6m7g2I4jlTP_4&callback=initMap&libraries=places,visualization";

  $.ajax({
          url: googleQuery,
          method: "GET"
        }).done(function(response) {
            console.log(response);
        });



  //create calendar
  $(function() {
    $("#datepicker").datepicker({
      inline: true,
      firstDay: 1,
      showOtherMonths: true,
      dayNamesMin: ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"]
    });
  });


  submit.on("click", function() {
    var locationVal = userlocation.val();
    var calendarVal = calendar.val();
    console.log(locationVal);
    console.log(calendarVal);
    window.location.href = "eventselector.html";
  });
});
