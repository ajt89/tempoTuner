//array of current errors
var errorArray = [];

//error codes
var noPlaylistError = "Error: Please enter a Playlist Name";
var noGenreError = "Error: Please enter a genre";
var noAccessError = "Error: TempoTuner needs access to your Spotify account to add your new playlist!";
var noIdError = "Error: Could not locate Spotify User ID";
var maxSongsError = "Error: Max # of Songs must be 100 or less";
var minSongsError = "Error: Max # of Songs must be 1 or more";
var noSongUriError = "Error: song URI's not able to be retrieved";
var noPlaylistIdError = "Error: playlist ID not able to be retrieved";
var missingOAuthUrlError= "Error: Could not generate Spotify OAuth URL";
var tracksError = "Error: Couldn't add tracks to Spotify playlist";

/**
* Set error field with text
* @param  {string} text to set error to
*/
function setError(text){
	$("#errorText").html(text);
}

/**
* Get text from error field
* @return  {string} text from error field
*/
function getErrors(){
	return $("#errorText").text();
}

/**
* Concatenates error strings and updates error text
*/
function updateErrorText() {
	var errors = "";
	$.each( errorArray, function( index, value ){
		errors = errors + value + "<br>";
	});
	//don't have to trim trailing <br>; it has no effect
	setError(errors);
}

/**
* Adds error to error array if it's not already in the array
* @param  {string} error to add
*/
function addToErrors(errorToAdd){
	if ($.inArray(errorToAdd, errorArray) == -1){ //if the error code isn't already in the error array, add it
		errorArray.push(errorToAdd);
	}
}

/**
* Removes error from error array if it's in the array
* @param  {string} error to remove
*/
function removeFromErrors(errorToRemove){
	if ($.inArray(errorToRemove, errorArray) > -1){ //if the error code is in the error array, remove it
		//http://stackoverflow.com/questions/3596089/how-to-remove-specifc-value-from-array-using-jquery
		errorArray = jQuery.grep(errorArray, function(value) {
			return value != errorToRemove;
		});
	}
}
