/**
* Creates an array of the url parameters behind the "?" symbol
* @return {array} The generated array
*/
//http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getURLsearchParameters() {
	var urlParams;
	var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
	return urlParams;
}

/**
* Creates an array of the url parameters behind the "#" symbol
* @return {array} The generated array
*/
function getURLhashParameters() {
	var urlParams;
	var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.hash.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
	return urlParams;
}
