var redirect_uri = "http://localhost:3000/";

var client_id = "1b8ac1436a65485da7a98c2175bc9860";
var client_secret = "32b4d000bf5a4380be04c1ad3238872e";

const AUTHORIZE = "http://accounts.spotify.com/authorize";
const TOKEN = "http://accounts.spotify.com/api/token";


function onPageLoading() {
     localStorage.getItem("client_id");
     localStorage.getItem("client_secret");

     if(window.location.search.length > 0) {
          handlerRedirect();
     }
}
function handlerRedirect() {
     let code = getCode();
     fetchAccessToken(code);
     window.history.pushState("", "", redirect_uri);
}

function fetchAccessToken(code) {
     let body = "grant_type=authorization_code";

     body += "&code=" + code;
     body += "&redirect_uri=" + encodeURIComponent(redirect_uri);
     body += "&client_id=" + client_id;
     body += "&client_secret=" + client_secret;

     callAuthorizationApi(body);
}

function callAuthorizationApi(body) {
     let xhr = new XMLHttpRequest();
     xhr.open("POST", TOKEN, true);
     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
     xhr.setRequestHeader('Authorization', 'Basic' + btoa(client_id + ':' + client_secret));

     xhr.send(body);
     xhr.onload = handlerAuthorizationResponse;
}

function handlerAuthorizationResponse() {
     if (this.status == 200) {
          var data = JSON.parse(this.responseText);
          console.log(data);

          var data = JSON.parse(this.responseText);

          if(data.access_token != undefined) {
               access_token = data.access_token;
               localStorage.setItem('access_token', access_token);
          }

          if(data.refresh_token != undefined) {
               refresh_token = data.refresh_token;
               localStorage.setItem("refresh_token", refresh_token);
          }
          onPageLoading();
     } else {
          console.log(this.responseText);
          alert(this.responseText);
     }
}

function getCode() {
     let code = null;

     const queryString = window.location.search;

     if (queryString.length > 0) {
          const urlParams = new URLSearchParams(queryString);
          code = urlParams.get('code');
     }
     return code;
}

function requestAuthorization() {
     localStorage.setItem("client_id", client_id);
     localStorage.setItem("client_secret", client_secret); //this should't be showed for the user

     let url = AUTHORIZE;

     url += "?client_id=" + client_id;
     url += "&response_type=code";
     url += "&redirect_uri=" + encodeURI(redirect_uri);
     url += "&show_dialog=true";
     url += "&scope=user-read-private user-read-email user-modify-playback-position user-library-read";

     console.log(url);

     // the url that would be build -> http://accounts.spotify.com/authorize?client_id=1b8ac1436a65485da7a98c2175bc9860&response_type=code&redirect_uri=http://localhost:3000/&show_dialog=true&scope=user-read-private user-read-email user-modify-playback-position user-library-read

     // when you receb access you get the code http://localhost:3000/?code=AQA-31JuaLFW3z17p0iISivnosYkWZrnInV41udlfDhsx9kDMUgDUzHQYlBmlYxLWdTnlFI2IE3j9pvzZEJYXbMKJV8VsNv12jdW2vKxUsK_cDOxci0lWwRKgYqBLF2rC9TXDrZCjiWfMCLibzSTl4AfclpFwsU4fnX19Xu5ySUajsu1mwgzuN_Fe8Xn
     window.location.href = url; //show popup window from spotify 
}    