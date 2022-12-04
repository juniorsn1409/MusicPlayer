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

export default function ControlNext() {

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
      <svg className="icon-control" viewBox="0 0 24 24" fill="currentColor">
        <path  d="M20 22v-20h2v20h-2zm-18 0l16-10-16-10v20z"/>
      </svg>
    </a>
  );
}
