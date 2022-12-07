// react dependencies

import React, { useEffect, useState } from "react";

// spotify dependencies

import { ACCESS_TOKEN, NEXT } from '../../spotify/helpful/env-smooth';

import { minutesAndSeconds } from "../../spotify/helpful/minutesAndSeconds";

// components dependencies

import Logo from "./../../components/Logo";
import Player from "./../../components/Player";
import SidebarWrapperMenu from "../../components/SidebarWrapperMenu";
import SidebarWrapperPlaylist from "../../components/SidebarWrapperPlaylist";

// css dependencies

import "./index.css";

// other dependencies

import request from 'request';

// =================================================================== //

export default function Home() {

  const [track, setTrack] = useState("");

  async function getSearch(input) {

    const token = localStorage.getItem(ACCESS_TOKEN);
    const url = `https://api.spotify.com/v1/search?q=${input}&type=track,artist,album,playlist`;

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
        console.log("GET-SEARCH -> ", body);
        setTrack(body.tracks.items);
      } else {
        console.log("ERROR GET-SEARCH -> ", error);
      }

    });

  }

  async function AddItemToPlaybackQueue(track) {

    const token = localStorage.getItem(ACCESS_TOKEN);
    const url = `https://api.spotify.com/v1/me/player/queue?uri=${track.uri}`;
    console.log("TRACK -> ", track);
    const options = {
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      json: true,
    };

    request.post(options, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        console.log("PUT-QUEUE-TRACK -> ", body);
      } else {
        console.log("ERROR PUT-QUEUE-TRACK -> ", error);
      }

    });
  }

  // async function PlayMusic(track) {

  //   const token = localStorage.getItem(ACCESS_TOKEN);
  //   const url = `https://api.spotify.com/v1/me/player/play`;

  //   console.log("TRACK -> ", track);

  //   const options = {
  //     url: url,

  //     headers: {
  //       'Content-Type': 'application/json',
  //       ' Authorization': 'Bearer ' + token,
  //       'body': JSON.stringify({'uris': [track.uri]}),

  //     }, json: true,
  //   }

  //   request.put(options, function (error, response, body){

  //     if (!error && response.statusCode === 200) {
  //       console.log("PUT-PLAY-TRACK -> ", body);
  //     } else {
  //       console.log("ERROR PUT-PLAY-TRACK -> ", error);
  //     }

  //   });
  // }

  function postNext() {

    const token = localStorage.getItem(ACCESS_TOKEN);
    const url = NEXT;

    const options = {
      url: url,
      headers: {
        'Authorization': 'Bearer ' + token,
        'content-type': 'application/json',
      },
      json: true
    };

    request.post(options, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        console.log("NEXT -> ", body);
      } else {
        console.log("ERROR NEXT -> ", error);
      }

    }
    );
  }

  useEffect(() => { console.log(track) }, [track]);

  return (
    <div className="container">
      <div className="main">
        <div className="sidebar">
          <div className="side">
            <Logo />
            <SidebarWrapperMenu/>
            <SidebarWrapperPlaylist />
          </div>
        </div>
        <div className="content">
          <div className="header-content">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Procurar músicas"
                onKeyPress={(e) => {
                  getSearch(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="main-content">
            {Array.isArray(track) ? track.map((element) => {
              return (
                <div className="music" key={element.id} onDoubleClick={() => {
                  AddItemToPlaybackQueue(element);
                }} >
                  <div className="esquerda">
                    <img
                      className="music-img" alt="music-img"
                      src={element.album.images[0].url}
                    />
                    <div className="music-info">
                      {element.name}
                      <br />
                      {element.artists[0].name}
                    </div>
                  </div>
                  <div className="meio">{element.album.name}</div>
                  <div className="direita">
                    <a className="icon" href="#">
                      <svg className="svg-icon" viewBox="0 0 20 20">
                        <path d="M13.22,2.984c-1.125,0-2.504,0.377-3.53,1.182C8.756,3.441,7.502,2.984,6.28,2.984c-2.6,0-4.714,2.116-4.714,4.716c0,0.32,0.032,0.644,0.098,0.96c0.799,4.202,6.781,7.792,7.46,8.188c0.193,0.111,0.41,0.168,0.627,0.168c0.187,0,0.376-0.041,0.55-0.127c0.011-0.006,1.349-0.689,2.91-1.865c0.021-0.016,0.043-0.031,0.061-0.043c0.021-0.016,0.045-0.033,0.064-0.053c3.012-2.309,4.6-4.805,4.6-7.229C17.935,5.1,15.819,2.984,13.22,2.984z M12.544,13.966c-0.004,0.004-0.018,0.014-0.021,0.018s-0.018,0.012-0.023,0.016c-1.423,1.076-2.674,1.734-2.749,1.771c0,0-6.146-3.576-6.866-7.363C2.837,8.178,2.811,7.942,2.811,7.7c0-1.917,1.554-3.47,3.469-3.47c1.302,0,2.836,0.736,3.431,1.794c0.577-1.121,2.161-1.794,3.509-1.794c1.914,0,3.469,1.553,3.469,3.47C16.688,10.249,14.474,12.495,12.544,13.966z"></path>
                      </svg>
                    </a>
                    <div classNameNaame="tempo">
                      {minutesAndSeconds(element.duration_ms)}
                    </div>
                    <a className="icon" href="#">
                      <svg className="svg-icon" viewBox="0 0 20 20">
                        <path
                          fill="none"
                          d="M3.936,7.979c-1.116,0-2.021,0.905-2.021,2.021s0.905,2.021,2.021,2.021S5.957,11.116,5.957,10 S5.052,7.979,3.936,7.979z M3.936,11.011c-0.558,0-1.011-0.452-1.011-1.011s0.453-1.011,1.011-1.011S4.946,9.441,4.946,10 S4.494,11.011,3.936,11.011z M16.064,7.979c-1.116,0-2.021,0.905-2.021,2.021s0.905,2.021,2.021,2.021s2.021-0.905,2.021-2.021 S17.181,7.979,16.064,7.979z M16.064,11.011c-0.559,0-1.011-0.452-1.011-1.011s0.452-1.011,1.011-1.011S17.075,9.441,17.075,10 S16.623,11.011,16.064,11.011z M10,7.979c-1.116,0-2.021,0.905-2.021,2.021S8.884,12.021,10,12.021s2.021-0.905,2.021-2.021 S11.116,7.979,10,7.979z M10,11.011c-0.558,0-1.011-0.452-1.011-1.011S9.442,8.989,10,8.989S11.011,9.441,11.011,10 S10.558,11.011,10,11.011z"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              );
            })
              : null}
          </div>
        </div>
      </div>
      <Player />
    </div>
  );
}
