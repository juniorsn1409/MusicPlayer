// react dependencies

import React, { useState, useEffect } from "react";

// spotify dependencies

import { getTokenFromLocation, getRefreshTokenFromLocation } from "./../../spotify/location-smooth";
import { minutesAndSeconds } from "./../../spotify/minutesAndSeconds";

// components dependencies

import Logo from "./../../components/Logo";
import SideTitle from "./../../components/SideTitle";
import SidebarLink from "./../../components/SidebarLink";
import Plalist from "./../../components/Playlist";

// css dependencies

import "./index.css";
// import "./../../components/base.css";

// other dependencies

import request from "request";

// =================================================================== //

export default function Home() {
  const token = getTokenFromLocation();
  const refresh_token = getRefreshTokenFromLocation();

  const [searchInput, setSearchInput] = useState("");
  const [track, setTrack] = useState("");

  async function search() {
    var url = `https://api.spotify.com/v1/search?q=${searchInput}&type=track,artist,album,playlist`;

    const options = {
      url: url,
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
      json: true,
    };

    request.get(options, function (error, response, body) {
      if (!error && response.statusCode === 200) {

        setTrack(body.tracks.items);
      } else {
        console.log(error);
      }
    });
  }

  return (
    <div className="container">
      <div className="main">
        <div className="sidebar">
          <div className="side">
            <Logo />
            <div className="side-wrapper">
              <SideTitle desc="MENU" />
              <div className="side-menu">
                <SidebarLink
                  link="#"
                  desc="Descobrir"
                  isActive="false"
                  path="M9.135 20.773v-3.057c0-.78.637-1.414 1.423-1.414h2.875c.377 0 .74.15 1.006.414.267.265.417.625.417 1v3.057c-.002.325.126.637.356.867.23.23.544.36.87.36h1.962a3.46 3.46 0 002.443-1 3.41 3.41 0 001.013-2.422V9.867c0-.735-.328-1.431-.895-1.902l-6.671-5.29a3.097 3.097 0 00-3.949.072L3.467 7.965A2.474 2.474 0 002.5 9.867v8.702C2.5 20.464 4.047 22 5.956 22h1.916c.68 0 1.231-.544 1.236-1.218l.027-.009z"
                />
                <SidebarLink
                  link="#"
                  desc="Buscar"
                  isActive="true"
                  path="M10.835 12.007l.002.354c.012 1.404.096 2.657.242 3.451 0 .015.16.802.261 1.064.16.38.447.701.809.905a2 2 0 00.91.219c.249-.012.66-.137.954-.242l.244-.094c1.617-.642 4.707-2.74 5.891-4.024l.087-.09.39-.42c.245-.322.375-.715.375-1.138 0-.379-.116-.758-.347-1.064-.07-.099-.18-.226-.28-.334l-.379-.397c-1.305-1.321-4.129-3.175-5.593-3.79 0-.013-.91-.393-1.343-.407h-.057c-.665 0-1.286.379-1.603.991-.087.168-.17.496-.233.784l-.114.544c-.13.874-.216 2.216-.216 3.688zm-6.332-1.525C3.673 10.482 3 11.162 3 12a1.51 1.51 0 001.503 1.518l3.7-.328c.65 0 1.179-.532 1.179-1.19 0-.658-.528-1.191-1.18-1.191l-3.699-.327z"
                />
                <SidebarLink
                  link="#"
                  desc="Suas Musicas"
                  isActive="false"
                  path="M7.33 2h9.34c3.4 0 5.32 1.93 5.33 5.33v9.34c0 3.4-1.93 5.33-5.33 5.33H7.33C3.93 22 2 20.07 2 16.67V7.33C2 3.93 3.93 2 7.33 2zm4.72 15.86c.43 0 .79-.32.83-.75V6.92a.815.815 0 00-.38-.79.84.84 0 00-1.28.79v10.19c.05.43.41.75.83.75zm4.6 0c.42 0 .78-.32.83-.75v-3.28a.839.839 0 00-1.28-.79.806.806 0 00-.38.79v3.28c.04.43.4.75.83.75zm-8.43-.75a.827.827 0 01-.83.75c-.43 0-.79-.32-.83-.75V10.2a.84.84 0 01.39-.79c.27-.17.61-.17.88 0s.42.48.39.79v6.91z"
                />
              </div>
            </div>
            <div className="side-wrapper">
              <SideTitle desc="PLAYLISTS" />
              <Plalist desc="exemplo de playlist" />
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header-content">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Procurar músicas"
                onKeyPress={(e) => {
                  setSearchInput(e.target.value)
                }}
                onChange={ search()}
              />
            </div>
          </div>
          <div className="main-content">
            {Array.isArray(track)
              ? track.map((element) => {
                return (
                  <div className="music" key={element.id}>
                    <div className="esquerda">
                      <img
                        className="music-img"
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
      <div className="player">
        <div className="song">
          <div className="call-it-a flex">
            <img
              className="album-image"
              src="https://cdn.discordapp.com/attachments/382037367940448256/755716276214824960/album_cover_b.png"
            />
            <div className="music-text">
              <div className="song-name">The Baddest</div>
              <div className="artist-name">K/DA, (G)I-DLE & Wolftyla</div>
            </div>
            <a className="icon" href="#">
              <svg className="svg-icon" viewBox="0 0 20 20">
                <path d="M13.22,2.984c-1.125,0-2.504,0.377-3.53,1.182C8.756,3.441,7.502,2.984,6.28,2.984c-2.6,0-4.714,2.116-4.714,4.716c0,0.32,0.032,0.644,0.098,0.96c0.799,4.202,6.781,7.792,7.46,8.188c0.193,0.111,0.41,0.168,0.627,0.168c0.187,0,0.376-0.041,0.55-0.127c0.011-0.006,1.349-0.689,2.91-1.865c0.021-0.016,0.043-0.031,0.061-0.043c0.021-0.016,0.045-0.033,0.064-0.053c3.012-2.309,4.6-4.805,4.6-7.229C17.935,5.1,15.819,2.984,13.22,2.984z M12.544,13.966c-0.004,0.004-0.018,0.014-0.021,0.018s-0.018,0.012-0.023,0.016c-1.423,1.076-2.674,1.734-2.749,1.771c0,0-6.146-3.576-6.866-7.363C2.837,8.178,2.811,7.942,2.811,7.7c0-1.917,1.554-3.47,3.469-3.47c1.302,0,2.836,0.736,3.431,1.794c0.577-1.121,2.161-1.794,3.509-1.794c1.914,0,3.469,1.553,3.469,3.47C16.688,10.249,14.474,12.495,12.544,13.966z"></path>
              </svg>
            </a>
            <audio src="https://cdn.discordapp.com/attachments/900670626774265886/900759959845863474/THE_BADDEST.mp3"></audio>
          </div>
        </div>
        <div className="controls">
          <div className="controls-buttons">
            <div className="mcontrols">
              <div className="flex">
                <a className="prev">
                  <i data-feather="skip-back"></i>
                </a>

                <a className="playbutt">
                  <div className="playy">
                    <div className="fen"><i className="fas fa-play"></i></div>
                  </div>

                  <div className="pausee">
                    <div className="fen"><i className="dripicons dripicons-media-pause"></i></div>
                  </div>
                </a>

                <a className="next">
                  <i data-feather="skip-forward"></i>
                </a>
              </div>
            </div>

          </div>
          <div className="progress-bar">
            <div className="time start">0:00</div>
            <div className="music-bar">
              <div className="music-fill">
              </div>
            </div>
            <div className="time end">5:07</div>
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
    </div>
  );
}
