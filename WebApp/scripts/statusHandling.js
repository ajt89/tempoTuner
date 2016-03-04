//status codes
var connectingStatus = "Connecting to Spotify...";
var userIdStatus = "Fetching Spotify user ID...";
var getSongsStatus = "Fetching song URIs...";
var createPlaylistStatus = "Creating Spotify playlist...";
var addElementStatus = "Adding songs to Spotify playlist...";
var playlistCompleteStatus = "Playlist complete! Check it out here: ";

/**
* Set status field with text
* @param  {string} text to set status to
*/
function setStatus(text){
	$("#statusText").html(text);
}
