import React from "react";
import { Link } from "react-router-dom";

import "../style/NavWrapper.scss";

export default function NavWrapper(props) {
  return (
    <nav>
      <h1><Link to="/home">User List</Link></h1>
      {props.menu &&
        (<div className={"menu "} >
          {props.menu}
        </div>)
      }
    </nav >
  )
}