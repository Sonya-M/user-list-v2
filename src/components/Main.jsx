import React from "react";
import NavWrapper from "./NavWrapper";
import FooterWrapper from "./FooterWrapper";
import MainMenu from "./MainMenu";
import MainContent from "./MainContent"

import { retrieveUserData, delayedRetrieveUserData, dataInStorage } from "../data/userData.js";
import { getTimeAgo } from "../utilities/helperFns";

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userData: [],
      gridView: JSON.parse(localStorage.getItem("gridView")) || false,
      isLoading: true,
      lastRefresh: JSON.parse(localStorage.getItem("lastRefresh")) || 0,
      timeFromLastRefresh: "",
    };

    this.handleToggleView = this.handleToggleView.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  handleToggleView() {
    this.setState((state) => {
      return { gridView: !state.gridView };
    });
  }

  handleRefresh() {
    this.setState({ isLoading: true });
    this.loadData(true);
  }

  componentDidMount() {
    this.loadData(false);
    this.intervalID =
      setInterval(this.calculateTimeSinceRefresh.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
    // save view preferences only once instead of on each toggleView
    localStorage.setItem("gridView", this.state.gridView);
    localStorage.setItem("lastRefresh", this.state.lastRefresh);
  }

  loadData(fetchNew) {
    // check if new content will be fetched regardless of fetchNew value:
    // (need it to set the value of lastRefresh)
    if (!fetchNew && !dataInStorage()) fetchNew = true;
    retrieveUserData(fetchNew)
      // delayedRetrieveUserData(fetchNew, 1000) // simulate waiting for response...
      .then((userList) => {
        this.setState((prevState) => {
          return {
            userData: userList,
            isLoading: false,
            lastRefresh: fetchNew ? Date.now() : prevState.lastRefresh,
          }
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isLoading: false,
          userData: []
        });
      });
  }

  calculateTimeSinceRefresh() {
    if (this.state.lastRefresh) {
      const time = getTimeAgo(this.state.lastRefresh);
      this.setState({
        timeFromLastRefresh: "Last update: " + time + " ago",
      });
    }
  }

  render() {
    return (
      <div>
        <NavWrapper
          menu={<MainMenu
            onRefresh={this.handleRefresh}
            onToggleView={this.handleToggleView}
            gridView={this.state.gridView}
          />}>

        </NavWrapper>
        <MainContent
          isLoading={this.state.isLoading}
          userList={this.state.userData}
          gridView={this.state.gridView}
        />
        <FooterWrapper info={this.state.timeFromLastRefresh} />
      </div>
    )
  }
}

export default Main;