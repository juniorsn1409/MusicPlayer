// react dependencies

import React, { useState } from 'react';

// spotify dependencies

import { getTokenFromLocation } from './../../spotify/location-smooth'

// components dependencies

import SearchBar from './../../components/SearchBar';
import Logo from './../../components/Logo';
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
          <Logo />
          <div className="sideW"> </div>
        </div>
        <div className="content">
          
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