import React from "react"
import { EmojiNeutralFill } from "react-bootstrap-icons";
import "../style/NoResults.scss"

export function NoResults(props) {
  return (
    <div className="NoResults">
      <EmojiNeutralFill size="10rem" className="d-block mx-auto" />
      <h1 className="display-3 text-center">{props.message}</h1>
    </div>
  );
}