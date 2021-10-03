import React, { Fragment, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DataContext from "../store/data-context";
import { getTimeAgo } from "../utilities/helperFns";

import "../style/FooterWrapper.scss";

export default function FooterWrapper(props) {
  const ctx = useContext(DataContext);
  const [timeFromLastRefresh, setTimeFromLastRefresh] = useState("");
  let location = useLocation();

  const calculateTimeSinceRefresh = () => {
    // if (this.state.lastRefresh) { //it's always set in the constructor, at least to 0
    const time = getTimeAgo(ctx.lastRefresh);
    setTimeFromLastRefresh("Last update: " + time + " ago");
    // }
  };

  useEffect(() => {
    const intervalID = setInterval(calculateTimeSinceRefresh, 1000);
    return () => {
      clearInterval(intervalID);
    };
  });

  return (
    <footer className="px-2">
      <div>© 2021 Sonja</div>

      <Fragment>
        {location.pathname.includes("/user-list-v2") && (
          <div className="info">{timeFromLastRefresh}</div>
        )}
      </Fragment>
    </footer>
  );
}
