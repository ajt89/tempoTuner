//spinner variables
var minSongs = 1;
var maxSongs = 100;
var numSongs = 25;

/**
* Populates form given array of saved form data
* @param  {array} array of urlParameters
*/
function populateForm(stateArray){
	//handle commas in playlist name
	var stateArrayOverflow = stateArray.length-5;
	if (stateArrayOverflow > 0){ //there must be a comma in the playlist name
		var newPlaylistName = stateArray[0];
		stateArray.shift();
		for ( var i = 1; i <= stateArrayOverflow; i++ ) {
			newPlaylistName = newPlaylistName + "," + stateArray[0];
			stateArray.shift();
		}
		stateArray.unshift(newPlaylistName);
	}
	
	//populate form
	setPlaylistName(stateArray[0]);
	setCheckedRadioButton(stateArray[1]);
	setCheckedRadioButton(stateArray[2]);
	setGenre(stateArray[3]);
	setMaxSongs(stateArray[4]);
}

/**
* Resets form to default values
*/
function resetForm(){
	setPlaylistName("");
	setCheckedRadioButton("tempo_m");
	setCheckedRadioButton("hip_kinda");
	setGenre("Rock");
	setMaxSongs(numSongs);
}

/**
* Checks if the playlist name is filled out. If not, will display an error.
*/
function checkName() {
	if(getPlaylistName()){ //if the playlist name is filled out
		removeFromErrors(noPlaylistError);
	}
	else { //if the playlist name isn't filled out
		addToErrors(noPlaylistError);
	}
	updateErrorText();
}

/**
* Checks if the spinner value is valid. If not, will display an error.
*/
function checkSpinner() {
	var maxSongsVal = getMaxSongs();
	if(maxSongsVal <= maxSongs && maxSongsVal >= minSongs){ //if spinner value is within valid range
		removeFromErrors(maxSongsError);
		removeFromErrors(minSongsError);
	} else if (maxSongsVal > maxSongs){ //if spinner value is above valid range
		addToErrors(maxSongsError);
	} else if (maxSongsVal < minSongs) { //if spinner value is below valid range
		addToErrors(minSongsError);
	}
	updateErrorText();
}

/**
* Checks both the playlist name and spinner value. If any issues are found, will display an error.
*/
function checkForm() {
	checkName();
	checkSpinner();
}

/**
* Gets the name of the playlist to be created
* @return {string} name of playlist to be created
*/
function getPlaylistName() {
	return $("#playlistName").val();
}

/**
* Sets the name of the playlist to be created
* @param  {string} name of playlist to be created
*/
function setPlaylistName(playlistName) {
	$("#playlistName").val(playlistName);
}

/**
* Gets the genre of the playlist to be created
* @return {string} genre of playlist to be created
*/
function getGenre() {
	return $("#selectGenre").val();
}

/**
* Sets the genre of the playlist to be created
* @param {string} genre of playlist to be created
*/
function setGenre(genre) {
	$("#selectGenre").val(genre);
}

/**
* Gets the max # of songs for the playlist to be created
* @return {string} max # of songs for the playlist to be created
*/
function getMaxSongs() {
	return $("#maxSongsSpinner").val();
}

/**
* Sets the max # of songs for the playlist to be created
* @param {string} max # of songs for the playlist to be created
*/
function setMaxSongs(maxSongs) {
	$("#maxSongsSpinner").val(maxSongs);
}

/**
* Gets the Spotify user name of the current user
* @return {string} Spotify user name of the current user
*/
function getUserName() {
	return $("#userName").text();
}

/**
* Sets the Spotify user name of the current user
* @param {string} Spotify user name of the current user
*/
function setUserName(userName) {
	$("#userName").text(userName);
}

/**
* Gets the Spotify Id of the current user
* @return {string} Spotify Id of the current user
*/
function getUserId() {
	return $("#userName").attr("value");
}

/**
* Sets the Spotify Id of the current user
* @param {string} Spotify Id of the current user
*/
function setUserId(userId) {
	$("#userName").attr("value", userId);
}

/**
* Gets a provided attribute of the selected Tempo radio button
* @param {string} attribute to get
* @return {string} value of attribute
*/
function getTempo(attribute) {
	return $("input[name=tempoRadio]:checked").attr(attribute);
}

/**
* Gets a provided attribute of the selected Hip radio button
* @param {string} attribute to get
* @return {string} value of attribute
*/	
function getHipness(attribute) {
	return $("input[name=hipRadio]:checked").attr(attribute);
}

/**
* Sets the checked radio button by ID
* @param {string} radio button ID
*/
function setCheckedRadioButton(radioButtonId) {
	$("#"+radioButtonId).prop('checked',true);
}
