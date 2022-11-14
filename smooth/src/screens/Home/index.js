// react dependencies

import React, { useState } from 'react';

// spotify dependencies

import { getTokenFromLocation } from './../../spotify/location-smooth'

// components dependencies

import Logo from './../../components/Logo';
import SideTitle from './../../components/SideTitle';
import SidebarLink from './../../components/SidebarLink';
import Plalist from './../../components/Playlist';

// css dependencies

import "./index.css";
// import "./../../components/base.css";

// other dependencies

import request from 'request';

// =================================================================== //

export default function Home() {

  const token = getTokenFromLocation();

  const [searchInput, setSearchInput] = useState("");
  const [track, setTrack] = useState("");

  async function search() {

    var url = `https://api.spotify.com/v1/search?q=${searchInput}&type=track,artist,album,playlist`;

    const options = {
      url: url,
      headers: {
        'Authorization': 'Bearer ' + token,
        'content-type': 'application/json',
      },
      json: true
    };

    request.get(options, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        console.log("tracks.items ", body.tracks.items[0]);

        setTrack(body.tracks.items);

      } else {
        console.log(error);
      }
    }
    );
  }

  return (
    <div className="container">
      <div className="main">

        <div className="sidebar">
          <div className="side">
            <Logo />
            <div class="side-wrapper">
              <SideTitle desc="MENU" />
              <div class="side-menu">
                <SidebarLink link="#" desc="Descobrir" isActive="false" path="M9.135 20.773v-3.057c0-.78.637-1.414 1.423-1.414h2.875c.377 0 .74.15 1.006.414.267.265.417.625.417 1v3.057c-.002.325.126.637.356.867.23.23.544.36.87.36h1.962a3.46 3.46 0 002.443-1 3.41 3.41 0 001.013-2.422V9.867c0-.735-.328-1.431-.895-1.902l-6.671-5.29a3.097 3.097 0 00-3.949.072L3.467 7.965A2.474 2.474 0 002.5 9.867v8.702C2.5 20.464 4.047 22 5.956 22h1.916c.68 0 1.231-.544 1.236-1.218l.027-.009z" />
                <SidebarLink link="#" desc="Buscar" isActive="true" path="M10.835 12.007l.002.354c.012 1.404.096 2.657.242 3.451 0 .015.16.802.261 1.064.16.38.447.701.809.905a2 2 0 00.91.219c.249-.012.66-.137.954-.242l.244-.094c1.617-.642 4.707-2.74 5.891-4.024l.087-.09.39-.42c.245-.322.375-.715.375-1.138 0-.379-.116-.758-.347-1.064-.07-.099-.18-.226-.28-.334l-.379-.397c-1.305-1.321-4.129-3.175-5.593-3.79 0-.013-.91-.393-1.343-.407h-.057c-.665 0-1.286.379-1.603.991-.087.168-.17.496-.233.784l-.114.544c-.13.874-.216 2.216-.216 3.688zm-6.332-1.525C3.673 10.482 3 11.162 3 12a1.51 1.51 0 001.503 1.518l3.7-.328c.65 0 1.179-.532 1.179-1.19 0-.658-.528-1.191-1.18-1.191l-3.699-.327z" />
                <SidebarLink link="#" desc="Suas Musicas" isActive="false" path="M7.33 2h9.34c3.4 0 5.32 1.93 5.33 5.33v9.34c0 3.4-1.93 5.33-5.33 5.33H7.33C3.93 22 2 20.07 2 16.67V7.33C2 3.93 3.93 2 7.33 2zm4.72 15.86c.43 0 .79-.32.83-.75V6.92a.815.815 0 00-.38-.79.84.84 0 00-1.28.79v10.19c.05.43.41.75.83.75zm4.6 0c.42 0 .78-.32.83-.75v-3.28a.839.839 0 00-1.28-.79.806.806 0 00-.38.79v3.28c.04.43.4.75.83.75zm-8.43-.75a.827.827 0 01-.83.75c-.43 0-.79-.32-.83-.75V10.2a.84.84 0 01.39-.79c.27-.17.61-.17.88 0s.42.48.39.79v6.91z" />
              </div>
            </div>
            <div class="side-wrapper">
              <SideTitle desc="PLAYLISTS" />
              <Plalist desc="exemplo de playlist" />

            </div>
          </div>
        </div>
        <div className="content">
          <div className="header-content">
            <div class="search-bar">
              <input type="text" placeholder="Procurar músicas"
                onKeyDownCapture={event => {
                  setSearchInput(inputKeyPress(event));

                  if (event.key === 'Enter') {
                    search();
                  }

                }}
              />
            </div>
          </div>
          <div className="main-content">
            {Array.isArray(track)
              ? track.map(element => {
                return <div className="music">
                  <div className="esquerda">
                    <img className="music-img" src={element.album.images[0].url} />
                    <div className="music-info">
                      {element.name}
                      <br />
                      {element.artists[0].name}
                    </div>
                  </div>
                  <div className="direita">

                    <a className="icon" href="#">
                      <svg class="svg-icon" viewBox="0 0 20 20">
                        <path d="M9.719,17.073l-6.562-6.51c-0.27-0.268-0.504-0.567-0.696-0.888C1.385,7.89,1.67,5.613,3.155,4.14c0.864-0.856,2.012-1.329,3.233-1.329c1.924,0,3.115,1.12,3.612,1.752c0.499-0.634,1.689-1.752,3.612-1.752c1.221,0,2.369,0.472,3.233,1.329c1.484,1.473,1.771,3.75,0.693,5.537c-0.19,0.32-0.425,0.618-0.695,0.887l-6.562,6.51C10.125,17.229,9.875,17.229,9.719,17.073 M6.388,3.61C5.379,3.61,4.431,4,3.717,4.707C2.495,5.92,2.259,7.794,3.145,9.265c0.158,0.265,0.351,0.51,0.574,0.731L10,16.228l6.281-6.232c0.224-0.221,0.416-0.466,0.573-0.729c0.887-1.472,0.651-3.346-0.571-4.56C15.57,4,14.621,3.61,13.612,3.61c-1.43,0-2.639,0.786-3.268,1.863c-0.154,0.264-0.536,0.264-0.69,0C9.029,4.397,7.82,3.61,6.388,3.61"></path>
                      </svg>
                    </a>
                    <div classNaame="tempo">
                      {minutesAndSeconds(element.duration_ms)}
                    </div>
                  </div>
                </div>;
              })
              : null}
          </div>
        </div>
      </div>
      <div className="player">

      </div>
    </div>
  );

}

function inputKeyPress(event) {
  if (event.key === 'Enter') {
    console.log('inputKeyPress -> ' + event.target.value);
  }

  return event.target.value;
}

function minutesAndSeconds(ms) {
  var minutes = Math.floor(ms / 60000);
  var seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}