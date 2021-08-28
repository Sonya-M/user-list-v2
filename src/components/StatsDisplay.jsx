import React from "react"

export function StatsDisplay(props) {
  return (
    <div className="d-flex justify-content-end text-secondary">
      <p>Male: {props.nMales} Female: {props.nFemales}</p>
    </div>
  );
}