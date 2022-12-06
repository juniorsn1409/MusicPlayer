// react dependencies

import React, { useEffect, useState } from "react";

// spotify dependencies

import { ACCESS_TOKEN, NEXT } from '../../spotify/helpful/env-smooth';


// components dependencies

import Logo from "../../components/Logo";
import Player from "../../components/Player";
import SidebarWrapperMenu from "../../components/SidebarWrapperMenu";
import SidebarWrapperPlaylist from "../../components/SidebarWrapperPlaylist";

// css dependencies

import "./index.css";

// other dependencies

import request from 'request';

// =================================================================== //

export default function SuasMusicas() {

  const [musicas, setMusicas] = useState();


  async function searchMusic() {

    const url = 'http://localhost/MusicPlayer/smooth/src/banco/api/';

    const options = {
      url: url,
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*', // <--- CORS
        mode: 'no-cors',
      },
      json: true
    };

    request.get(options, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        console.log("GET-SEARCH -> ", body);
        setMusicas(body);
      } else {
        console.log("ERROR GET-SEARCH -> ", error);
      }

    });

  }

  useEffect(() => {
    setMusicas(searchMusic());
  }, []);

  return (
    <div className="container">
      <div className="main">
        <div className="sidebar">
          <div className="side">
            <Logo />
            <SidebarWrapperMenu />
            <SidebarWrapperPlaylist />
          </div>
        </div>
        <div className="content">
          <div className="header-content">
            Suas Musicas
          </div>
          <div className="main-content">

          </div>
        </div>
      </div>
      <Player />
    </div>
  );
}

// =================================================================== //