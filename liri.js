
// TODO Grab the axios package...
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
//Import the Spotify API
const Spotify = require("node-spotify-api");

require("dotenv").config();
//Import our Keys File
const keys = require("./keys.js");

//Create a Spotify Client
let spotify = new Spotify(keys.spotify);


//Get all the arguments of the input starting in argument in position [3] and concatenating them with a ' ' space.
let userInput = process.argv.splice(3).join(' ');
let userTopic = process.argv[2];      
  
//This function uses the Bands in Town Artist Events API. 
//An axios.get sent the search request and the results are console.logged using moment to change the format of the returned date.
function concert_this (artistName) {
  let queryURL = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";
  console.log("Upcoming Concerts of " + artistName);
  axios.get(queryURL)
    .then(artistResponse => {
      let events = artistResponse.data;
      events.forEach((item) => {
      console.log("Name of the venue: ", item.venue.name);
      console.log("Venue Location: ", item.venue.city);
      let date = moment(item.datetime);
      console.log("Date of the event: ", date.format("MM/DD/YYYY"));
      
    });
     
    })
    .catch(err => {
      console.log(err);
    });
};

//This function uses the Spotify request API. A node-spotify-api spotify.request sent the search request and the results are console.logged.
function spotify_this_song(songName) { 
  let queryURL = "https://api.spotify.com/v1/search?q=track:" + songName + "&type=track&limit=1";
  console.log("Song: " + songName);
  //Make a request to Spotify
  spotify.request(queryURL)
  .then(function (songResponse) {
    let tracks = songResponse.tracks.items;//array of tracks
    tracks.forEach(function (track) {

      //build artist block
      let artists = track.artists; //array
      let artistsNames = [];
      artists.forEach(function (artist) {
          artistsNames.push(artist.name);
      });

      //build trackData block
      var trackData = [
        'Artist (s): ' + artistsNames.join(' & '),
        'Song: ' + track.name,
        'Album: ' + track.album.name,
        track.preview_url ? 'Preview URL: ' + track.preview_url : 'Preview URL: ' + 'none provided'
      ].join('\n');

      // console.log(artistsNames.join(' & '));
      console.log(trackData);
    });
    
  })
      
  .catch(function (err) {
      console.log(err);
      throw err;
  });

};

//This function uses the omdb API. An axios.get sent the search request and the results are console.logged.
function movie_this(movieName){
  let queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=92a1ec29";
  console.log("Watch this movie " + movieName);
  axios.get(queryURL)
    .then(movieResponse => {
        console.log("Title: " + movieResponse.data.Title);
        console.log("Year: " + movieResponse.data.Year);
        console.log("Rated: " + movieResponse.data.imdbRating);
        console.log("Country: " + movieResponse.data.Country);
        console.log("Language: " + movieResponse.data.Language);
        console.log("Plot: " + movieResponse.data.Plot);
        console.log("Actors: " + movieResponse.data.Actors);
           
    })
    .catch(err => {
      console.log(err);
    });
};

//This function pulls the spotify_this_song information from the local random.txt file.
function do_What_It_Says() {

  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
      var output = data.split(",");
      for (var i = 0; i < output.length; i++) {
          console.log(output[i]);
      }
    });
};

//This function returns the artist name
function artistInfo(){
  var artistName = "";
  artistName = userInput;
   return artistName;
};
//This function returns the track name
  function songInfo(){
    var songName = "";
    songName = userInput;
    return songName;
  };

  //This function returns the movie name
  function movieInfo(){
    var movieName = "";
    movieName = userInput;
    return movieName;
  };

//Handling the user topics
switch (userTopic) {
  case "concert_this":
        concert_this(artistInfo());
        break;
  case "spotify_this_song":
        spotify_this_song(songInfo());
        break;
  case "movie_this":
        movie_this(movieInfo());
        break;
  case "do_what_it_says":  
        do_What_It_Says();
        break;
};