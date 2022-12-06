// react dependencies

import React, { useState, useEffect } from "react";

// other dependencies

import request from 'request';

import ControlNext from "../ControlNext";
import ControlPlay from "../ControlPlay";
import ControlPrevious from "../ControlPrevious";
import getPlayerState from "../../spotify/endpoints/get_playbackState";
// import ControlRandom from "../ControlRandom";
// import ControlReapt from "../ControlReapt";

// https://iconmonstr.com/media-control/

//spotify dependencies

import { minutesAndSeconds } from "../../spotify/helpful/minutesAndSeconds";
import { ACCESS_TOKEN, PLAYBACKSTATE } from '../../spotify/helpful/env-smooth';
// css dependencies

import "./index.css";
import "../base.css";

// =================================================================== //

export default function Player() {

  const [currentTrack, setcurrentTrack] = useState("");
  const [currentArtists, setcurrentArtists] = useState("");
  const [isPlaying, setisPlaying] = useState(false);
  const [musicUir, setmusicUir] = useState("");

  const token = localStorage.getItem(ACCESS_TOKEN);

  async function getCurrentTrack() {

    const token = localStorage.getItem(ACCESS_TOKEN);
    const url = PLAYBACKSTATE;

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
        console.log("CURRENT PLAYING -> ", body);
        setcurrentTrack(body);
        setmusicUir(body.item.uri);
        setcurrentArtists(body.item.artists.name);
      } else {
        // console.log("ERROR CURRENT PLAYING -> ", error);
      }


    });

  }


  useEffect(() => {

    setisPlaying(getPlayerState());
    console.count("IS PLAYING -> ", isPlaying);
  }, []);

  useEffect(() => {
    getCurrentTrack();
    console.count("CURRENT TRACK -> ", currentTrack);
  }, []);

  return (
    <div className="player">

      {/* <ControlRandom /> */}
      {/* <ControlPrevious /> */}
      <ControlPlay accessToken={token} trackUri={musicUir} />
      {/* <ControlNext /> */}
      {/* <ControlReapt /> */}
    </div>

  );
}