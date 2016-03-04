$(document).ready(function () {
	//provide extra height so user can scroll down and hide URL-bar
	//tested with iOS Chrome and iOS Safari on iPhone 6; WebView on Android Emulator (Google Nexus 4 - 4.3 - API 18)
	if (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
		if (!(navigator.userAgent.match(/(Android)/i) && navigator.userAgent.match(/(Version)/i))){ //if it's not an Android WebView
			var increasePx;
			if (navigator.userAgent.match(/(CriOS)/i)) { //chrome on iOS
				increasePx = 100;
			} else {
				increasePx = 120;
			}
			var newPageHeight = $(document).height() + increasePx;
			//setError("testing " + increasePx);
			$('BODY').css('height', newPageHeight + 'px');
		}
	}
	
	//set default values for tempo and hipster-ness
	resetForm();
	
	//get URL parameters
	var urlHashParams = getURLhashParameters(); //possible param(s): access_token, state
	var urlSearchParams = getURLsearchParameters(); //possible param(s): error
	
	//if the user doesn't grant Spotify access, display error
	if (urlSearchParams["error"] == "access_denied"){
		setError(noAccessError);
	}
	
	//if state variable exists (i.e. there's saved form data), populate form
	var stateParams = urlHashParams["state"] || urlSearchParams["state"];
	if (stateParams){
		var stateArray = stateParams.split(',');
		populateForm(stateArray);
	}
	
	//configure jQuery UI elements
	$("#tempoRadio").buttonset();
	$("#hipRadio").buttonset();
	$("#maxSongsSpinner").spinner({
		min: minSongs,
		max: maxSongs,
		step: 1,
		start: numSongs,
	});
	$("#playlistButton").button()
		.click(function( event ) {
			event.preventDefault();
		});
	
	//check playlist name if it's changed
	$("#playlistName").change(function() {
		checkName();
	});
	
	//check if genre is changed
	$("#Genre").change(function() {
		checkGenre();
	});
		
	//check spinner if a spinner button is pressed
	$(".ui-spinner-button").click(function() {
		checkSpinner();
	});
	
	//check spinner if it's changed
	$("#maxSongsSpinner").change(function() {
		checkSpinner();
	});
	
	//prevent invalid keystrokes in spinner element (i.e. anything that isn't a number, backspace, delete, etc.)
	$("#maxSongsSpinner").keydown(function(event) {
		var keyCode = event.keyCode;
		//http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
		//ranges: numbers 0 to 9; end, home, direction arrows; numpad 0 to numpad 9; delete; backspace
		if (!(keyCode >= 48 && keyCode <= 57) && !(keyCode >= 35 && keyCode <= 40) && !(keyCode >= 96 && keyCode <= 105) && keyCode != 46 && keyCode != 8 ){
			event.preventDefault();
		}
	});
	
	//remove URL parameters if logout link is clicked 
	//also replaces history object with a URL that doesn't have a token parameter. 
	//This allows the Android WebView to only use one window and still allow a user to log out.
	$("#logout").click(function() {
		$("#userRow").hide();
		window.location = window.location.pathname;
		window.history.replaceState( {} , "", "https://www.cs.drexel.edu/~ajt89/tempoTuner.html" );
	});
	
	//show/hide previous playlists when link is clicked
	$("#showPreviousPlaylists").click(function() {
		event.preventDefault();
		showHidePreviousPlaylists();
	});
	
	//perform oauth if playlist button is pressed
	$("#playlistButton").click(function() {
		checkForm();
		if(!getErrors()) { //if there aren't any errors perform OAuth (i.e. send user to Spotify login page)
			setStatus(connectingStatus);
			var url = getSpotifyOAuthUrl();
			if(url){
				window.location = url;
			} else {
				setError(missingOAuthUrlError);
			}
		}
	});
	
	//if an access_token exists (i.e. OAuth is complete) make the playlist
	var token = urlHashParams["access_token"];
	if (token){
		setStatus(userIdStatus);
		getUserInfo(token).then(function(userInfo){
			setStatus("");
			userID = userInfo[0];
			displayName = userInfo[1];
			if(userID){
				$("#userRow").show();
				setUserId(userID);
				if(displayName){
					setUserName(displayName);
				} else{
					setUserName(userID);
				}
				setStatus(getSongsStatus);
				var playlistName = getPlaylistName();
				var tempo = getTempo("value");
				var hipness = getHipness("value");
				var genre = getGenre();
				var maxSongs = getMaxSongs();
				getSongURIs(tempo, hipness, genre, maxSongs).then(function(songURI){
					setStatus("");
					if(songURI){
						setStatus(createPlaylistStatus);
						createPlaylist(token, userID, playlistName).then(function(playlistID){
							setStatus("");
							if(playlistID){
								setStatus(addElementStatus);
								addElements(token, userID, songURI, playlistID).then(function(snapshot_id){
									setStatus("");
									if(snapshot_id){
										playlistUrl = "https://open.spotify.com/user/" + userID + "/playlist/" + playlistID;
										addToCloudMine(playlistName, tempo, hipness, genre, maxSongs, userID, playlistUrl);
										playlistUrlHtml = "<a id='playlistUrl' target='_blank' href='" + playlistUrl + "'>" + playlistUrl + "</a>";
										setStatus(playlistCompleteStatus + playlistUrlHtml);
										resetForm();
										window.location = window.location.hash.split("&state")[0]; //prevent reload from making a duplicate playlist
									} else {
										setError(tracksError);
									}
								});
							} else {
								setError(noPlaylistIdError);
							}
						});
					} else {
						setError(noSongUriError);
					}
				});
			} else {
				setError(noIdError);
			}
		});
	} else { //hide row with user id if OAuth hasn't been completed
		$("#userRow").hide();
	}
});
