import React from "react";
import MainMenu from "./MainMenu";
import { Link, useLocation } from "react-router-dom";

import "../style/NavWrapper.scss";

export default function NavWrapper(props) {
  let location = useLocation();
  return (
    <nav>
      <h1>
        <Link to="/">User List</Link>
      </h1>
      {location.pathname === "/" && (
        <div className={"menu "}>
          <MainMenu />
        </div>
      )}
    </nav>
  );
}
