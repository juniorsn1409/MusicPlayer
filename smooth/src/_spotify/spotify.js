var authEndpoint = "http://accounts.spotify.com/authorize";

var redirectUri = "http://localhost:3000/home";

var clientId = "1b8ac1436a65485da7a98c2175bc9860";
var clientSecret = "32b4d000bf5a4380be04c1ad3238872e"
var accessToken = null;
var refreshToken = null;

var scopes = [
     "user-read-playback-state",
     "user-read-currently-playing",
     "user-read-recently-played",
     "user-top-read",
     "user-modify-playback-state",
];

//ENDPOINTS

const AUTHORIZE = "https://accounts.spotify.com/authorize"
const TOKEN = "https://accounts.spotify.com/api/token";
const PLAYLISTS = "https://api.spotify.com/v1/me/playlists";
const DEVICES = "https://api.spotify.com/v1/me/player/devices";
const PLAY = "https://api.spotify.com/v1/me/player/play";
const PAUSE = "https://api.spotify.com/v1/me/player/pause";
const NEXT = "https://api.spotify.com/v1/me/player/next";
const PREVIOUS = "https://api.spotify.com/v1/me/player/previous";
const PLAYER = "https://api.spotify.com/v1/me/player";
const TRACKS = "https://api.spotify.com/v1/playlists/{{PlaylistId}}/tracks";
const CURRENTLYPLAYING = "https://api.spotify.com/v1/me/player/currently-playing";
const SHUFFLE = "https://api.spotify.com/v1/me/player/shuffle";

const requestUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;


const spotify = {

     OnPageLoading: function () {
          localStorage.getItem("client_id");
          localStorage.getItem("client_secret");

          if (window.location.search.length > 0) {
               handlerRedirect();


          } else {

               accessToken = localStorage.getItem("access_token");
               if (accessToken == null) {
                    // we don't have an access token so back to request authorization page
               } else {
                    // we have an access token so refresh all our endpoints
               }
          }
     },

     RequesToken: function () {
          let token = getTokenFromUrl();

          localStorage.setItem("access_token", token.access_token);

     },

     RequestAuthorization: function () {
          localStorage.setItem("client_id", clientId);
          localStorage.setItem("client_secret", clientSecret);

          return window.location.href = requestUrl;
     },

     ComsumingApi: function (method, url, body, callBack) {
          let xhr = new XMLHttpRequest();

          xhr.open(method, url, true);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.setRequestHeader('Authorization', accessToken);
          xhr.send(body);
          xhr.onload = callBack;
     },

     RefreshDevices: function () {
          spotify.ComsumingApi("GET", DEVICES, "", handleDevicesResponse);

     }

}
export default spotify;


// helpers function

export const getTokenFromUrl = () => {
     return window.location.hash
          .substring(1)
          .split("&")
          .reduce((initial, item) => {
               var parts = item.split("=");
               initial[parts[0]] = decodeURIComponent(parts[1]);

               return initial;
          }, {});
}

function handlerRedirect() {
     let code = getCode();
     fetchAccessToken(code);
     window.history.pushState("", "", redirectUri);
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

function fetchAccessToken(code) {
     let body = "grant_type=authorization_code";

     body += "&code=" + code;
     body += "&redirect_uri=" + encodeURIComponent(redirectUri);
     body += "&client_id=" + clientId;
     body += "&client_secret=" + clientSecret;

     callAuthorizationApi(body);
}

function refreshAccessToken() {
     refreshToken = localStorage.getItem("refresh_token");

     let body = "grant_type=refresh_token";
     body += "&refresh_token=" + refreshToken;
     body += "&client_id=" + clientId;

     callAuthorizationApi(body);
}

function callAuthorizationApi(body) {
     let xhr = new XMLHttpRequest();

     xhr.open("POST", TOKEN, true);
     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
     xhr.setRequestHeader('Authorization', 'Basic' + btoa(clientId + ':' + clientSecret));

     xhr.send(body);
     xhr.onload = handlerAuthorizationResponse;
}

function handlerAuthorizationResponse() {
     if (this.status == 200) {
          var data = JSON.parse(this.responseText);
          console.log(data);
          var data = JSON.parse(this.responseText);
          if (data.accessToken != undefined) {
               accessToken = data.accessToken;
               localStorage.setItem("access_token", accessToken);
          }
          if (data.refreshToken != undefined) {
               refreshToken = data.refreshToken;
               localStorage.setItem("refresh_tok  en", refreshToken);
          }
          OnPageLoading();
     }
     else {
          console.log(this.responseText);
          alert(this.responseText);
     }
}

// fetch API

// DEVICE
function refreshDevices() {
     callApi("GET", DEVICES, null, handleDevicesResponse);
}

function handleDevicesResponse() {
     if (this.status == 200) {
          var data = JSON.parse(this.responseText);
          console.log(data);
          removeAllItems("devices");
          data.devices.forEach(item => addDevice(item));
     }
     else if (this.status == 401) {
          refreshAccessToken()
     }
     else {
          console.log(this.responseText);
          // alert(this.responseText);
     }
}

function addDevice(item) {
     console.log(item)
     node.value = item.id;
     node.innerHTML = item.name;
}

function removeAllItems(elementId) {
     console.log(elementId)
}   