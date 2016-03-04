/*
README: The variables at the top are all you need to set things to for objects to be created. They should all be strings.
I have formatted the output of the previous playlists to previousPlaylistArray. The output is formatted like so: 

You made a Rock playlist titled: TestingPlaylist on Sun, 15 Mar 2015 23:33:21 GMT with 20 songs.
Spotify link here: Spotify Playlist Link

If you want to test to see if it works uncomment the testing variables and console.log(previousPlaylistString); in the for loop of the search function.

*/

var ws = new cloudmine.WebService({
  appid: 'b861a061994146a5983f8d095979c2a1',
  apikey: '78ec1324d7a54f37ac9de1d8eb7dcccf'
});

//Creating variables needed
var title; //title of playlist
var BPM; //tempo of playlist
var hipsterness; // obscurity of music on playlist
var genre; //genre of music in the playlist
var songs; //How many songs are in the play list
var userID; //Users Spotify ID for previous searches
var spotifyURL;

//Date + time of creation of playlist
var rawDate = new Date();
var date = rawDate.toUTCString();


//testing variables
title = "TestingPlaylist";
bpm = "353";
hipsterness = ".12";
genre = "Rock";
songs = "20";
userID = "tempoTuner";
spotifyURL = "Spotify Playlist Link";


//Setting objects
ws.set(null, {playlist: title, tempo: bpm, hipster: hipsterness, genre: genre, songCount: songs, userID: userID, spotifyLink: spotifyURL, date: date}).on('success', function(data, response) {  
	//console.log(data);
}); //null can be changed to custom object name


//searching for previously made searches by that user
var previousPlaylistArray = [];
var previousPlaylistString;

ws.search('[userID = "' + userID + '"]').on('success', function(data, response) {
	//console.log(data);
	
	if(data.length!=0){	
		for (var id in data){
			var obj = data[id];
			title = obj.playlist;
			genre = obj.genre;
			songs = obj.songCount;
			spotifyURL = obj.spotifyLink;
			date = obj.date;
			previousPlaylistString = "You made a " + genre + " playlist titled: " + title + " on " + date + " with " + songs + " songs." + "\nSpotify link here: " + spotifyURL;
			//You made a rock playlist titled: afds on Sun, 15 Mar 2015 23:23:12 GMT with 12 songs.
			//Spotify link here: asdfjkl
			//console.log(previousPlaylistString);
			previousPlaylistArray.push(previousPlaylistString);
		}
	}

});
