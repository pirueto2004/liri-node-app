
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
//Get user topic of the input argument in position [2], basically the function used for the search 
//(concert_this, spotify_this_song, movie_this, or do_what_it_says).
let userTopic = process.argv[2];      
  
//This function uses the Bands in Town Artist Events API to search for concerts or events of artists/bands. 
//An axios.get sent the search request and the results are console.logged using moment to change the format of the returned date.
function concert_this (artistName) {
  let queryURL = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";
  console.log("===================================" + "\n" + "Upcoming Concerts of " + artistName + "\n" + "===================================" + "\n");
  logOutputData("===================================" + "\n" + "Upcoming Concerts of " + artistName + "\n" + "===================================" + "\n");
  axios.get(queryURL)
    .then(artistResponse => {
      let events = artistResponse.data;
      events.forEach((item) => {
        let date = moment(item.datetime);
        let eventsData = [
          "Name of the venue: " + item.venue.name,
          "Venue Location: " + item.venue.city + ", " + item.venue.country,
          "Date of the event: " + date.format("MM/DD/YYYY") + "\n"
        ].join("\n");
      
      console.log(eventsData);
      logOutputData(eventsData);
    });
     
    })
    .catch(err => {
      console.log(err);
    });
};

//This function uses the Spotify request API. A node-spotify-api request sent to search for a track or song. Request and the results are console.logged.
function spotify_this_song(songName) { 
  let queryURL = "https://api.spotify.com/v1/search?q=track:" + songName + "&type=track&limit=1";
  console.log("======================" + "\n" +"Song: " + songName + "\n" + "======================" + "\n");
  logOutputData("======================" + "\n" +"Song: " + songName + "\n" + "======================" + "\n");
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
      let trackData = [
        "Artist (s): " + artistsNames.join(' & '),
        "Song: " + track.name,
        "Album: " + track.album.name,
        track.preview_url ? "Preview URL: " + track.preview_url : "Preview URL: " + "none provided" + "\n"
      ].join("\n");

      // console.log(artistsNames.join(' & '));
      console.log(trackData);
      logOutputData(trackData);
    });
    
  })
      
  .catch(function (err) {
      console.log(err);
      throw err;
  });

};

//This function uses the omdb API to search for movies. An axios.get sent the search request and the results are console.logged.
function movie_this(movieName){
  let queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=92a1ec29";
  console.log("===============================" + "\n" +"Watch this movie: " + movieName + "\n" + "===============================" + "\n");
  logOutputData("===============================" + "\n" +"Watch this movie: " + movieName + "\n" + "===============================" + "\n");
  axios.get(queryURL)
    .then(movieResponse => {
        let movieData = [
          "Title: " + movieResponse.data.Title,
          "Year: " + movieResponse.data.Year,
          "Rated: " + movieResponse.data.imdbRating,
          "Country: " + movieResponse.data.Country,
          "Plot: " + movieResponse.data.Plot,
          "Actors: " + movieResponse.data.Actors + "\n"
        ].join("\n");

        console.log(movieData);
        logOutputData(movieData);
        
                   
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
  if (userInput){
    artistName = userInput;
  }
  else {
    artistName = "Default";
  }
   return artistName;
};
//This function returns the track name
  function songInfo(){
    var songName = "";
    if (userInput){
      songName = userInput;
    }
    else {
      songName = "The Sign by Ace of Base"; //default song
    }
    return songName;
  };

  //This function returns the movie name
  function movieInfo(){
    var movieName = "";
    if (userInput) {
      movieName = userInput;
    }
    else {
      movieName = "Mr. Nobody";//default movie
    }
    
    return movieName;
  };

  //This function appends data to file 'log.txt'
  function logOutputData(response){
    fs.appendFile("log.txt", "\n" + response, function(error) {
      if (error) {
        return console.log(error);
      }
   });
  };
 
  //This function delete all content in file 'log.txt'
  function emptyFile(){
    fs.writeFile("log.txt", " ", function(error) {
      if (error) {
        return console.log(error);
      }
   });
  };

  // emptyFile();

//Handling the user topics and executes the corresponding functions
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
  default: 
        console.log("Invalid Option. Please type any of the following options: \nconcert_this \nspotify_this_song \nmovie_this \ndo_what_it_says")
    
};