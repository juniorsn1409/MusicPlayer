// react dependencies

import React from 'react';

// other dependencies


//spotify dependencies

// import "./spotify-player.js";
import Spotify from "react-spotify-web-playback"

// css dependencies

import "./index.css";
import "../base.css";

// =================================================================== //

export default function AcutualDevice() {

  window.onSpotifyWebPlaybackSDKReady = () => {
    const token = '[My access token]';
    const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); },
      volume: 0.5
    });

    // Ready
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    player.addListener('initialization_error', ({ message }) => {
      console.error(message);
    });

    player.addListener('authentication_error', ({ message }) => {
      console.error(message);
    });

    player.addListener('account_error', ({ message }) => {
      console.error(message);
    });

    document.getElementById('togglePlay').onclick = function () {
      player.togglePlay();
    };

    player.connect();
  }

  return (
    <div>
      <button id="togglePlay">Dispositivo Atual</button>
      <script src="https://sdk.scdn.co/spotify-player.js"></script>
    </div>
  );
}