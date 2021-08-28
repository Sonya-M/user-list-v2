import React from "react";
import { LoadingAnimation } from "./LoadingAnimation";
import SearchableUserList from "./SearchableUserList";
import { ErrorDisplay } from "./ErrorDisplay";

export default function MainContent(props) {
  return (
    props.isLoading
      ? (<LoadingAnimation />)
      : (props.userList.length
        ? (<SearchableUserList
          userList={props.userList}
          gridView={props.gridView}
        />)
        : (<ErrorDisplay
          message="Sorry, something went wrong..."
        />)
      )
  )
}