// Important information below, which should not be shared
const AUTHORIZE = "http://accounts.spotify.com/authorize";

var redirect_uri = "http://localhost:3000/";
var client_id = "1b8ac1436a65485da7a98c2175bc9860";
var client_secret = "32b4d000bf5a4380be04c1ad3238872e";


// The function shold be able to build this url below the
// http://accounts.spotify.com/authorize?client_id=1b8ac1436a65485da7a98c2175bc9860&response_type=code&redirect_uri=http://localhost:3000/&show_dialog=true&scope=user-read-private user-read-email user-modify-playback-position user-library-read


export default function RequestAuthorization() {

     // Storing in localStorage client id and secret 
     localStorage.setItem("client_id", client_id);
     localStorage.setItem("client_secret", client_secret);

     // Building the url
     let url = AUTHORIZE;

     url += "?client_id=" + client_id;
     url += "&response_type=code";
     url += "&redirect_uri=" + encodeURI(redirect_uri);
     url += "&show_dialog=true";
     url += "&scope= ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming";

     console.log(url);

     // When you receb access you get the code http://localhost:3000/?code=AQA-31JuaLFW3z17p0iISivnosYkWZrnInV41udlfDhsx9kDMUgDUzHQYlBmlYxLWdTnlFI2IE3j9pvzZEJYXbMKJV8VsNv12jdW2vKxUsK_cDOxci0lWwRKgYqBLF2rC9TXDrZCjiWfMCLibzSTl4AfclpFwsU4fnX19Xu5ySUajsu1mwgzuN_Fe8Xn
     window.location.href = url; // Redirect to spotify, this is for the first time only
}    