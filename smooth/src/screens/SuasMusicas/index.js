// react dependencies

import React, { useEffect, useState } from "react";

// spotify dependencies

import { ACCESS_TOKEN, NEXT } from '../../spotify/helpful/env-smooth';


// components dependencies

import Logo from "../../components/Logo";
import Player from "../../components/Player";
import SidebarWrapperMenu from "../../components/SidebarWrapperMenu";
import SidebarWrapperPlaylist from "../../components/SidebarWrapperPlaylist";

// css dependencies

import "./index.css";

// other dependencies

import request from 'request';

// =================================================================== //

export default function SuasMusicas() {

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

          </div>
          <div className="main-content">

          </div>
        </div>
      </div>
      <Player />
    </div>
  );
}
