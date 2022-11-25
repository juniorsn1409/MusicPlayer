// react dependencies

import React, { useState, useEffect } from 'react';

// other dependencies

import request from 'request';

import SideTitle from '../SideTitle';
import Playlist from '../Playlist';

//spotify dependencies


import { ACCESS_TOKEN, ME } from '../../spotify/helpful/env-smooth';

import { getMe } from '../../spotify/endpoints/get_me';

// css dependencies

import "./index.css";
import "./../base.css";

// =================================================================== //

export default function SidebarWrapperPlaylist(id) {

  const [playlist, setPlaylist] = useState("");
  const [user_id, setUser_id] = useState("");

  const userID = "y0k4jdu5z22fxnek2dh33x3ra";

  const user_getMe = getMe();

  async function getPlaylist() {

    // e.preventDefault();

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
        console.log("GET-PLAYLIST -> ", body);
        setPlaylist(body.items);
      } else {
        console.log("ERROR GET-PLAYLIST -> ", error);
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