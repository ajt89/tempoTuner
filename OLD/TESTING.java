import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

import javax.xml.bind.DatatypeConverter;


public class TESTING {
	public static String oauth1(String ClientID ){	
		String authURL = "https://accounts.spotify.com/authorize/?client_id="
				+ ClientID + "&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=playlist-modify-public&state=34fFs29kd09";
		return authURL;
	}
	
	  public static String executePost(String targetURL, String urlParameters, String AuthorizationString) throws IOException
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
	         connection.setRequestProperty("Authorization", AuthorizationString);
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
	         InputStream is = (InputStream) connection.getInputStream();
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
	  
	       
	public static void main(String[] args) throws IOException {
		// TODO Auto-stub
		Scanner scanner = new Scanner(System.in);
		
		String clientID = "c8498f520a874494a5a3aa68d96fd4fe";
		String clientSecret = "f98cea04c49c483e817ec052e00f6607";
		String redirectURL = "https://example.com/callback";
		//System.out.println("Please input the client ");
		String aURL = oauth1(clientID);
		System.out.println("Please go to this url and click authorize: \n" + aURL);
		
		
		System.out.println("Please input the url after authorizing access: ");
		String returnURL = scanner.nextLine();
		
		int CODELENGTH = 5;
		int beg_codeIndex = returnURL.indexOf("code=") + CODELENGTH;
		int end_codeIndex = returnURL.indexOf("&", beg_codeIndex);
		String code = returnURL.substring(beg_codeIndex, end_codeIndex);
		
		//System.out.println(code);
		String parameters =  
							 "grant_type=" + "authorization_code" 
							+ "&code=" + code 
							+ "&redirect_uri=" + redirectURL;
	
		String AuthString = clientID + ":" + clientSecret;
		String encodeAuthString = "Basic " + DatatypeConverter.printBase64Binary(AuthString.getBytes());
				
		System.out.println(parameters);
		executePost( "https://accounts.spotify.com/api/token" , parameters, encodeAuthString);		
	}
}