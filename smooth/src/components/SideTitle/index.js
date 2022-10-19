// react dependencies

import React from 'react';

// other dependencies


//spotify dependencies


// css dependencies

import "./index.css";
import "./../base.css";

// =================================================================== //

export default function SideTitle({desc}) {
  return (
    <div className="side-title">
      {desc}
    </div>
  );
}