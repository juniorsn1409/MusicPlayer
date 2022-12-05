// react dependencies

import React, { useEffect, useState } from "react";

// other dependencies

import request from 'request';

//spotify dependencies

import { ACCESS_TOKEN, PAUSE, DEVICES, PLAY } from '../../spotify/helpful/env-smooth';

// css dependencies

import "./index.css";
import "./../base.css";

// =================================================================== //

export default function ControlPlay() {

  const [device, setDevice] = useState("");

  async function getDevices() {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const url = DEVICES;

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
        console.log("GET-DEVICES -> ", body.devices);
        setDevice(body.devices);
      } else {
        // console.log("ERROR GET-DEVICES -> ", error);
      }

    });
  }

  async function postPAUSE() {

    const token = localStorage.getItem(ACCESS_TOKEN);
    const url = PAUSE;

    const options = {
      url: url,
      headers: {
        'Authorization': 'Bearer ' + token,
        'content-type': 'application/json',
      },
      json: true
    };

    request.put(options, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        console.log("PAUSE -> ", body);
      } else {
        console.log("ERROR PAUSE -> ", error);
        console.log("ERROR PAUSE RESPONSE -> ", response.statusCode);
        console.log("ERROR PAUSE BODY -> ", body);
      }

    }
    );
  }

  async function postPLAY() {

    setDevice(getDevices());

    const token = localStorage.getItem(ACCESS_TOKEN);
    const url = `https://api.spotify.com/v1/me/player/play?device_id=${device[0].id}`;

    const options = {
      url: url,
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Content-Length': '116',
      },
    }

    request.put(url, options, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        console.log("PLAY -> ", body);
      } else {
        console.log("ERROR PLAY -> ", error);
        console.log("ERROR PLAY RESPONSE -> ", response.statusCode);
        console.log("ERROR PLAY BODY -> ", body);
      }

    });
  }

  async function setActivePlayer(deviceID) {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const url = `https://api.spotify.com/v1/me/player`;


    const devices_id = {

      "id": deviceID,
      "is_active": true,
      "is_private_session": false,
      "is_restricted": false,
      "name": "My fridge",
      "type": "Computer",
      "volume_percent": 50
    };

    console.log("DEVICE ACTIVE ->", devices_id);

    const options = {
      url: url,
      body: devices_id,
      headers: {

      },
    }

    request.put(url, options, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        console.log("ACTIVE -> ", body);
      } else {
        console.log("ERROR ACTIVE -> ", error);
        console.log("ERROR ACTIVE RESPONSE -> ", response);
        console.log("ERROR ACTIVE BODY -> ", body);
      }

    }
      ,
    );
  }

  useEffect(() => {
    setDevice(getDevices());
  }, []);

  return (
    <a className="control-link" onClick={() => postPLAY()}>
      <svg className="icon-control" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 18v-12l10 6-10 6z" />
      </svg>
    </a>
  );
}


// ICON PAUSE
{/* <a className="control-link" onClick={() => postNext()}>
  <svg className="icon-control" viewBox="0 0 24 24" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
    <path d="M10 24h-6v-24h6v24zm10-24h-6v24h6v-24z" />
  </svg>
</a> */}