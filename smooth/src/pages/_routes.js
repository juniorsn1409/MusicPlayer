// react dependencies

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // npm install react-router-dom

// spotify dependencies

import SpotifyWebApi from 'spotify-web-api-js';
import spotify, { getTokenFromUrl } from './../_spotify/spotify';
import { useStateValue } from "./../_spotify/StateProvider";

//screens dependencies

import Home from './../screens/Home';
import Error404 from './../screens/Error404';
import RequestAuthorization from '../screens/RequestAuthorization';

//components


const spotifyWeb = new SpotifyWebApi();

export default function RouterApp() {

     const [{ token }, dispatch] = useStateValue();

     useEffect(() => {
          // Set token
          const hash = getTokenFromUrl();
          window.location.hash = "";
          let _token = hash.access_token;

          if (_token) {
               spotifyWeb.setAccessToken(_token);

               dispatch({
                    type: "SET_TOKEN",
                    token: _token,
               });

               spotifyWeb.getPlaylist("37i9dQZEVXcJZyENOWUFo7").then((response) =>
                    dispatch({
                         type: "SET_DISCOVER_WEEKLY",
                         discover_weekly: response,
                    })
               );

               spotifyWeb.getMyTopArtists().then((response) =>
                    dispatch({
                         type: "SET_TOP_ARTISTS",
                         top_artists: response,
                    })
               );

               dispatch({
                    type: "SET_SPOTIFY",
                    spotify: spotifyWeb,
               });

               spotifyWeb.getMe().then((user) => {
                    dispatch({
                         type: "SET_USER",
                         user,
                    });
               });

               spotifyWeb.getUserPlaylists().then((playlists) => {
                    dispatch({
                         type: "SET_PLAYLISTS",
                         playlists,
                    });
               });
          }
     }, [token, dispatch]);

     return (

          <BrowserRouter>
               {spotify.OnPageLoading()}
               <Routes>
                    <Route path="/" element={<RequestAuthorization />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="*" element={<Error404 />} />
               </Routes>
          </BrowserRouter>
     );
}