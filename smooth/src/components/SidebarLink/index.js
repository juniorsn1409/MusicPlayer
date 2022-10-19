// react dependencies

import React from 'react';

// other dependencies


//spotify dependencies


// css dependencies

import "./index.css";
import "./../base.css";

// =================================================================== //

export default function SidebarLink({link, desc, path, isActive}) {

  var active = "";

  if (isActive === "true") {
    active = "is-active";
  }

  return(
    <a className={`sidebar-link  ${active}`}  href={link}>
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d={path} />
      </svg>
      {desc}
    </a>
  );
}