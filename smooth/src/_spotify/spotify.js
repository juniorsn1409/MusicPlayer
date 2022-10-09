export const authEndpoint = "http://accounts.spotify.com/authorize";

const redirectUri = "http://localhost:3000/home";

const clientId = "1b8ac1436a65485da7a98c2175bc9860";
const clientSecret = "32b4d000bf5a4380be04c1ad3238872e"

const scopes = [
     "user-read-playback-state",
     "user-read-currently-playing",
     "user-read-recently-played",
     "user-top-read",
     "user-modify-playback-state",
];

const requestUrl =  `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;


const spotify = {

     OnPageLoading: function() {
          localStorage.getItem("client_id");
          localStorage.getItem("client_secret");
     
          if (window.location.search.length > 0) {
          handlerRedirect();
          }
     },
 
     RequestAuthorization: function() {
          console.log(requestUrl);

          localStorage.setItem("client_id", clientId);
          localStorage.setItem("client_secret", clientSecret);

          return window.location.href = requestUrl;
     }

} 
export default spotify;


// helpers function

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

          if(data.access_token != undefined) {
               access_token = data.access_token;
               localStorage.setItem('access_token', access_token);
          }

          if(data.refresh_token != undefined) {
               refresh_token = data.refresh_token;
               localStorage.setItem("refresh_token", refresh_token);
          }
          spotify.OnPageLoading();
     } else {
          console.log(this.responseText);
          alert(this.responseText);
     }
}


