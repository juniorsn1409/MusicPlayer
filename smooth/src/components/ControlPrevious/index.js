// react dependencies

import React from "react";

// other dependencies

import request from 'request';

//spotify dependencies

import { ACCESS_TOKEN, PREVIOUS } from '../../spotify/helpful/env-smooth';

// css dependencies

import "./index.css";
import "./../base.css";

// =================================================================== //

export default function ControlPrevious() {

  async function postPREVIOUS() {

    const token = localStorage.getItem(ACCESS_TOKEN);
    const url = PREVIOUS;

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
        console.log("PREVIOUS -> ", body);
      } else {
        console.log("ERROR PREVIOUS -> ", error);
      }

    }
    );
  }

  return (
    <a className="control-link" onClick={() => postPREVIOUS()}>
      <svg className="icon-control" viewBox="0 0 24 24" fill="currentColor">
        <path  d="M4 2v20h-2v-20h2zm18 0l-16 10 16 10v-20z"/>
      </svg>
    </a>
  );
}
