import React from "react";
import { EmojiFrownFill } from "react-bootstrap-icons";
import "../style/ErrorDisplay.scss";

export function ErrorDisplay(props) {
  const msg = "Unknown error";
  return (
    <div className="ErrorDisplay">
      <EmojiFrownFill size="10rem" className="d-block mx-auto" />
      <h1 className="display-3 text-center">{props.message || msg}</h1>
    </div>
  );
}