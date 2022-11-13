// react dependencies

import React, { useState } from 'react';

// spotify dependencies

import { getTokenFromLocation } from './../../spotify/location-smooth'

// components dependencies

import SearchBar from './../../components/SearchBar';
import Logo from './../../components/Logo';
import SideTitle from './../../components/SideTitle';
import SidebarLink from './../../components/SidebarLink';

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
              
            </div>
            {/* <SidebarLink link="#" desc="Descobrir" isActive="false" path="M9.135 20.773v-3.057c0-.78.637-1.414 1.423-1.414h2.875c.377 0 .74.15 1.006.414.267.265.417.625.417 1v3.057c-.002.325.126.637.356.867.23.23.544.36.87.36h1.962a3.46 3.46 0 002.443-1 3.41 3.41 0 001.013-2.422V9.867c0-.735-.328-1.431-.895-1.902l-6.671-5.29a3.097 3.097 0 00-3.949.072L3.467 7.965A2.474 2.474 0 002.5 9.867v8.702C2.5 20.464 4.047 22 5.956 22h1.916c.68 0 1.231-.544 1.236-1.218l.027-.009z" />
            <SidebarLink link="#" desc="Buscar" isActive="true" path="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            <SidebarLink link="#" desc="Suas Musicas" isActive="false" path="M7.33 2h9.34c3.4 0 5.32 1.93 5.33 5.33v9.34c0 3.4-1.93 5.33-5.33 5.33H7.33C3.93 22 2 20.07 2 16.67V7.33C2 3.93 3.93 2 7.33 2zm4.72 15.86c.43 0 .79-.32.83-.75V6.92a.815.815 0 00-.38-.79.84.84 0 00-1.28.79v10.19c.05.43.41.75.83.75zm4.6 0c.42 0 .78-.32.83-.75v-3.28a.839.839 0 00-1.28-.79.806.806 0 00-.38.79v3.28c.04.43.4.75.83.75zm-8.43-.75a.827.827 0 01-.83.75c-.43 0-.79-.32-.83-.75V10.2a.84.84 0 01.39-.79c.27-.17.61-.17.88 0s.42.48.39.79v6.91z" /> */}
          </div>
        </div>
        <div className="content">
          <div class="search-bar">
            <input type="text" placeholder="Procurar músicas" />
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