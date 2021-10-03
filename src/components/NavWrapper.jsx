import React from "react";
import MainMenu from "./MainMenu";
import { Link, useLocation } from "react-router-dom";

import "../style/NavWrapper.scss";

export default function NavWrapper(props) {
  let location = useLocation();
  return (
    <nav>
      <h1>
        <Link to="/user-list-v2">User List</Link>
      </h1>
      {location.pathname === "/user-list-v2" && (
        <div className={"menu "}>
          <MainMenu />
        </div>
      )}
    </nav>
  );
}
