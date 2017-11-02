$(document).ready(function(){

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
  	var signupsub = $("#signupsubmit");
  	var loginsub = $("#loginsubmit");
  	var userlocation = $("#userlocation");
  	var calendar = $("#calendar");
  	var events = $("#events");
  	var attractions = $("#attractions");
  	var restaurants = $("#restaurants");
  	var eventfulAPI = "app_key=Qm9xNFv7PP2fqZVZ";
  	var eventfulURL = "http://api.eventful.com/rest/events/search?"
	var queryURL = "http://api.eventful.com/rest/events/search?" + "app_key=Qm9xNFv7PP2fqZVZ&" + "Houston" + "&" + "books";
		console.log(queryURL);

  	$.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
        console.log(response.data);
    });
});
