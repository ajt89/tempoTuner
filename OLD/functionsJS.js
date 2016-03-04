function getSongURIs(tempo, hipness, genre, maxSongs){
	var apiKey = "PGHZKPTMD5HF9JONL";
	var songIDs = [];
	var realIDs = [];
	var maxTempo = parseInt(tempo) + 30;
	var minTempo = parseInt(tempo) - 30;
	var sURL = "https://developer.echonest.com/api/v4/song/search?"	+
	"api_key=" + apiKey +
	"&format=json" + 
	"&max_tempo=" + maxTempo + 
	"&min_tempo=" + minTempo + 
	"&style=" + genre +
	"&results=" + (parseInt(maxSongs)*2).toString() + 
	"&song_max_hotttnesss=" + hipness + 
	"&bucket=id:spotify&bucket=tracks";
	
	$.getJSON(sURL)
		.done(function(json){
			songsJson = json.response.songs	
			
			$.each(songsJson, function( index, value ){
				if(value.tracks[0] != null){
					//grabbing spotify ids
					songIDs.push(value.tracks[0].foreign_id);
				}
			});	

			//randomizing playlist
			var pool = [];
			var random;
			var removed;
			for (j = 0; j < parseInt(maxSongs); j++){
				pool.push(j);
			}
			for (i = 0; i < parseInt(maxSongs); i++){
				random = Math.floor(pool.length * Math.random());
				removed = pool.splice(random, 1);
				realIDs.push(songIDs[removed]);
			}
			//making ids ready for spotify playlist
			var songURI = realIDs[0];
			for (k = 1; k < realIDs.length; k++){
				songURI += "," + realIDs[k];
			}
			//return the string (not really sure about this)
			return songURI;
		});
}

function createPlaylist(token, userID, playlistName){
	var playlistID;
	var playlistURL;
	var sURL = "https://api.spotify.com/v1/users/" + userID + "/playlists";
	var headers = "{'Authorization': 'Bearer ' " + token + "}";
	var data = "{\"name\": \"" + playlistName + "\", \"public\": false}"
	var ID_URL = [];
	
	$.post(sURL,headers, data)
		.done(function(json){
			playlistID = json.id
			playlistURL = href
			ID_URL.push(playlistID);
			ID_URL.push(playlistURL);
			//return the array (not really sure about this)
			return ID_URL;
		});
}

function addElements(token, userID, songURI, playlistID){
	var sURL = "https://api.spotify.com/v1/users/" +
	userID + 
	"/playlists/" + playlistID +
	"/tracks?uris=" +
	songURI;
	var headers = "{'Authorization': 'Bearer ' " + token + "}";
	$.post(sURL, headers)
		.done(function(){
			console.log("Success!");
		});
		.fail(function(){
			console.log("Fail!");
		});
}

$(document).ready(function () {
	getSongURIs("130", "0.7", "pop", "25");
});
