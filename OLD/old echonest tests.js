	
/*	
	//EchoNest tests
	apiKey = "PGHZKPTMD5HF9JONL"
	consumerKey = "083220808db636c0eb17d5153ea89af6 "
	consumerSecret = "SKTPVd5KQVmK6oqpQJwWBA"
	
	artistName = "katyperry" //put artist input here
	
	sURL1 = "https://developer.echonest.com/api/v4/artist/search?" + "api_key=" + apiKey + "&format=json" + "&name=" + artistName
		
	$.getJSON(sURL1, function( json ) {
		artistID = json.response.artists[0].id
		console.log( "Artist ID: " + artistID)
		
		maxTempo = "130" //bpm high
		minTempo = "128" //bpm min
		results = "15" //Max # of songs
		style = "pop" //genre goes here
		maxHot = ".1" //determine hipsterness
		
		sURL2 = "https://developer.echonest.com/api/v4/song/search?"	+ "api_key=" + apiKey + "&format=json" + "&max_tempo=" + maxTempo + "&min_tempo=" + minTempo + "&artist_id=" + artistID + "&results=" + results + "&song_max_hotttnesss=" + maxHot + "&bucket=id:spotify&bucket=tracks";
			
		$.getJSON(sURL2, function( json ) {
			songsJson = json.response.songs
			
			$.each(songsJson, function( index, value ) {
				//alert( index + ": " + value )
				console.log("Song ID #" + (index + 1) + ": " + value.tracks[0].foreign_id)
				
				if(value.tracks[0] != null){
					console.log("Song ID #" + (index + 1) + ": " + value.tracks[0].foreign_id)
				}
				else {
					console.log("Song ID #" + (index + 1) + ": no tracks!")
				}
			});
		});
	});
	*/