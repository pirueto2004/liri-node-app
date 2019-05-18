# liri-node-app
LIRI is a _Language_ Interpretation and Recognition Interface that can search  Spotify for songs, Bands in Town for concerts, and OMDB for movies. LIRI will be a command line node app that takes in parameters and gives you back data.

The user has the option of using four commands (listed below) in conjuntion with specific parameters associated with the commands. Liri.js can take in one of the following commands:

1. `node liri.js concert_this <artist/band name here>` 
    * This searches the Bands in Town Artist Events API for an artist and renders the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")

2. `node liri.js spotify_this_song <song name here>`
     * This shows the following information about the song in your terminal/bash window

     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

   * If no song is provided then your program will default to "The Sign" by Ace of Base.

3. `node liri.js movie_this <movie name here>`
    This outputs the following information to your terminal/bash window:
    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.
    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

4. `node liri.js do_what_it_says`
     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

How to use Liri.js:

-Open your terminal such as Bash.

-Navigate to the folder that contains the liri.js file.

-Depending on the command you run, the output will vary.

**Example 1**: Run the `concert_this` command

node liri.js concert_this <name of artist or band>

Output: The system will display a list of all events and locations where the artist or band will perform. It can result in multiple records. The system will also log all the results in the log.txt file. See screen-shot below:

![Results](/screenshots/concert_this_results.PNG)

**Example 2**: Run the `spotify_this_song` command

 node liri.js spotify_this_song <name of song>

Output: The system will display a list of information associated with the song. It can result in multiple records. The system will also log all the results in the log.txt file. See screen-shot below:

![Results](/screenshots/spotify_this_song_results.PNG)

**Example 3**: Run the `movie_this` command

 node liri.js movie_this <name of movie>

Output: The system will display information associated with the movie. The system will also log all the results in the log.txt file. See screen-shot below:

![Results](/screenshots/movie_this_results.PNG)

**Example 4**: Run the do_what_it_says command

 node liri.js do_what_it_says

Output: The system will read the text in the random.txt file, and perform the comman listed in the random.txt file.

See screen-shot below:

![Results](/screenshots/do_what_it_says_results.PNG)

TECHNOLOGIES USED
Javascript
Nodejs
Node packages:
    Node-Spotify-API
    Request
    Moment
    DotEnv
APIs used:
    Bands in Town
    OMDB
Git
GitHub

