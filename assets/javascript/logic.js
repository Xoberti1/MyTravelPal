//variable for google map (it has to be in global scope)
var googleMap;

//this is the function to render a google map
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
// Firebase configuration code
  var config = {
    apiKey: "AIzaSyAH08gCmyuhWsZ-2HLKIatrYzH3iRYbnyc",
    authDomain: "mytravelpal-ebf41.firebaseapp.com",
    databaseURL: "https://mytravelpal-ebf41.firebaseio.com",
    projectId: "mytravelpal-ebf41",
    storageBucket: "mytravelpal-ebf41.appspot.com",
    messagingSenderId: "287994305952"
  }; 

  firebase.initializeApp(config);

// variables
  var database = firebase.database();
  var auth = firebase.auth();
  var user = firebase.auth().currentUser;
  var email = $("#email");
  var password = $("#password");
  var login = $("#login");
  var signup = $("#signup");
  var logout = $("#logout");
  var logout2 = $("#logout2");
  var logout3 = $("#logout3");
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
  var locationSelector = $("#locationSelector");
  var resultsPage = $("#resultsPage");
  var resultsPage = $("#resultsPage");
  var dateFormat = "";
  var content = "";
  var foursquareClientID = "H0YEHH5DRVVEMJKR2ALTMRWEGFNKKXT21AQTWVFTWTLNG1TM";
  var foursquareClientSecret = "1KZDNOHSXFBTWFHDHFZ4X3DFAZHWAAYXD1HCRY0XLXA33L2C";
  var eventfulAPI = "app_key=Qm9xNFv7PP2fqZVZ";
  var eventfulURL = "http://api.eventful.com/json/events/search?"
  var locationVal = "";
  var calendarVal = "";
  var restaurantsVal = "";
  var eventVal = "";

  logout.hide();
  eventSelector.hide();
  resultsPage.hide();

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

  //logout location selector
  logout.on('click', function() {
    firebase.auth().signOut();
    window.location.href="homepage.html";
  });

  //logout event selector
  logout2.on('click', function() {
    firebase.auth().signOut();
    window.location.href="homepage.html";
  });

  //logout result selector
  logout3.on('click', function() {
    firebase.auth().signOut();
    window.location.href="homepage.html";
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
    } 
    else {
      console.log("not a user");
      logout.hide();
    };
  });

//location selector page stores user location and date on submit
  submit.on("click", function(event) {
    event.preventDefault();
    locationVal = userlocation.val().trim();
    calendarVal = calendar.val().trim();
    dateFormat = moment(calendarVal).format('YYYYMMDD');
    //window.location.href = "eventselector.html";
    eventSelector.show();
    locationSelector.hide();
    resultsPage.hide();
  });

//on submit event data and restaurant data will be stored and put into api calls
  submit2.on("click", function(e) {
    e.preventDefault();
    eventVal = $("#dropdown-content").val().trim();
    restaurantsVal = restaurants.val().trim();
    eventSelector.hide();
    locationSelector.hide();
    resultsPage.show();

    //api urls
    var foursquareQuery = "https://api.foursquare.com/v2/venues/search?client_id=H0YEHH5DRVVEMJKR2ALTMRWEGFNKKXT21AQTWVFTWTLNG1TM&client_secret=1KZDNOHSXFBTWFHDHFZ4X3DFAZHWAAYXD1HCRY0XLXA33L2C&categoryId=4d4b7105d754a06374d81259&limit=5&near=" + locationVal + "&v=20130815 &ll=40.7,-74 &query=" + restaurantsVal;
    var eventfulQuery = "http://api.eventful.com/json/events/search?keywords=" + eventVal + "&location=" + locationVal + "&date=" + dateFormat + "&page_size=5&app_key=Qm9xNFv7PP2fqZVZ";

    //ajax call for foursquare api
    $.ajax({
      url: foursquareQuery,
      method: "GET",
      dataType: 'jsonp'
    }).done(function(foursquareRes) {
      // once this has happened put the information into google maps
      console.log(foursquareRes);
      //create a new google map when a search it run
      googleMap = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          center: foursquareRes.response.geocode.feature.geometry.center
        });
      // the data from each item in the api call will be run through this way
        $.each(foursquareRes.response.venues, function(key, value){
          // the data is made readable this way
          content = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h3 id="firstHeading" class="firstHeading">' + value.name + '</h3>' +
            '<div id="bodyContent">' + value.contact.formattedPhone + '</div>' + '<div id=contact>' + value.location.formattedAddress + '</div>';
          //when you click the pin on the map the readable data written to content will be presented in a text bubble
          var infowindow = new google.maps.InfoWindow({
            content: content
          });
          //this makes the pins appear at the latitude and longitude listed for each item
          var marker = new google.maps.Marker({
            position: {lat:value.location.lat, lng:value.location.lng},
            map: googleMap,
            title: value.name
          });
          //this makes the info window work when clicking the marker
          marker.addListener('click', function() {
            infowindow.open(googleMap, marker);
          });
          //turns the data in content into a list below the map
          $("#details").append(content);

      });
      
    });

    //ajax call run on the submit click
    $.ajax({
      url: eventfulQuery,
      method: "GET",
      dataType: 'jsonp'
    }).done(function(googleResponse) {
      console.log(googleResponse);
      //once data is returned the call is mined for data at listed location
        $.each(googleResponse.events.event, function(key, value){
          // the data is made readable this way
          content = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h3 id="firstHeading" class="firstHeading">' + value.venue_name + '</h3>' +
            '<div id="bodyContent">' + value.venue_address + '</div>' + '<div id=url>' + value.url + '</div>' + '<div id=startTime>Start Time: ' + value.start_time + '</div>';
          //when you click the pin on the map the readable data written to content will be presented in a text bubble
          var infowindow = new google.maps.InfoWindow({
            content: content
          });
          //this makes the info window work when clicking the marker
          var marker = new google.maps.Marker({
            position: {lat:parseFloat(value.latitude), lng:parseFloat(value.longitude)},
            title: value.venue_name,
            map:googleMap
          });
          //this makes the info window work when clicking the marker
          marker.addListener('click', function() {
            infowindow.open(googleMap, marker);
          });
          //turns the data in content into a list below the map
          $("#details").append(content);

      });

    });  

  });  

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

