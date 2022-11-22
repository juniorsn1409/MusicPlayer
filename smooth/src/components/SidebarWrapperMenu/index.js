// react dependencies

import React from 'react';

// other dependencies

import SideTitle from '../SideTitle';
import SideMenu from '../SideMenu';

//spotify dependencies


// css dependencies

import "./index.css";
import "./../base.css";

// =================================================================== //

export default function SidebarWrapper() {
  return (
    <div className="side-wrapper">

      <SideTitle desc="MENU" />
      <SideMenu />

    </div>
  );
}