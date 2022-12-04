// react dependencies

import React, { useState, useEffect } from "react";

// other dependencies

import request from 'request';

import ControlNext from "../ControlNext";
import ControlPlay from "../ControlPlay";
import ControlPrevious from "../ControlPrevious";
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
        // console.log("CURRENT PLAYING -> ", body);
        setcurrentTrack(body);
        setcurrentArtists(body.item.artists.name);
      } else {
        // console.log("ERROR CURRENT PLAYING -> ", error);
      }


    });

  }


  useEffect(() => {
    getCurrentTrack();

  }, []);



  return (
    <div className="player">
      <div className="song">
        <div className="flex">
          <img
            className="album-image"
            src={currentTrack.item ? currentTrack.item.album.images[0].url : ""}
          />
          <div className="music-text">
            <div className="song-name">{currentTrack ? currentTrack.item.name : ""}</div>
            <div className="artist-name">{currentTrack ? currentTrack.item.artists.name : "  "}</div>
          </div>
          <a className="icon" href="#">
            <svg className="svg-icon" viewBox="0 0 20 20">
              <path d="M13.22,2.984c-1.125,0-2.504,0.377-3.53,1.182C8.756,3.441,7.502,2.984,6.28,2.984c-2.6,0-4.714,2.116-4.714,4.716c0,0.32,0.032,0.644,0.098,0.96c0.799,4.202,6.781,7.792,7.46,8.188c0.193,0.111,0.41,0.168,0.627,0.168c0.187,0,0.376-0.041,0.55-0.127c0.011-0.006,1.349-0.689,2.91-1.865c0.021-0.016,0.043-0.031,0.061-0.043c0.021-0.016,0.045-0.033,0.064-0.053c3.012-2.309,4.6-4.805,4.6-7.229C17.935,5.1,15.819,2.984,13.22,2.984z M12.544,13.966c-0.004,0.004-0.018,0.014-0.021,0.018s-0.018,0.012-0.023,0.016c-1.423,1.076-2.674,1.734-2.749,1.771c0,0-6.146-3.576-6.866-7.363C2.837,8.178,2.811,7.942,2.811,7.7c0-1.917,1.554-3.47,3.469-3.47c1.302,0,2.836,0.736,3.431,1.794c0.577-1.121,2.161-1.794,3.509-1.794c1.914,0,3.469,1.553,3.469,3.47C16.688,10.249,14.474,12.495,12.544,13.966z"></path>
            </svg>
          </a>
        </div>
      </div>
      <div className="controls">
        <div className="controls-buttons">
          {/* <ControlRandom /> */}
          <ControlPrevious />
          <ControlPlay />
          <ControlNext />
          {/* <ControlReapt /> */}
        </div>
        <div className="progress-bar">
          <div className="time start">{currentTrack ? minutesAndSeconds(currentTrack.progress_ms) : ""}</div>
          <div className="music-bar">
            <div className="music-fill">
            </div>
          </div>
          <div className="time end">{currentTrack ? minutesAndSeconds(currentTrack.item.duration_ms) : ""}</div>
        </div>
      </div>
      <div className="volume-bar">
        <a className="icon" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z" /> <path d="M7 6a1 1 0 0 1 1 1v10a1 1 0 0 1-2 0V7a1 1 0 0 1 1-1zm2.079 6.408a.5.5 0 0 1 0-.816l7.133-5.036a.5.5 0 0 1 .788.409v10.07a.5.5 0 0 1-.788.409l-7.133-5.036z" /> </g> </svg>
        </a>
        <a className="icon" href="#">
          <svg className="svg-icon" viewBox="0 0 20 20">
            <path fill="none" d="M9.394,4.925L5.743,6.953H2.575c-0.24,0-0.435,0.195-0.435,0.435v5.06c0,0.24,0.194,0.436,0.435,0.436h3.168l3.651,2.027c0.066,0.037,0.138,0.055,0.211,0.055c0.077,0,0.152-0.02,0.221-0.061c0.132-0.078,0.214-0.221,0.214-0.373V5.305c0-0.154-0.082-0.296-0.214-0.375C9.694,4.853,9.528,4.85,9.394,4.925z M9.171,13.791l-3.104-1.725c-0.064-0.035-0.138-0.055-0.212-0.055H3.01V7.822h2.845c0.074,0,0.147-0.019,0.212-0.055l3.104-1.723V13.791z"></path>
            <path fill="none" d="M15.332,4.923c-0.166,0.174-0.16,0.449,0.014,0.615c0.037,0.036,3.707,3.648-0.057,8.988c-0.137,0.197-0.09,0.467,0.107,0.605c0.074,0.055,0.162,0.08,0.25,0.08c0.135,0,0.27-0.064,0.355-0.186c4.188-5.943-0.014-10.075-0.055-10.116C15.773,4.744,15.496,4.75,15.332,4.923z"></path>
            <path fill="none" d="M12.479,6.811c-0.166,0.174-0.158,0.449,0.014,0.614c0.088,0.084,2.137,2.102-0.055,5.211c-0.139,0.197-0.09,0.469,0.105,0.607c0.076,0.053,0.164,0.078,0.25,0.078c0.135,0,0.271-0.064,0.355-0.184c2.617-3.716-0.027-6.316-0.055-6.341C12.922,6.631,12.643,6.639,12.479,6.811z"></path>
          </svg>
        </a>

        <div className="volbar">
          <div className="volfill">

          </div>
        </div>

      </div>


    </div>

  );
}