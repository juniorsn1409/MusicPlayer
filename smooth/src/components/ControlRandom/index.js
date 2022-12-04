// react dependencies

import React, { useEffect } from "react";

// other dependencies

import request from 'request';

//spotify dependencies

import { ACCESS_TOKEN, NEXT } from '../../spotify/helpful/env-smooth';

// css dependencies

import "./index.css";
import "./../base.css";

// =================================================================== //

export default function ControlRandom() {

  async function postNext() {

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

  return (
    <a className="control-link" onClick={() => postNext()}>
      <svg className="icon-control" viewBox="0 0 24 24" fill="currentColor" >
        <path  d="M21.67 3.955l-2.825-2.202.665-.753 4.478 3.497-4.474 3.503-.665-.753 2.942-2.292h-4.162c-3.547.043-5.202 3.405-6.913 7.023 1.711 3.617 3.366 6.979 6.913 7.022h4.099l-2.883-2.247.665-.753 4.478 3.497-4.474 3.503-.665-.753 2.884-2.247h-4.11c-3.896-.048-5.784-3.369-7.461-6.858-1.687 3.51-3.592 6.842-7.539 6.858h-2.623v-1h2.621c3.6-.014 5.268-3.387 6.988-7.022-1.72-3.636-3.388-7.009-6.988-7.023h-2.621v-1h2.623c3.947.016 5.852 3.348 7.539 6.858 1.677-3.489 3.565-6.81 7.461-6.858h4.047z"/>
      </svg>
    </a>
  );
}
