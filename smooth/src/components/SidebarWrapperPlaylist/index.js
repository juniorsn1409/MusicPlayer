// react dependencies

import React, { useState, useEffect } from 'react';

// other dependencies

import request from 'request';

import SideTitle from '../SideTitle';
import Playlist from '../Playlist';

//spotify dependencies


import { ACCESS_TOKEN } from '../../spotify/helpful/env-smooth';

// css dependencies

import "./index.css";
import "./../base.css";

// =================================================================== //

export default function SidebarWrapperPlaylist() {

  const [playlist, setPlaylist] = useState("");

  const userID = localStorage.getItem("user_id");

  async function getPlaylist() {

    const token = localStorage.getItem(ACCESS_TOKEN);

    const url = `https://api.spotify.com/v1/users/${userID}/playlists`;

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
        // console.log("GET-PLAYLIST -> ", body);
        setPlaylist(body.items);
      } else {
        // console.log("ERROR GET-PLAYLIST -> ", error);
      }

    });
  }

  useEffect(() => {
    getPlaylist();
  }, [])



  return (

    <div className="side-wrapper">
      <SideTitle desc="PLAYLISTS" />

      {Array.isArray(playlist) ? playlist.map((item, index) => {
        return (
          <Playlist key={index} desc={item.name} />
        )
      }) : null}

    </div>
  );

}