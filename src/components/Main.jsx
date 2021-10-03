import React, { useContext } from "react";
import { LoadingAnimation } from "./LoadingAnimation";
import SearchableUserList from "./SearchableUserList";
import { ErrorDisplay } from "./ErrorDisplay";
import DataContext from "../store/data-context";

const Main = (props) => {
  const ctx = useContext(DataContext);
  return ctx.isLoading ? (
    <LoadingAnimation />
  ) : ctx.userList.length ? (
    <SearchableUserList gridView={ctx.gridView} />
  ) : (
    <ErrorDisplay message="Sorry, something went wrong..." />
  );
};

export default Main;
