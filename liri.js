require("dotenv").config();
var keys = require("./keys.js");
var command = process.argv[2];
var query = process.argv[3];



var myTweets = function() {
	var Twitter = require('twitter');
	var client = new Twitter(keys.twitter);
	var par = {
		count: 20
	};
	client.get('statuses/user_timeline', par, function(err, tweets, response) {
		if(err) {
			return console.log(err);
		} else {
	  	console.log("My 20 Most Recent Tweets");
	  	console.log("");

	  	for(var i = 0; i < tweets.length; i++) {
	  		console.log( i + 1 + " )  " + tweets[i].text);
	  		console.log("Created:  " + tweets[i]);
	  		console.log("");
	  	}
	  }
	});
}

var spotifySong = function(trkQuery) {
	var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
	
	


	spotify.search({ type: 'track', query: trkQuery }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  } else{
  	for(var i = 0; i < data.tracks.items[0].artists.length; i++) {
					if(i === 0) {
						console.log("Artist(s):    " + data.tracks.items[0].artists[i].name);
					} else {
						console.log("              " + data.tracks.items[0].artists[i].name);
					}
				}
				console.log("Song:         " + data.tracks.items[0].name);
				console.log("Preview Link: " + data.tracks.items[0].preview_url);
				console.log("Album:        " + data.tracks.items[0].album.name);
  }
});
}

var movie = function(mveQuery) {
	var request = require("request");
	
	request("http://www.omdbapi.com/?t=" + mveQuery + "&y=&plot=short&r=json", function(err, response, body) {
	  if (!err && response.statusCode === 200) {
	    console.log("Movie Title:         " + JSON.parse(body).Title);
	    console.log("Release Year:    " + JSON.parse(body).Year);
	    console.log("IMDB Rating:   " + JSON.parse(body).imdbRating);
	    console.log("Country:           " + JSON.parse(body).Country);
	    console.log("Language:      " + JSON.parse(body).Language);
	    console.log("Plot of the movie:          " + JSON.parse(body).Plot);
	    console.log("Actors:        " + JSON.parse(body).Actors);

	  }
	});
}

if(command === "my-tweets") {
	myTweets();
} else if(command === "spotify-this-song") {
	spotifySong(query);
} else if(command === "movie-this") {
	movie(query);
} else if(command === "do-what-it-says") {
	var fs = require("fs");

	fs.readFile("random.txt", "utf-8", function(error, data) {
		var command;
		var query;

		
		if(data.indexOf(",") !== -1) {
			var dataArr = data.split(",");
			command = dataArr[0];
			query = dataArr[1];
		} else {
			command = data;
		}

		
		if(command === "my-tweets") {
			myTweets();
		} else if(command === "spotify-this-song") {
			spotifySong(query);
		} else if(command === "movie-this") {
			movie(query);
		} else {
			console.log("Please try again.")
		}
	});
} else if(command === undefined) { 
	console.log("Please enter a command to run LIRI.")
} else {
	console.log("Command not recognized! Please try again.")
}
	
	



