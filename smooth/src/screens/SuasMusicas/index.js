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

  // async function searchMusic() {

  //   const url = 'http://localhost/MusicPlayer/smooth/src/banco/api';

  //   const options = {
  //     url: url,
  //     headers: {
  //       'content-type': 'application/json',
  //       'Acess-Control-Allow-Origin': '*',
  //     },
  //     json: true
  //   };

  //   request.get(options, function (error, response, body) {

  //     if (!error && response.statusCode === 200) {
  //       console.log("GET-MUSICA-API -> ", body);
  //       setMusicas(body);
  //     } else {
  //       console.log("ERROR GET-MUSICA-API -> ", error);
  //     }

  //   });

  // }

  useEffect(() => {

    // const response = fetch('http://localhost/MusicPlayer/smooth/src/banco/api', {
    //   method: 'GET', // *GET, POST, PUT, DELETE, etc.
    //   mode: 'cors', // no-cors, *cors, same-origin
    //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //   credentials: 'same-origin', // include, *same-origin, omit
    //   headers: {
    //     'Content-Type': 'application/json'
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },

    // }).then(function(response) {
    //   setMusicas(response.json());
    // })


    console.log("SET-MUSICA-API -> ", musicas);
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
            <div className="musicas">
              {musicas}
            </div>
          </div>
        </div>
      </div>
      <Player />
    </div>
  );
}

// =================================================================== //