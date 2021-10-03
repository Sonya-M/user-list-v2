// gridView={this.state.gridView}
//           onToggleView={this.handleToggleView}
//           onRefresh={this.handleRefresh}

import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ArrowClockwise, ListUl, Grid } from "react-bootstrap-icons";
import { useContext } from "react";
import DataContext from "../store/data-context";

export default function MainMenu(props) {
  const ctx = useContext(DataContext);

  return (
    <Fragment>
      <Link to="/about">
        <span className="menuItem">About</span>
      </Link>
      <span className="menuItem ViewIconSpan">
        <ArrowClockwise onClick={ctx.onRefresh} />{" "}
      </span>
      <span className=" menuItem ViewIconSpan">
        {ctx.gridView ? (
          <ListUl onClick={ctx.onToggleView} />
        ) : (
          <Grid onClick={ctx.onToggleView} />
        )}
      </span>
    </Fragment>
  );
}
