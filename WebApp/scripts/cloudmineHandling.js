var showPlaylistsText = "(show previous Tempo Tuner playlists?)";
var hidePlaylistsText = "(hide previous Tempo Tuner playlists?)";
var noPreviousPlaylists = "No previous playlists found";

var ws = new cloudmine.WebService({
  appid: 'b861a061994146a5983f8d095979c2a1',
  apikey: '78ec1324d7a54f37ac9de1d8eb7dcccf'
});

/**
* Adds playlist to CloudMine
*/
function addToCloudMine(title, bpm, hipsterness, playlistGenre, songs, spotifyUserId, spotifyUrl){
	//have to put a copy of this "ws" variable in each function that uses it to appease Android WebView
	var ws = new cloudmine.WebService({
		appid: 'b861a061994146a5983f8d095979c2a1',
		apikey: '78ec1324d7a54f37ac9de1d8eb7dcccf'
	});
	
	//Date + time of creation of playlist
	var rawDate = new Date();
	var dateTime = rawDate.toUTCString();
	
	//Setting objects
	ws.set(null, {
		playlist: title, 
		tempo: bpm, 
		hipster: hipsterness, 
		genre: playlistGenre, 
		songCount: songs, 
		userID: spotifyUserId, 
		spotifyLink: spotifyUrl, 
		date: dateTime
		})
		.on('success', function(data, response) {  
			//console.log(data);
		}); //null can be changed to custom object name
}

function showHidePreviousPlaylists(){
	//have to put a copy of this "ws" variable in each function that uses it to appease Android WebView
	var ws = new cloudmine.WebService({
		appid: 'b861a061994146a5983f8d095979c2a1',
		apikey: '78ec1324d7a54f37ac9de1d8eb7dcccf'
	});
	
	var linkText = getPreviousPlaylistLink();
	
	if(linkText == showPlaylistsText){
		//searching for previously made searches by that user
		//var previousPlaylistArray = [];
		var userID = getUserId();
		ws.search('[userID = "' + userID + '"]').on('success', function(data, response) {
			//console.log(data);
	
			if(data.length!=0){	
				for (var id in data){
					var obj = data[id];
					var title = obj.playlist;
					var genre = obj.genre;
					var songs = obj.songCount;
					var spotifyURL = obj.spotifyLink;
					var date = obj.date;
					var previousPlaylistString = "You made a " + genre + " playlist titled: " + title + " on " + date + " with " + songs + " songs." + "\nSpotify link: " + spotifyURL;
					//You made a rock playlist titled: afds on Sun, 15 Mar 2015 23:23:12 GMT with 12 songs.
					//Spotify link: asdfjkl
					//console.log(previousPlaylistString);
					var previousPlaylistsText = getPreviousPlaylists();
					previousPlaylistsText = previousPlaylistsText + "<br>" + previousPlaylistString + "<br>";
					setPreviousPlaylists(previousPlaylistsText);
					//previousPlaylistArray.push(previousPlaylistString);
				}
				setPreviousPlaylistLink(hidePlaylistsText);
			}
			else {
				setPreviousPlaylists(noPreviousPlaylists);
			}
		});
	} else {
		setPreviousPlaylists("");
		setPreviousPlaylistLink(showPlaylistsText);
	}
}

/**
* Gets the link text from the previous playlist
* @return {string} previous playlist link text
*/
function getPreviousPlaylistLink() {
	return $("#showPreviousPlaylists").html();
}

/**
* Sets the link text from the previous playlist
* @param {string} previous playlist link text
*/
function setPreviousPlaylistLink(text) {
	$("#showPreviousPlaylists").html(text);
}

/**
* Gets text of previous playlists
* @return {string} previous playlists text
*/
function getPreviousPlaylists() {
	return $("#previousPlaylists").html();
}

/**
* Sets text of previous playlists
* @param {string} previous playlists text
*/
function setPreviousPlaylists(text) {
	$("#previousPlaylists").html(text);
}
