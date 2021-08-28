import React from "react";

import "../style/FooterWrapper.scss";

export default function FooterWrapper(props) {
  return (
    <footer className="px-2">
      <div>© 2021 Sonja</div>

      {props.info &&
        (<div className="info">
          {props.info}
        </div>)}
    </footer>
  )
}