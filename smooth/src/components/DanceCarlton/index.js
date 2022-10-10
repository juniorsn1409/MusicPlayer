// react dependencies

import React from 'react';

// css dependencies

import "./index.css";

// spotify dependencies



//components dependencies


export default function BaseComponent() {
  return (
    <div>
      <div className="screen"></div>
      <ul className="dance-animation">
        <li className="dance-frame dance-animation--dancer1"></li>
        <li className="dance-frame dance-animation--dancer2"></li>
        <li className="dance-frame dance-animation--dancer3"></li>
        <li className="dance-frame dance-animation--dancer4"></li>
        <li className="dance-frame dance-animation--dancer5"></li>
        <li className="dance-frame dance-animation--dancer6"></li>
        <li className="dance-frame dance-animation--dancer7"></li>
        <li className="dance-frame dance-animation--dancer8"></li>
        <li className="dance-frame dance-animation--dancer9"></li>
        <li className="dance-frame dance-animation--dancer10"></li>
        <li className="dance-frame dance-animation--dancer11"></li>
      </ul>
      <iframe width="0" height="0" src="https://www.1youtuberepeater.com/watch?v=kWvbJsB0OBc&name=Tom+Jones+Its+Not+Unusual+With+Lyrics" frameborder="0" allowfullscreen></iframe>

      <div className="play-music">
        <div id="music-animation" className="music-animation">
          <span className="bar bar1"></span>
          <span className="bar bar2"></span>
          <span className="bar bar3"></span>
          <span className="bar bar4"></span>
          <span className="bar bar5"></span>
        </div>
        <div className="music-toggle"><a onClick="togglePlay()" id="toggle" data-text-swap="Music on">Music off</a></div>
      </div>
      <audio id="music" loop="loop" src="https://web.opendrive.com/api/v1/download/file.json/OV84MDUyNTM1NF9aSXB6Sw?inline=1"></audio>

    </div>
  );
}

// helpers functions

var music = document.getElementById("music");
var isPlaying = false;
music.volume = 0.2;
function togglePlay() {
  if (isPlaying) {
    music.pause()
  } else {
    music.play();
  }
};
music.onplaying = function() {
  isPlaying = true;
  document.getElementById("music-animation").classList.add('on')
};
music.onpause = function() {
  isPlaying = false;
  document.getElementById("music-animation").classList.remove('on')
};

var button = document.getElementById("toggle");
button.addEventListener('click', function() {
  if (button.getAttribute("data-text-swap") == button.innerHTML) {
    button.innerHTML = button.getAttribute("data-text-original");
  } else {
    button.setAttribute("data-text-original", button.innerHTML);
    button.innerHTML = button.getAttribute("data-text-swap");
  }
}, false);
