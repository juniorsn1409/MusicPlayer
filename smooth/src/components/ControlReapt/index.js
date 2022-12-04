// react dependencies

import React, { useEffect, useState } from "react";

// other dependencies

import request from 'request';

//spotify dependencies

import { ACCESS_TOKEN, REPEAT, DEVICES } from '../../spotify/helpful/env-smooth';

// css dependencies

import "./index.css";
import "./../base.css";

// =================================================================== //

export default function ControlReapt() {

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

  async function putREPEAT() {

    const token = localStorage.getItem(ACCESS_TOKEN);
    const url = REPEAT;

    const reapetMode = ['track', 'context', 'off'];
    const data = { "state": reapetMode[0] };

    const options = {
      url: url,
      body: JSON.stringify(data),
      headers: {
        'Authorization': 'Bearer ' + token,
        'content-type': 'application/json',
      },
      json: true
    };

    request.put(url, options, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        console.log("PUT-REPEAT -> ", body);
      } else {
        console.log("ERROR PUT-REPEAT -> ", error);
      }

    }

    );
  }

  async function setREPEAT() {

    const token = localStorage.getItem(ACCESS_TOKEN);
    const url = REPEAT;

    const reapetMode = ['track', 'context', 'off'];
    const data = { "state": reapetMode[0] };

    const deviceId = {'device_id': device[0].id};

    let options = {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Authorization': 'Bearer ' + token,
        'content-type': 'application/json',
      }
    }

    fetch(url, options).then(response => {
      console.log("PUT-REPEAT -> ", response);
    }).catch(error => {
      console.log("ERROR PUT-REPEAT -> ", error);
    });
  }

  useEffect(() => { 
    setDevice( getDevices());
  }, []);

  return (
    <a className="control-link" onClick={() => setREPEAT()}>
      <svg className="icon-control" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
      </svg>
    </a>
  );
}

function alternateReapetMode() {

}