package com.example.shelleysuhling.myapplication;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;


public class MainActivity extends Activity {

    WebView web_view;

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        // Check if the key event was the Back button and if there's history
        if ((keyCode == KeyEvent.KEYCODE_BACK) && web_view.canGoBack()) {
            //if we're at the "home" screen of the app, exit when "back" is pushed to mimic native
            //android behavior
            if(web_view.getUrl().contains("https://www.cs.drexel.edu/~tjm335/tempoTuner.html")){
                return super.onKeyDown(keyCode, event);
            }
            // allow user to navigate back to main page if they click "log in" on the "log out" page
            else if (web_view.getUrl().contains("https://accounts.spotify.com/en/status")) {
                web_view.loadUrl("https://www.cs.drexel.edu/~tjm335/tempoTuner.html");
                return true;
            }

            web_view.goBack();
            return true;
        }
        // If it wasn't the Back key or there's no web page history, bubble up to the default
        // system behavior (probably exit the activity)
        return super.onKeyDown(keyCode, event);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        web_view = (WebView) findViewById(R.id.webView);
        WebSettings webSettings = web_view.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setLoadWithOverviewMode(true);
        webSettings.setUseWideViewPort(true);
        //webSettings.setSupportMultipleWindows(true);
        web_view.clearCache(true);
        web_view.setWebViewClient(new tempoTunerWebViewClient());
        web_view.loadUrl("https://www.cs.drexel.edu/~tjm335/tempoTuner.html");
    }

    private class tempoTunerWebViewClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            //Log.e("TESTING", "Url test: " + url);
            if(url.contains("https://www.cs.drexel.edu/~tjm335/tempoTuner.html")
                    || url.contains("https://accounts.spotify.com/authorize?response_type=token&client_id=")
                    || url.equals("https://accounts.spotify.com/en/logout")
                    || url.contains("https://m.facebook.com/login.php?")
                    || url.contains("https://m.facebook.com/language.php")
                    || url.contains("https://www.facebook.com/dialog/oauth?")
                    || url.contains("https://m.facebook.com/v1.0/dialog/oauth?")){
                return false;
            }

            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
            startActivity(intent);
            return true;
        }
    }
}
