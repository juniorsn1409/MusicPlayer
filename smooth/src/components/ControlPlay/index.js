// react dependencies

import React, { useEffect, useState } from "react";

// other dependencies

import request from "request";

//spotify dependencies

// import { ACCESS_TOKEN, PLAYBACKSTATE } from '../../spotify/helpful/env-smooth';

import putPlay from "../../spotify/endpoints/put_play";
import putPause from "../../spotify/endpoints/put_pause";


// css dependencies

import "./index.css";
import "./../base.css";

// =================================================================== //

export default function ControlPlay({isPlaying}) {
  
  console.log("IS PLAYING -> ", isPlaying);

  return (
    <a
      className="control-link"
      onClick={() => {
        isPlaying ? putPause() : putPlay();
      }}
    >
      <svg
        className="icon-control"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d={isPlaying ? "M10 24h-6v-24h6v24zm10-24h-6v24h6v-24z" : "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 18v-12l10 6-10 6z"} />
      </svg>
    </a>
  );
}

// function Resume(isPlaying) {
//   if (isPlaying === true) {
//     return pause();
//   } else {
//     return play();
//   }
// }

// function play() {
//   return (
//     <a className="control-link" onClick={() => putPlay()}>
//       <svg className="icon-control" viewBox="0 0 24 24" fill="currentColor">
//         <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 18v-12l10 6-10 6z" />
//       </svg>
//     </a>
//   );
// }

// function pause() {
//   return (
//     <a className="control-link" onClick={() => putPause()}>
//       <svg
//         className="icon-control"
//         viewBox="0 0 24 24"
//         fill="currentColor"
//         fill-rule="evenodd"
//         clip-rule="evenodd"
//       >
//         <path d="M10 24h-6v-24h6v24zm10-24h-6v24h6v-24z" />
//       </svg>
//     </a>
//   );
// }
