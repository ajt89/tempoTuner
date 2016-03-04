import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;


public class TempoTuner {
    public static String executePost(String targetURL, String urlParameters)
    {
      URL url;
      HttpURLConnection connection = null;  
      try {
        //Create connection
        url = new URL(targetURL);
        connection = (HttpURLConnection)url.openConnection();
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", 
             "application/x-www-form-urlencoded");
           
        connection.setRequestProperty("Content-Length", "" + 
                 Integer.toString(urlParameters.getBytes().length));
        connection.setRequestProperty("Content-Language", "en-US");  
           
        connection.setUseCaches (false);
        connection.setDoInput(true);
        connection.setDoOutput(true);
        //Send request
        DataOutputStream wr = new DataOutputStream (
                    connection.getOutputStream ());
        wr.writeBytes (urlParameters);
        wr.flush ();
        wr.close ();

        //Get Response   
        InputStream is = connection.getInputStream();
        BufferedReader rd = new BufferedReader(new InputStreamReader(is));
        String line;
        StringBuffer response = new StringBuffer(); 
        while((line = rd.readLine()) != null) {
          response.append(line);
          response.append('\r');
        }
        rd.close();
        return response.toString();
      } catch (Exception e) {

          e.printStackTrace();
          return null;

        } finally {

          if(connection != null) {
            connection.disconnect(); 
          }
        }
      }

	public static void main(String[] args) throws Exception{
		
		//ECHONEST//
		
		String apiKey = "PGHZKPTMD5HF9JONL" ;
		String consumerKey = "083220808db636c0eb17d5153ea89af6 " ;
		String consumerSecret = "SKTPVd5KQVmK6oqpQJwWBA" ;
		
		String artistName = "katyperry";
		
		//Searching for artists
		String sURL1 = "http://developer.echonest.com/api/v4/artist/search?" + 
		"api_key=" + apiKey +
		"&format=json" +
		"&name=" + artistName;
		
		// Connect to the URL
		URL url1 = new URL(sURL1);
		HttpURLConnection request1 = (HttpURLConnection) url1.openConnection();
		request1.connect();
		
		// Convert to a JSON object to print data
    	JsonParser jp1 = new JsonParser();
    	JsonElement root1 = jp1.parse(new InputStreamReader((InputStream) request1.getContent()));
    	JsonObject rootobj1 = root1.getAsJsonObject(); // may be Json Array if it's an array, or other type of a primitive
    	String artistID = rootobj1.get("response").getAsJsonObject().get("artists").getAsJsonArray().get(0).getAsJsonObject().get("id").getAsString();
    	System.out.println(artistID);
    	
    	String maxTempo = "130";
    	String minTempo = "128";
    	String results = "15";
    	String style = "pop";
    	String maxHot = ".1";
    	//Getting songs
    	
    	String sURL2 = "http://developer.echonest.com/api/v4/song/search?" +
    	"api_key=" + apiKey +
    	"&format=json" + 
    	"&max_tempo=" + maxTempo +
    	"&min_tempo=" + minTempo +
    	"&artist_id=" + artistID +
    	//"&style=" + style +
    	"&results=" + results +
    	"&song_max_hotttnesss=" + maxHot+
    	"&bucket=id:spotify&bucket=tracks";
    	
    	//Connect to the URL
    	URL url2= new URL(sURL2);
    	HttpURLConnection request2 = (HttpURLConnection) url2.openConnection();
    	request2.connect();
    	
    	//Convert to a JSON object to print data
    	JsonParser jp2 = new JsonParser();
    	JsonElement root2 = jp2.parse(new InputStreamReader( (InputStream) request2.getContent()));
    	JsonObject rootobj2 = root2.getAsJsonObject(); //may be Json Array if it's an array, or other type of a primitive
    	System.out.println(rootobj2);
    	JsonArray songArray = rootobj2.get("response").getAsJsonObject().get("songs").getAsJsonArray();
    	int limit = songArray.size();
    	List<String> songID = new ArrayList<String>();
    	for (int i = 0; i < limit; i++){
    		songID.add(songArray.get(0).getAsJsonObject().get("tracks").getAsJsonArray().get(0).getAsJsonObject().get("foreign_id").getAsString());
    	}
    	System.out.println(songID);
    	System.out.println(songID.get(0));
    	String songidentification = songArray.get(0).getAsJsonObject().get("tracks").getAsJsonArray().get(0).getAsJsonObject().get("foreign_id").getAsString();
    	System.out.println(songidentification);
    	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    	
    	//Spotify
    	
    	String targetURL = "";
    	String urlParameters = "";
    	executePost(targetURL, urlParameters);
    	JsonParser jp3 = new JsonParser();
    	JsonElement root3 = jp3.parse(new InputStreamReader( (InputStream) request3.getContent()));
    	String playlistID = root3.getAsJsonObject().get("id").getAsString();
    	String playlistURL = root3.getAsJsonObject().get("external_urls").getAsJsonObject().get("spotify").getAsString();
    	
    	
    			
    	}
    	
	}
}
