/**
* Generates the Spotify OAuth string
* @return {string} The generated string
*/
function getSpotifyOAuthUrl(){
	var client_id = '1492dff359704d64b085de5e854cc1e1';
	var redirect_uri = 'https://www.cs.drexel.edu/~ajt89/tempoTuner.html';
	var scope = 'playlist-modify-public';
	var url = 'https://accounts.spotify.com/authorize';
			
	var playlistName = getPlaylistName();
	var tempo = getTempo("id");
	var hipness = getHipness("id");
	var genre = getGenre();
	var maxSongs = getMaxSongs();

	var state = playlistName + "," + tempo + "," + hipness + "," + genre + "," + maxSongs;
	url += '?response_type=token';
	//url += '&show_dialog=true'; //makes the authorization prompt appear even if the user has already granted permission/is logged in
	url += '&client_id=' + encodeURIComponent(client_id);
	url += '&scope=' + encodeURIComponent(scope);
	url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
	url += '&state=' + encodeURIComponent(state);
	return url;
}

/**
* Gets Spotify user ID and display name
* @param  {string} OAuth token
* @return {array} [0] = user ID, [1] = display name
*/
function getUserInfo(token){
	var userURL = "https://api.spotify.com/v1/me?access_token=" + token;
	return $.getJSON(userURL)
		.fail(function (jqxhr, textStatus, error){
			setStatus("");
			setError("User profile request failed: " + textStatus + ", " + error);
		})
		.then(function(json){ //http://stackoverflow.com/questions/10775787/function-wait-with-return-until-getjson-is-finished
			userID = json.id;
			displayName = json.display_name;
			return [userID, displayName];
		});
}

/**
* Gets song URIs from EchoNest
* @param  {number} tempo, {number} hipness, {string} genre, {number} maximum # of songs 
* @return {string} comma separated string of URIs
*/
function getSongURIs(tempo, hipness, genre, maxSongs){
	var sURL = "https://developer.echonest.com/api/v4/song/search?";
	var apiKey = "PGHZKPTMD5HF9JONL";
	var songIDs = [];
	var realIDs = [];
	if (tempo === "any" && hipness === "any"){
		var sURL = "https://developer.echonest.com/api/v4/song/search?" +
		"api_key=" + apiKey +
		"&format=json" + 
		"&style=" + genre +
		"&results=" + "100" + 
		"&bucket=id:spotify&bucket=tracks";
	}
	else if (tempo === "any"){
		var sURL = "https://developer.echonest.com/api/v4/song/search?" +
		"api_key=" + apiKey +
		"&format=json" + 
		"&style=" + genre +
		"&results=" + "100" + 
		"&song_max_hotttnesss=" + hipness +
		"&bucket=id:spotify&bucket=tracks";
	}
	else if(hipness === "any"){
		var maxTempo = parseInt(tempo) + 30;
		var minTempo = parseInt(tempo) - 30;
		var sURL = "https://developer.echonest.com/api/v4/song/search?" +
		"api_key=" + apiKey +
		"&format=json" + 
		"&max_tempo=" + maxTempo + 
		"&min_tempo=" + minTempo + 
		"&style=" + genre +
		"&results=" + "100" + 
		"&song_max_hotttnesss=" + hipness +
		"&bucket=id:spotify&bucket=tracks";
	}
	else {
		var maxTempo = parseInt(tempo) + 30;
		var minTempo = parseInt(tempo) - 30;
		var sURL = "https://developer.echonest.com/api/v4/song/search?" +
		"api_key=" + apiKey +
		"&format=json" + 
		"&max_tempo=" + maxTempo + 
		"&min_tempo=" + minTempo + 
		"&style=" + genre +
		"&results=" + "100" + 
		"&song_max_hotttnesss=" + hipness +
		"&bucket=id:spotify&bucket=tracks";
	}

	return $.getJSON(sURL)
		.fail(function (jqxhr, textStatus, error){
			setStatus("");
			setError("Song URIs request failed: " + textStatus + ", " + error);
		})
		.then(function(json){
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
			//return the string
			return songURI;
		});
}

/**
* Creates empty Spotify playlist
* @param  {string} OAuth token, {string} Spotify user ID, {string} name for new playlist 
* @return {string} Playlist ID of newly created playlist
*/
function createPlaylist(token, userID, playlistName){
	var url = 'https://api.spotify.com/v1/users/' + userID + '/playlists';
	return $.ajax(url, {
		method: 'POST',
		data: JSON.stringify({
			'name': playlistName,
			'public': true
		}),
		dataType: 'json',
		headers: {
			'Authorization': 'Bearer ' + token,
			'Content-Type': 'application/json'
		},
		error: function (jqxhr, textStatus, error) {
			setStatus("");
			setError("New playlist request failed: " + textStatus + ", " + error);
		}
	}).then(function(json){
		var playlistID = json.id;
		return playlistID;
	});
}

/**
* Adds songs to Spotify playlist
* @param  {string} OAuth token, {string} Spotify user ID, {string} comma separated string of URIs, {string} ID of playlist to add songs to
*/
function addElements(token, userID, songURI, playlistID){
	var url = "https://api.spotify.com/v1/users/" +
	userID + 
	"/playlists/" + playlistID +
	"/tracks?uris=" +
	songURI;
		
	return $.ajax(url, {
		method: 'POST',
		dataType: 'json',
		headers: {
			'Authorization': 'Bearer ' + token,
			'Content-Type': 'application/json'
		},
		error: function (jqxhr, textStatus, error) {
			setStatus("");
			setError("Add tracks request failed: " + textStatus + ", " + error);
		}
	}).then(function(json){
		return json.snapshot_id;
	});
}
