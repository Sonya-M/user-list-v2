// gridView={this.state.gridView}
//           onToggleView={this.handleToggleView}
//           onRefresh={this.handleRefresh}

import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ArrowClockwise, ListUl, Grid } from "react-bootstrap-icons";

export default function MainMenu(props) {

  return (
    <Fragment>
      <Link to="/about">
        <span className="menuItem">About</span>
      </Link>
      <span className="menuItem ViewIconSpan">
        <ArrowClockwise
          onClick={props.onRefresh}
        />{" "}
      </span>
      <span className=" menuItem ViewIconSpan">
        {props.gridView
          ? (<ListUl
            onClick={props.onToggleView} />)
          : (<Grid onClick={props.onToggleView} />)
        }
      </span>
    </Fragment>
  )
}