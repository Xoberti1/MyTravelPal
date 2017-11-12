var googleMap;


function initMap() {
  var uluru = {lat: -25.363, lng: 131.044};
  var googleMap = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });

  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });

}

$(document).ready(function() {

}

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
  var submit2 = $("#submit2");
  var signupsub = $("#signupsubmit");
  var loginsub = $("#loginsubmit");
  var userlocation = $("#userlocation");
  var calendar = $("#datepicker");
  var events = $("#events");
  var attractions = $("#attractions");
  var restaurants = $("#restaurants");
  var results = $("#results");
  var eventSelector = $("#eventSelector");
  var locationSelector = $("#locationSelector")
  var dateFormat = "";
  var content = "";
  var foursquareClientID = "H0YEHH5DRVVEMJKR2ALTMRWEGFNKKXT21AQTWVFTWTLNG1TM";
  var foursquareClientSecret = "1KZDNOHSXFBTWFHDHFZ4X3DFAZHWAAYXD1HCRY0XLXA33L2C";
  var eventfulAPI = "app_key=Qm9xNFv7PP2fqZVZ";
  var eventfulURL = "http://api.eventful.com/json/events/search?"
  //var queryURL = "http://api.eventful.com/rest/events/search?" + "app_key=Qm9xNFv7PP2fqZVZ&" + "Houston" + "&" + "books";
  //var eventfulQuery = "http://api.eventful.com/json/events/search?keywords=music&location=" + locationVal + "&date=" + dateFormat + "&app_key=Qm9xNFv7PP2fqZVZ";
  var locationVal = "";
  var calendarVal = "";
  var restaurantsVal = "";
  var eventVal = "";
  console.log(locationVal);
  console.log(calendarVal);
  logout.hide();
  eventSelector.hide();
  login.on('click', function(event) {
    console.log("login ran");
    //get email and password
    event.preventDefault();
    var emailval = email.val();
    var pass = password.val();
    var auth = firebase.auth();
    console.log(emailval);
    console.log(pass)
    auth.signInWithEmailAndPassword(emailval, pass).then(function() {
        window.location.href = "locationselector.html";
      })
      .catch(function(error) {
        console.log('sign-in error', error.code)
      })
  });
  //sign-up event
  signup.on('click', function(event) {
    console.log("signup ran");
    //get email and password
    event.preventDefault();
    var emailval = email.val().trim();
    var pass = password.val().trim();
    var auth = firebase.auth();
    console.log(emailval);
    console.log(pass);
    auth.createUserWithEmailAndPassword(emailval, pass).then(function() {
        window.location.href = "locationselector.html";
      })
      .catch(function(error) {
        console.log('sign-in error', error)
      })
  });
  //logout event
  logout.on('click', function() {
    firebase.auth().signOut();
    window.location.href = "homepage.html";
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
    } else {
      console.log("not a user");
      logout.hide();
    };
  });
  submit.on("click", function(event) {
    event.preventDefault();
    locationVal = userlocation.val().trim();
    calendarVal = calendar.val().trim();
    console.log(locationVal, "locationVal ran");
    console.log(calendarVal, "calendarVal ran");
    dateFormat = moment(calendarVal).format('YYYYMMDD');
    console.log(dateFormat);
    //window.location.href = "eventselector.html";
    eventSelector.show();
    locationSelector.hide();
  });
  submit2.on("click", function() {
    eventVal = $("#dropdown-content").val().trim();
    restaurantsVal = restaurants.val().trim();
    console.log(restaurantsVal, "restaurantsVal ran");
    var foursquareQuery = "https://api.foursquare.com/v2/venues/search?client_id=H0YEHH5DRVVEMJKR2ALTMRWEGFNKKXT21AQTWVFTWTLNG1TM&client_secret=1KZDNOHSXFBTWFHDHFZ4X3DFAZHWAAYXD1HCRY0XLXA33L2C&categoryId=4d4b7105d754a06374d81259&near=" + locationVal + "&v=20130815 &ll=40.7,-74 &query=" + restaurantsVal;
    var eventfulQuery = "http://api.eventful.com/json/events/search?keywords=music&location=" + locationVal + "&date=" + dateFormat + "&app_key=Qm9xNFv7PP2fqZVZ";
    console.log(foursquareQuery);
    console.log(eventfulQuery);
    console.log(dateFormat);
    console.log(locationVal);

    $.ajax({
      url: foursquareQuery,
      method: "GET",
      dataType: 'jsonp'
    }).done(function(foursquareRes) {
      console.log(foursquareRes);
      googleMap = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          center: foursquareRes.response.geocode.feature.geometry.center
        });
        $.each(foursquareRes.response.venues, function(key, value){
          // do stuff here
          content = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h3 id="firstHeading" class="firstHeading">' + value.name + '</h3>' +
            '<div id="bodyContent">' + value.contact.formattedPhone + '</div>' + '<div id=contact>' + value.location.formattedAddress + '</div>';

          var infowindow = new google.maps.InfoWindow({
            content: content
          });
          var marker = new google.maps.Marker({
            position: {lat:value.location.lat, lng:value.location.lng},
            map: googleMap,
            title: value.name
          });

          marker.addListener('click', function() {
            infowindow.open(googleMap, marker);
          });

          $("#details").append(content);

      });
      //Show you map

    });
    $.ajax({
      url: eventfulQuery,
      method: "GET",
      dataType: 'jsonp'
    }).done(function(response) {
      console.log(response);
    });
  });
  // Location Selector Page
  // var googleQuery = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCmuGjtB5AKU9b4DFOD3c6m7g2I4jlTP_4&callback=initMap&libraries=places,visualization";
  // $.ajax({
  //   url: googleQuery,
  //   method: "GET",
  //   dataType: 'jsonp'
  // }).done(function(response) {
  //   console.log(response);
  //});
  //create calendar
  $(function() {
    calendar.datepicker({
      inline: true,
      firstDay: 1,
      showOtherMonths: true,
      dayNamesMin: ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"]
    });
  });
});
